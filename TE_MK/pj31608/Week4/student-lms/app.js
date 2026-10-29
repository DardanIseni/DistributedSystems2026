const express = require('express');
const sequilize = require('./config/database');
const Student = require('./models/student');
const app = express();

app.use(express.json());

async function start() {
    try {
        sequilize.sync();
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}
start();

//Get all students

app.get('/students', async (req, res) => {
    const students = await Student.findAll()
    res.json(students);
})

//Get one student by id if there is no student with that id return 404
app.get('/students/:id', async (req, res) => {
    const id = req.params.id;
    const student = await Student.findByPk(id);
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
});

//Create student
app.post('/students', async (req, res) => {
    const student = await Student.create(req.body)
    res.json(student);

})


