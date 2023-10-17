import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import socketIo from "socket.io-client";
import sendLogo from "../../images/send.png";
import Message from "../Message/Message";

let socket: any;

const ENDPOINT = "http://localhost:8000";

interface Message {
  id: string;
  user: string;
  message: string;
}

const Chat: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const send = () => {
    const message = (document.getElementById("chatInput") as HTMLInputElement)
      .value;
    socket.emit("message", { message, id });
    (document.getElementById("chatInput") as HTMLInputElement).value = "";
  };

  console.log(messages);
  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      alert("Connected");
      setId(socket.id);
    });
    console.log(socket);
    socket.emit("joined", { user });

    socket.on("welcome", (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("disconnectt");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatContainer bg-white min-h-screen max-h-screen w-full flex flex-col">
      <div className="header bg-orange-500 w-full flex items-center justify-between flex-0">
        <h2 className="text-white font-bold font-serif p-3">Maifil</h2>
        <a href="/" className="font-bold text-white p-3 hover:scale-110 m-2">
          X
        </a>
      </div>

      <div className="messageContainer flex-1 overflow-y-auto p-4 ">
        {messages.map((item, i) => (
          <Message
            user={item.id === id ? "" : item.user}
            message={item.message}
            classs={item.id === id ? "right" : "left"}
            key={i}
          />
        ))}
      </div>

      <div className="flex flex-0 w-full justify-between">
        <input
          onKeyDown={(event) => (event.key === "Enter" ? send() : null)}
          type="text"
          id="chatInput"
          className="border-2 border-orange-500 outline-none w-full text-gray-600 font-mono px-4 text-2xl"
          placeholder="Share your thoughts here..."
        />
        <button
          onClick={send}
          className="p-2 hover:cursor-pointer bg-orange-500 hover:bg-white hover:border-2 hover:border-orange-500 hover:border-l-0"
        >
          <img src={sendLogo} alt="Send" className="w-16 h-16" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
