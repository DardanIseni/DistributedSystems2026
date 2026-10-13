const express = require('express')

const server = express();
const PORT = 3005;

server.get('/',(req,res) => (
    res.json({
        "hi ": "You reached the server"
    })
))

server.listen(PORT,() => (
    console.log("Server is running on port: " + PORT)
))