# Distributed Systems - Week 1
## Student
Name: Zeqir Xheladini
Student ID: 131808
Group: TE_EN
## Environment
Node.js: v24.15.0
npm: 11.12.1
## Week 1
This week I configured my development environment
and created my first Node.js API using Express.
## API
GET /

const express = require('express');

const app = express();

app.get('/',(req,res) => {
    res.json({
        "msg":"Hello World"
    })
})

app.listen('3000',() => {console.log("I am listening on port 3000")})