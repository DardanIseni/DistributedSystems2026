const express = require('express');
const app = express(); //local host 127.0.0.1
const port = 3005; //localhost:3005/

app.get('/',(req, res) => {
    res.send('Hello from server');
})

app.listen(port, () => {
    console.log("server is up");
})