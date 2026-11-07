const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');

let server;
let baseUrl;
let sequelize;
let Student;
let tempDir;

before(async () => {
  tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'student-lms-test-'));
  process.env.DB_STORAGE = path.join(tempDir, 'students.sqlite');
  sequelize = require('../config/database');
  Student = require('../models/Student');
  const { app } = require('../app');
  await sequelize.sync();
  server = await new Promise((resolve) => {
    const listener = app.listen(0, '127.0.0.1', () => resolve(listener));
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server) await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  if (sequelize) await sequelize.close();
  if (tempDir) await fs.rm(tempDir, { recursive: true, force: true });
});

async function request(method, route, body) {
  const response = await fetch(baseUrl + route, {
    method,
    headers: body === undefined ? {} : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return { status: response.status, headers: response.headers, body: await response.json() };
}

test('CRUD operations persist changes and report invalid requests', async (t) => {
  let id;

  await t.test('GET all starts with an empty database', async () => {
    const result = await request('GET', '/students');
    assert.equal(result.status, 200);
    assert.deepEqual(result.body, []);
  });

  await t.test('POST creates a student with a Location header', async () => {
    const result = await request('POST', '/student', { name: 'Test Student', email: 'student@example.com', id: 999 });
    assert.equal(result.status, 201);
    id = result.body.id;
    assert.notEqual(id, 999);
    assert.equal(result.headers.get('location'), `/students/${id}`);
    assert.equal((await Student.findByPk(id)).name, 'Test Student');
  });

  await t.test('GET all includes the new student', async () => {
    const result = await request('GET', '/students');
    assert.equal(result.status, 200);
    assert.deepEqual(result.body.map((student) => student.id), [id]);
  });

  await t.test('GET by ID returns the saved student', async () => {
    const result = await request('GET', `/students/${id}`);
    assert.equal(result.status, 200);
    assert.equal(result.body.email, 'student@example.com');
  });

  await t.test('PUT returns updated values and persists them in SQLite', async () => {
    const result = await request('PUT', `/students/${id}`, { name: 'Updated Student', email: 'updated@example.com' });
    assert.equal(result.status, 200);
    assert.equal(result.body.name, 'Updated Student');
    const [rows] = await sequelize.query('SELECT name, email FROM Students WHERE id = ?', { replacements: [id] });
    assert.deepEqual(rows, [{ name: 'Updated Student', email: 'updated@example.com' }]);
    assert.equal((await request('GET', `/students/${id}`)).body.email, 'updated@example.com');
  });

  await t.test('PUT with one field preserves the other field and the ID', async () => {
    const result = await request('PUT', `/students/${id}`, { name: 'Name Only', id: 999 });
    assert.equal(result.status, 200);
    assert.equal(result.body.id, id);
    assert.equal(result.body.name, 'Name Only');
    assert.equal(result.body.email, 'updated@example.com');
  });

  await t.test('invalid input is rejected without changing the stored student', async () => {
    assert.equal((await request('POST', '/student', { name: 'Missing email' })).status, 400);
    assert.equal((await request('POST', '/student', { name: '   ', email: 'bad-email' })).status, 400);
    assert.equal((await request('PUT', `/students/${id}`, {})).status, 400);
    assert.equal((await request('PUT', `/students/${id}`, { email: 'bad-email' })).status, 400);
    assert.equal((await Student.findByPk(id)).email, 'updated@example.com');
    assert.equal(await Student.count(), 1);
  });

  await t.test('invalid IDs return 400 for every ID route', async () => {
    for (const method of ['GET', 'PUT', 'DELETE']) {
      for (const invalidId of ['abc', '0', '-1', '1.5', '9007199254740992']) {
        assert.equal((await request(method, `/students/${invalidId}`)).status, 400);
      }
    }
  });

  await t.test('missing students return 404 for GET, PUT, and DELETE', async () => {
    for (const method of ['GET', 'PUT', 'DELETE']) {
      const result = await request(method, '/students/999999', method === 'PUT' ? { name: 'Missing' } : undefined);
      assert.equal(result.status, 404);
      assert.equal(result.body.error, 'Student not found');
    }
  });

  await t.test('malformed JSON returns a readable 400 response', async () => {
    const response = await fetch(baseUrl + '/student', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' });
    assert.equal(response.status, 400);
    assert.equal((await response.json()).error, 'Invalid JSON body');
  });

  await t.test('DELETE removes the row from SQLite', async () => {
    const result = await request('DELETE', `/students/${id}`);
    assert.equal(result.status, 200);
    assert.deepEqual(result.body, { message: 'Student deleted successfully', id });
    assert.equal(await Student.findByPk(id), null);
    assert.equal((await request('GET', `/students/${id}`)).status, 404);
    assert.equal((await request('DELETE', `/students/${id}`)).status, 404);
    assert.deepEqual((await request('GET', '/students')).body, []);
  });

  await t.test('unknown routes return JSON 404', async () => {
    assert.deepEqual(await request('GET', '/unknown').then(({ status, body }) => ({ status, body })), {
      status: 404, body: { error: 'Route not found' },
    });
  });
});
