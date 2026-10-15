const express = require('express')
const app = express();
const port = 3005;

app.get('/', (req, res) => {
    res.json({
        'message': "Hello, World!"
    })
});

app.listen(port, () => {
    console.log("I am server and i am up and running");
});