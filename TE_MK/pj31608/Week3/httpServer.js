const express = require('express');
const app = express(); //localhost or 127.0.0.1
const PORT = 3005; //localhost:3005

app.get('/', (req, res) => {
  res.send('Hello from the server');
})

app.listen(PORT, () => {
  console.log(`Server is UP`);
})

