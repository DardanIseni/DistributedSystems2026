const express = require('express');
const sequlize = require('./config/database')
const studentRouter = require('./routers/studentRouter')
const app = express();

app.use(express.json());
app.use('/',studentRouter)




//start the app
function start(){
    try{
        sequlize.sync();
        app.listen(3000,()=>{
            console.log("Running on port 3000")
        })
    }
    catch{
        console.log("Error")
    }
}
start()