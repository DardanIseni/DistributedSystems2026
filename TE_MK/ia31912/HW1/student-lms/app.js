import express from 'express';
import sequelize from './config/database.js';
import Student from './models/Student.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Get All Students
app.get('/students', async (req, res) => {
  const students = await Student.findAll();
  res.json(students);
})

// Get Student by id
app.get('/students/:id', async (req, res) => {
  const id = req.params.id;
  const student = await Student.findByPk(id);
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  res.json(student);
})

// Create Student
app.post('/student', async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student)
})

// Update Student
app.put('/students/:id', async (req, res) => {
  const id = req.params.id;
  const student = await Student.findByPk(id);
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  await student.update(req.body);
  res.json(student)
})

// Delete Student
app.delete('/students/:id', async (req, res) => {
  const id = req.params.id;
  const student = await Student.findByPk(id);
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  await student.destroy();
  res.status(204).json({message: 'No Content'});
})

function start() {
  try {
    sequelize.sync();
    app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`)});

  }
  catch (err) {
    console.error("Error starting server:", err);
  }
}
start()
