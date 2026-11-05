const express = require('express');
const sequlize = require('./config/database')
const Studentrouter = require('./routers/studentRouter')
const app = express();

app.use(express.json());
app.use('/',Studentrouter)



//start the app
async function start(){
    try{
        await sequlize.sync();
        app.listen(3000,()=>{
            console.log("Running on port 3000")
        })
    }
    catch(err){
        console.log("Error", err)
    }
}
start()