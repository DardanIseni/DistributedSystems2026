const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({
        msg: 'hello class'
    });
});

app.listen(3000, () => {
    console.log('I am listening on port 3000');
});