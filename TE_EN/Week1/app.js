const express = require('express');

const app = express();

app.get('/',(req,res) => {
    res.json({
        "msg":"Hello WOrld"
    })
})

app.listen('3000',() => {console.log("I am listening on port 3000")})