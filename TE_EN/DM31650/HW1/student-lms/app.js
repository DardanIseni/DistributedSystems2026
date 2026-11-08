const express = require('express');
const { ValidationError } = require('sequelize');
const sequelize = require('./config/database');
const Student = require('./models/Student');

const app = express();
app.use(express.json());

// Only student-editable fields may be supplied; IDs and timestamps stay managed.
function studentFields(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return {};
  return Object.fromEntries(
    ['name', 'email']
      .filter((field) => Object.hasOwn(body, field))
      .map((field) => [field, typeof body[field] === 'string' ? body[field].trim() : body[field]]),
  );
}

app.param('id', (req, res, next, id) => {
  if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) {
    return res.status(400).json({ error: 'Student ID must be a positive integer' });
  }
  next();
});

// GET all students (Week 4 operation).
app.get('/students', async (req, res) => {
  const students = await Student.findAll({ order: [['id', 'ASC']] });
  res.json(students);
});

// GET one student by ID.
app.get('/students/:id', async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json(student);
});

// POST uses the singular /student path required by the assignment.
app.post('/student', async (req, res) => {
  const student = await Student.create(studentFields(req.body));
  res.status(201).location(`/students/${student.id}`).json(student);
});

// Task A: find, update, and return the persisted student.
app.put('/students/:id', async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.status(404).json({ error: 'Student not found' });

  const fields = studentFields(req.body);
  if (Object.keys(fields).length === 0) {
    return res.status(400).json({ error: 'Provide name or email to update' });
  }
  await student.update(fields);
  res.json(student);
});

// Task B: find and delete the student, with a readable success response.
app.delete('/students/:id', async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.status(404).json({ error: 'Student not found' });

  await student.destroy();
  res.json({ message: 'Student deleted successfully', id: student.id });
});

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// Express 5 forwards rejected async route promises to this error handler.
app.use((error, req, res, next) => {
  if (error instanceof ValidationError) {
    return res.status(400).json({ error: 'Invalid student data', details: error.errors.map((item) => item.message) });
  }
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }
  if (error.status === 413) {
    return res.status(413).json({ error: 'Request body too large' });
  }
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

async function start() {
  // Finish creating the table before accepting requests.
  await sequelize.sync();
  const port = process.env.PORT || 3005;
  return app.listen(port, '127.0.0.1', () => {
    console.log(`Student LMS - Durim Memishi (dm31650) - http://localhost:${port}`);
  });
}

if (require.main === module) {
  start().catch((error) => {
    console.error('Could not start Student LMS:', error);
    process.exitCode = 1;
  });
}

module.exports = { app, start };
