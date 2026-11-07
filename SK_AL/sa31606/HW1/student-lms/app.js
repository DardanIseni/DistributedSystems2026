
const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/Student');

const app = express();

app.use(express.json());



app.get('/students', async (req, res) => {
    try {
        const students = await Student.findAll();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.get('/students/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.json(student);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.post('/student', async (req, res) => {
    try {
        const student = await Student.create(req.body);

        res.status(201).json(student);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.put('/students/:id', async (req, res) => {
    try {
        const id = req.params.id;

        
        const student = await Student.findByPk(id);

        
        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

       
        await student.update(req.body);

    
        res.status(200).json({
            message: 'Student updated successfully',
            student: student
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.delete('/students/:id', async (req, res) => {
    try {
        const id = req.params.id;

       
        const student = await Student.findByPk(id);

     
        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        await student.destroy();

        res.status(200).json({
            message: 'Student deleted successfully'
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



async function start() {
    try {
        await sequelize.sync();

        app.listen(3000, () => {
            console.log('Running on port 3000');
        });

    } catch (error) {
        console.log('Error:', error.message);
    }
}

start();
