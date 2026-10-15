//include express
const express = require('express');

const app = express();
//the ip address by default be set to localhost, 127.0.0.1

//set the port to 3001
const PORT = 3001;   //localhost:3001

//next we need the endpoint, where we will send the request to the server, and the server will respond to the request
app.get('/', (req, res) => {
  res.json(
    { message: 'Hello from the server!' }
    );
});

app.listen(PORT, () => {
  console.log(`Server is up on port: ${PORT}`);
});



