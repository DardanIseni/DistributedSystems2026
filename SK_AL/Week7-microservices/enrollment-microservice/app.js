const express = require('express');
const sequelize = require('./config/database')
const enrollmentRouter = require('./routers/enrollmentRouter')

const app = express();
app.use(express.json())
app.use("/",enrollmentRouter)



async function start(){
    try{
        await sequelize.sync();
        app.listen(3003,()=> {
            console.log("Running...")
        })
    }
    catch (error){
        console.log("Error: " + error )
    }
}

start()