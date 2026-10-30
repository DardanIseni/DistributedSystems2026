const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/Student');
const app = express();

// Allows us to receive JSON data from requests
app.use(express.json());


// GET - Get all students
app.get('/students', async (req, res) => {  

    // findAll() retrieves all students
    const students = await Student.findAll(); 

    // Send the students back as JSON
    res.json(students);
});


// GET - Get a student by ID
app.get('/students/:id', async (req,res) => {

    // Get the ID from the URL
    const id = req.params.id;

    // Find the student with that ID
    const student = await Student.findByPk(id);

    // If the student doesn't exist, return 404
    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    // Return the student we found
    res.json(student);
});


// POST - Add a new student
app.post('/student', async (req, res) => {

    // Create a new student using the data from the request body
    const student = await Student.create(req.body);

    // Return the student we just created
    res.json(student);
});


// PUT - Update a student's information by ID
app.put('/students/:id', async (req, res) => {

    // Get the student ID from the URL
    const id = req.params.id;

    // Search for the student in the database
    const student = await Student.findByPk(id);

    // If we can't find the student, return 404
    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    // Update the student's name or email with the new data
    await student.update(req.body);

    // Return the student with the updated information
    res.json(student);
});


// DELETE - Delete a student by ID
app.delete('/students/:id', async (req, res) => {

    // Get the ID of the student we want to delete
    const id = req.params.id;

    // Find the student by their ID
    const student = await Student.findByPk(id);

    // If the student doesn't exist, return 404
    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    // Remove the student from the database
    await student.destroy();

    // Send a message to confirm the student was deleted
    res.json({
        message: "Student deleted successfully"
    });
});


// Start our application
async function start() {
    try {

        // Connect to the database and create tables if needed
        await sequelize.sync();

        // Run the server on port 3000
        app.listen(3000, () => {
            console.log("Running...");
        });

    } catch (error) {

        // Show an error if the database can't start
        console.log("Error: " + error);
    }
}


// Start the server
start();