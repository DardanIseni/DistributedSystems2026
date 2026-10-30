const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/Student');

const app = express();
app.use(express.json());

//get
app.get("students", async (req, res) => {
    const students = await Student.findAll();
    res.json(students);
});

//Create student
app.post("/student", async (req, res) => {
    const student = await Student.create(req.body);
    res.json(student);
})

//GetById
function start() {
    try {
        sequelize.sync();
        app.listen(3000, () => {
            console.log("Running on port 3000");
        });
    }
    catch {
        coonsole.log("Error");
    }
}

start();

//GetById
//if there is no student with that id respond with error, otherwise return the object

app.get("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        return res.json(student);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});