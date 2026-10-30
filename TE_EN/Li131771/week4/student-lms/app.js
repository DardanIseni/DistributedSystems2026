const express = require ('express')
const sequelize = require ('./config/database')
const Student = require('./models/Student')

const app = express();

app.use(express.json());

// get

app.get('/students', async (req,res)=> {
    const students = await Student.findAll();

    res.json(students);
})

//create
app.post('/student', async (req,res) => {
    const student = await Student.create(req.body);

    res.json(student);
})

//GetByID
app.get('/student/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
function start(){
    try{
        sequelize.sync()
        app.listen(3005,()=> {
            console.log("Im running on port 3005")
        })
    } catch {
        console.log("Error")
    }
}
start()