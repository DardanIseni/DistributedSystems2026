
const express = require('express');
const app = express();
const PORT = 3005;

app.get('/', (req, res) => {
    res.json('Hello World');
});

app.listen(PORT, () => {
    console.log('Server is running');
});
