const express = require('express')
const sequelize = require('./config/database')
const Student = require('./models/Student')

const app = express()

app.use(express.json())

//GET
app.get('/students', async(req,res) => {
    const students = await Student.findAll()

    res.json(students)
})

//CREATE

app.post('/student', async(req,res) =>  {
    const student = await Student.create(req.body)

    res.json(student)
})

//GET BY ID
app.get('/student/:id', async(req,res) => {

    try{
        const student = await Student.findByPk(req.params.id)

        res.json(student)
    }
    catch (error){
        res.status(500).json({error: error.message})
    }
})

function start(){
    try{
        sequelize.sync()
        app.listen(3005, () => {
            console.log("I am running on port 3005")
        })

    }
    catch{
        console.log("error")
    }   
}

start()