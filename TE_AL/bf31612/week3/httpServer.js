const express = require('express');
const app = express();
const PORT = 3005;

app.get('/',(req, res)=>{
    res.json({
        message: "Hello from the server"
    })
})

app.listen(PORT, () => {
  console.log(`I'm server and I am up and running on port ${PORT}`);
});

