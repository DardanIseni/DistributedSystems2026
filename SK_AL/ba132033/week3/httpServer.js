const express = require ('express')

const server= express ();
const PORT =3005;

server.get('/',(req,res)=>{
    res.json({
        "hi": "you reached the server"
    })
})


server.listen(PORT,()=>{
    console.log("server is running on port: " + PORT)
})

