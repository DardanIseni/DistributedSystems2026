
const dgram = require("node:dgram");

const client = dgram.createSocket("udp4");

const message = Buffer.from(JSON.stringify({
    studentId: 101,
    message: "Hello using UDP"
}));

client.on("message", (response) => {
    console.log("Server response:", response.toString());
    client.close();
});

client.on("error", (error) => {
    console.error("UDP error:", error.message);
    client.close();
});

client.send(message, 5000, "127.0.0.1", (error) => {
    if (error) {
        console.error("Send failed:", error.message);
        client.close();
        return;
    }

    console.log("Datagram sent");
});