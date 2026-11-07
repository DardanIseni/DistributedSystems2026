const express = require('express');
const sequelize = require('./config/database')
const Student = require('./models/Student')

const app = express();

app.use(express.json());

//Get
app.get('/students',async (req,res) => {
    const students = await Student.findAll();

    res.json(students);
})

//Create
app.post('/student',async (req,res)=> {
    const student = await Student.create(req.body);
    res.json(student);
})

//Get student by ID
app.get('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.status(200).json(student);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


 // PUT  update student by ID
app.put('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        await student.update(req.body);

        return res.status(200).json(student);

    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
});


 // DELETE Delete student by ID
app.delete('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        await student.destroy();

        return res.status(200).json({
            message: 'Student deleted successfully'
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});




function start(){
    try{
        sequelize.sync();
        app.listen(3005,()=> {
            console.log("I am running on port 3005")
        })
    }
    catch{
        console.log("Error")
    }
}

start()