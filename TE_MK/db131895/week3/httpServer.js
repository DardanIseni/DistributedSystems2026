const express = require('express')
const app = express(); //localhost 127.0.0.1
const PORT  = 3005; //localhost:3005

app.get('/',(req,res) => {
    res.json
     ({
        'message':"Hello World"
     })
})

app.listen(PORT,() => {
    console.log("Server is UP")
})