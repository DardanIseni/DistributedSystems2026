const express = require('express');
const sequelize = require('./config/database')
const studentRouter = require('./routers/studentRouter')

const app = express();
app.use(express.json())
app.use("/",studentRouter)



async function start(){
    try{
        await sequelize.sync();
        app.listen(3000,()=> {
            console.log("Running...")
        })
    }
    catch (error){
        console.log("Error: " + error )
    }
}

start()