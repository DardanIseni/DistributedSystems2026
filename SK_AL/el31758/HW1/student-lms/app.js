const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/Student');

const app = express();
app.use(express.json());

// GET all students
app.get('/students', async (req, res) => {
  const students = await Student.findAll();
  res.json(students);
});

// GET one student by ID
app.get('/students/:id', async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json(student);
});

// POST create a student
app.post('/student', async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
});

// TASK A — PUT update a student
app.put('/students/:id', async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.status(404).json({ error: 'Student not found' });
  await student.update(req.body);
  res.json(student);
});

// TASK B — DELETE a student
app.delete('/students/:id', async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.status(404).json({ error: 'Student not found' });
  await student.destroy();
  res.json({ message: 'Student deleted' });
});

const PORT = 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});