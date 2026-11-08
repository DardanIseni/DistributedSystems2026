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

app.get('/students/:id', async(req,res) => {
    try{
        const student = await Student.findByPk(req.params.id)

        if(!student){
            return res.status(404).json({error: "Student not found"}) 
        }
        res.json(student)
    } catch(err){
        res.status(500).json({error: error.message})
    }
})

app.put('/students/:id', async(req,res) => {
    try{
        const student = await Student.findByPk(req.params.id)

        if(!student){
            return res.status(404).json({error: "Student not found"}) 
        }

        await student.update(req.body)
    }catch(err) {
        res.status(500).json({error: error.message})
    }
})

app.delete('/students/:id', async(req,res) => {
    try{
        const student = await Student.findByPk(req.params.id)

        if(!student){
            return res.status(404).json({error: "Student not found"}) 
        }

        await student.destroy()

        res.json(
            {
                message: "Student deleted successfully"
            }
        )
    }catch(err) {
        res.status(500).json({error: error.message})
    }
})



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