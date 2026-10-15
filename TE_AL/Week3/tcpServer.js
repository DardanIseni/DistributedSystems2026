
const net = require("node:net");

const server = net.createServer((socket) => {
    console.log("Client connected:", socket.remoteAddress);

    let buffer = "";

    socket.on("data", (chunk) => {
        buffer += chunk.toString();

        // Each message ends with a newline.
        let newlineIndex;

        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, newlineIndex);
            buffer = buffer.slice(newlineIndex + 1);

            if (!line.trim()) continue;

            try {
                const message = JSON.parse(line);
                console.log("Received:", message);

                const response = {
                    type: "ACK",
                    receivedMessage: message,
                    serverTime: new Date().toISOString()
                };

                socket.write(JSON.stringify(response) + "\n");
            } catch {
                socket.write(JSON.stringify({
                    type: "ERROR",
                    message: "Invalid JSON"
                }) + "\n");
            }
        }
    });

    socket.on("end", () => {
        console.log("Client disconnected");
    });

    socket.on("error", (error) => {
        console.error("Socket error:", error.message);
    });
});

server.listen(4000, () => {
    console.log("TCP server listening on port 4000");
});