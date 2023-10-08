const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const app = express();

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})
app.get("/", (req, res) => {
    res.send("socket chat be started");

});
io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("joinRoom", room => socket.join(room))
    socket.on("newMessage", ({newMessage, room}) => {
        console.log(newMessage , room)
        io.in(room).emit("getLatestMessage", newMessage)// to send msg to only Romm1 clients
    })
});


server.listen(8000, () => {
    console.log("App stared at 8000")
})
