const express = require('express');
const app = express(); // localhost 127.0.0.1
const port = 3005; // localhost:3005

app.get('/',(req, res) => {message = 'Hello From the Server!'});

app.listen(port, () => {
    console.log(`Server is up!`)});