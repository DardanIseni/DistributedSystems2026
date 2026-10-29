const express = require('express')
const sequelize = require("./config/database.js")
const Student = require("./models/Student.js")

const app = express();

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
    return res.json({ message: 'Student not found' });
  }
  res.json(student);
})


// Create Student
app.post('/student', async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student)
})

function start() {
  try {
    sequelize.sync();
    app.listen(3000, () => { console.log("Listening on port 3000...")});

  }
  catch {
    console.log("Error")
  }
}
start()
