const express = require('express')

const server = express();
const PORT = 3005;

server.get('/', (req, res) => {
    res.json({
        "hi": 'Hello, World!' });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
