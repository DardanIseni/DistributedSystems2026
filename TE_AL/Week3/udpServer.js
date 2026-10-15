
const dgram = require("node:dgram");

const server = dgram.createSocket("udp4");

server.on("message", (buffer, remoteInfo) => {
    const text = buffer.toString();

    console.log("Received:", text);
    console.log("Sender:", remoteInfo.address, remoteInfo.port);

    const reply = Buffer.from(`ACK: ${text}`);

    server.send(
        reply,
        remoteInfo.port,
        remoteInfo.address,
        (error) => {
            if (error) {
                console.error("Send failed:", error.message);
            }
        }
    );
});

server.on("error", (error) => {
    console.error("UDP server error:", error.message);
});

server.bind(5000, () => {
    console.log("UDP server listening on port 5000");
});