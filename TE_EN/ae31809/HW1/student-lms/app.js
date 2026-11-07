const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/Student');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET /students - retrieve all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /students/:id - retrieve a student by ID
app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /student - create a new student
app.post('/student', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /students/:id - update an existing student (Task A)
app.put('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    await student.update(req.body);
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /students/:id - delete a student (Task B)
app.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    await student.destroy();
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('Database connection failed:', err));
