
const express=require('express');
const sequelize=require('./config/database');
const Student=require('./models/Student');
const app=express();

app.use(express.json());

//Get All Students

app.get('/students',async(req,res)=>{
    const students = await Student.findAll();
    res.json(students);
})

// Get Student by id
app.get('/students/:id', async (req, res) => {
    const id = req.params.id;
    const student = await Student.findByPk(id);

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
});

//Create Student 
app.post('/student',async(req,res)=>{
    const student=await Student.create(req.body);
    res.json(student);
});

// Update Student
app.put('/students/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        await student.update(req.body);
        res.status(200).json(student);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Student
app.delete('/students/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        await student.destroy();
        res.status(200).json({ message: 'Student deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Start the app
async function start(){
    try{
        await sequelize.sync();
        app.listen(3000,()=>{
            console.log("Running on port 3000");
        });
    }
    catch(error){
        console.log("Error", error);
    }
}
start();
