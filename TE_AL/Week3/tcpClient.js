
const net = require("node:net");

const client = net.createConnection(
    { host: "localhost", port: 4000 },
    () => {
        console.log("Connected to TCP server");

        const message = {
            studentId: 101,
            name: "Arben",
            course: "CCS6030"
        };

        client.write(JSON.stringify(message) + "\n");
    }
);

let buffer = "";

client.on("data", (chunk) => {
    buffer += chunk.toString();

    let newlineIndex;

    while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
        const line = buffer.slice(0, newlineIndex);
        buffer = buffer.slice(newlineIndex + 1);

        if (!line.trim()) continue;

        const response = JSON.parse(line);
        console.log("Server response:", response);

        client.end();
    }
});

client.on("end", () => {
    console.log("Connection closed");
});

client.on("error", (error) => {
    console.error("Connection failed:", error.message);
});