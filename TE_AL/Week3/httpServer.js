const express = require('express')
const app = express();
const PORT  = 3005;

app.get('/',(req,res) => {
    res.json({
        'message':"Hello World"
    })
})

app.listen(PORT,() => {
    console.log("I am Server and I am up and running")
})