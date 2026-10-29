const express = require('express')
const sequelize = require("./config/database.js")
const Student = require("./models/Student.js")

const app = express();

app.use(express.json());

// Get All Students
app.get('students', async (req, res) => {
  const students = await Student.findAll();
  res.json(students);
})
// Get Student by id

// Create Student


function start() {
  try {
    sequlize.sync();
    app.listen(3000, () => { console.log("Listening on port 3000...")});

  }
  catch {
    console.log("Error")
  }
}
