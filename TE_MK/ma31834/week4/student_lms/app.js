// Import Express framework
const express = require('express');

// Import Sequelize database connection (SQLite)
//we need our configuration
const sequelize = require('./config/database');

// Import Student model
const Student = require('./models/Student');

// Create Express application
const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());


// GET - Get all students from the database
//(req,res) is the middlewear 
app.get('/students', async (req, res) => {  

    // findAll() retrieves all records from the Student table
    const students = await Student.findAll(); //

    // Return students as JSON response
    res.json(students);
});


// GET by ID - Get one student by ID
//:id is a placeholder for the actual id of the student we want to get
//:id is param
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


// CREATE - Add a new student to the database
app.post('/student', async (req, res) => {

    // req.body contains student data sent by the client
    // create() inserts a new student into the database
    const student = await Student.create(req.body);

    // Return the newly created student as JSON
    res.json(student);
});


// Start the server and connect to the database
async function start() {
    try {

        // Synchronize Sequelize models with SQLite database tables
        // Creates missing tables if they don't exist
        //make sure that the database is okey
        await sequelize.sync();

        // Start Express server on port 3001
        app.listen(3000, () => {
            console.log("Running...");
        });

    } catch (error) {

        // Display error if database synchronization fails
        console.log("Error: " + error);
    }
}



// Call the function to start the application
start();