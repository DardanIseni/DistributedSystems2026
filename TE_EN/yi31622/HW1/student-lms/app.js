const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/Student');

const app = express();

app.use(express.json());

const notFound = (res) => res.status(404).json({ error: 'Student not found' });

app.get('/students', async (req, res) => {
  const students = await Student.findAll();
  res.json(students);
});

app.get('/students/:id', async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return notFound(res);
  res.json(student);
});

app.post('/student', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/students/:id', async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return notFound(res);

  try {
    const { name, email } = req.body ?? {};
    await student.update({ name, email });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/students/:id', async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return notFound(res);

  await student.destroy();
  res.json({ message: `Student ${req.params.id} deleted` });
});

const start = async () => {
  try {
    await sequelize.sync();
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

start();
