const express = require ('express');
const sequelize = require ('./config/database')
const Student = require ('./models/Student')

const app = express()
app.use (express.json());


//get

app.get('/students',async (req,res) => {
    const students = await Student.findAll();

    res.json(students);
}
)


//create
app.post('/student', async (req,res)=> {
  const student = await  Student.create(req.body)
  res.json(student);
})



//getbyid
app.get('/student', async (req,res)=>{
    const student =await Student.findByPk(req.params.id);


    if (!student) {
        return res.status(404),json ({
            error: "student not found"
        });
    }

    res.json(student);
}
)






function start(){
    try {
        sequelize.sync();
        app.listen(3005, ()=>{
            console.log("im running on port 3005")

        })

    }

    catch {
        console.log("Error")

    }
}

start();
