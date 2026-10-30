const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/Student');

const app = express();

app.use(express.json());

app.get('/students', async (req, res) => {  

    const students = await Student.findAll(); //

    res.json(students);
});


app.get('/students/:id', async (req,res) => {
    const id = req.params.id
    const student = await Student.findByPk(id)

     if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student)
})


app.post('/student', async (req, res) => {

    const student = await Student.create(req.body);

    res.json(student);
});


//Update a student
app.put ('/students/:id', async (req,res) => {

    const id = req.params.id;
    const student = await Student.findByPk(id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    await student.update(req.body);

    res.json(student);
})

// Delete a Student
app.delete ('/students/:id', async (req,res) => {

    const id = req.params.id;
    const student = await Student.findByPk(id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    await student.destroy();

    res.json({
        message: "Student deleted successfully"
    });
})


async function start() {
    try {
        await sequelize.sync();

        app.listen(3001, () => {
            console.log("Running...");
        });

    } catch (error) {
        console.log("Error: " + error);
    }
}

start();