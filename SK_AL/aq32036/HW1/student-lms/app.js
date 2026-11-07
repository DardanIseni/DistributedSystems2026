const express = require("express");
const sequelize = require("./config/database");
const Student = require("./models/Student");

const app = express();
app.use(express.json());

// Read - operation
app.get("/students", async (req, res) => {
  const students = await Student.findAll();
  res.json(students);
});

app.get("/students/:id", async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  res.json(student);
});

//Create - Post student
app.post("/student", async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
});

app.put("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student doesn't exist" });
    }
    await student.update(req.body);
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student doesn't exist" });
    }
    await student.destroy();
    res.json({ message: `Student ${student.name} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function start() {
  try {
    await sequelize.sync();
    app.listen(3000, () => {
      console.log("Running...");
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}

start();
