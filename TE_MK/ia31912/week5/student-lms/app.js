const express = require('express')
const sequelize = require("./config/database.js")
const Student = require("./models/Student.js")
const studentRouter =require('./routers/studentRouter.js')

const app = express();

app.use(express.json());
app.use('/', studentRouter);


async function start() {
  try {
    await sequelize.sync();
    app.listen(3000, () => { console.log("Listening on port 3000...")});

  }
  catch {
    console.log("Error")
  }
}
start()
