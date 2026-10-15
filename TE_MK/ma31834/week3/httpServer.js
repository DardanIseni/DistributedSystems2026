
const express = require('express');

// We import Express to create our HTTP server.

const app = express();

// app is our Express application (server).
// Imagine the server as an apartment building
// that people (clients) want to visit.

const PORT = 3005;

// localhost (127.0.0.1) identifies our local computer.
// Think of the IP address as the building's address.
// The port (3005) is like the apartment number.
// Together, they help us reach the correct service.
//
// Example: http://localhost:3005

// GET REQUEST
// GET is an HTTP method used to retrieve data.
//
// ANALOGY:
// The endpoint '/' is like the specific room
// we want to visit inside the apartment.
// The GET method describes what we want to do,
// for example, asking someone for information.
//
// The callback function (req, res) => {}
// handles the request when someone visits the endpoint.
//
// req = request (what the visitor asks for)
// res = response (what the person answers)

app.get('/', (req, res) => {
    res.json({
        message: "Hello World"
    });
});

// res.json() sends a JSON response to the client.
// It's like the person answering the visitor's question.

// LISTEN METHOD
// app.listen() starts the server and listens
// for incoming requests on port 3005.
//
// ANALOGY:
// It's like opening the apartment so visitors
// can come and ask for information.
//
// console.log() displays a message in the terminal
// to confirm that the server is running.

app.listen(PORT, () => {
    console.log("Server is up on port: " + PORT);
})

