import * as http from "http";
import express from "express";
import cors from "cors";
import socketIO from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port: string | undefined = process.env.PORT; // Assuming PORT is a number, update the type if necessary

const users: { [id: string]: string } = {}; // An object to store users with socket IDs

app.use(cors());

app.get("/", (req, res) => {
  res.send("HELLO, IT'S WORKING");
});

const server = http.createServer(app);
const io = new socketIO.Server(server);

io.on("connection", (socket: socketIO.Socket) => {
  console.log("New Connection");

  socket.on("joined", ({ user }: { user: string }) => {
    users[socket.id] = user;
    console.log(`${user} has joined`);
    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: ` ${users[socket.id]} has joined`,
    });
    socket.emit("welcome", {
      user: "Admin",
      message: `Welcome to the chat, ${users[socket.id]}`,
    });
  });

  socket.on("message", ({ message, id }: { message: string; id: string }) => {
    io.emit("sendMessage", { user: users[id], message, id });
  });

  socket.on("disconnectt", () => {
    socket.broadcast.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]} has left`,
    });
    console.log(`user left`);
  });
});

server.listen(port, () => {
  console.log(`Working`);
});
