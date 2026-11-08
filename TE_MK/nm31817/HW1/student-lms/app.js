const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/Student');

const app = express();

app.use(express.json());

//GET ALL STUDENTS
app.get('/students', async (req, res) => {

const student = await Student.findAll();
res.json(student);

})

//GET student by id if there is no student with that id return 404
app.get('/students/:id', async (req, res) => {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
});

//create student

app.post('/students', async (req, res) => {


const student = await Student.create(req.body);
res.json(student);



})

//update student by id, only name and email can be changed
app.put('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        await student.update(req.body, { fields: ['name', 'email'] });
        res.json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//delete student by id
app.delete('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        await student.destroy();
        res.json({ message: 'Student deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//start the app
 function start(){
    try{
         sequelize.sync();
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
}
start();