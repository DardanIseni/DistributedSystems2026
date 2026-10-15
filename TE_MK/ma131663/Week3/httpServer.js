const express = require ('express');
const app = express(); //localhost or 127.0.0.1
const PORT = 3000; //localhost:3000

app.get('/', (req, res) => {
    res.send('Hello, from the server');
});

app.listen(PORT,()=>{
    console.log ("Server is UP");
});