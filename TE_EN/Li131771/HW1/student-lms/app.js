const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/Student');

const app = express();
app.use(express.json());

app.get('/students', async (req, res) => {
  res.json(await Student.findAll());
});

app.get('/students/:id', async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
});

app.post('/student', async (req, res) => {
  const student = await Student.create(req.body, { fields: ['name', 'email'] });
  res.status(201).json(student);
});

app.put('/students/:id', async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  await student.update(req.body, { fields: ['name', 'email'] });
  res.json(student);
});

app.delete('/students/:id', async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  await student.destroy();
  res.status(204).send();
});

app.use((error, req, res, next) => {
  if (error instanceof require('sequelize').ValidationError) {
    return res.status(400).json({ message: error.message });
  }
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON body' });
  }
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
});

async function start() {
  await sequelize.sync();
  return app.listen(process.env.PORT || 3005, () => {
    console.log('Student LMS is running');
  });
}

if (require.main === module) {
  start().catch(error => {
    console.error('Could not start Student LMS:', error);
    process.exitCode = 1;
  });
}

module.exports = app;
