import React from "react";

interface MessageProps {
  user: string | null;
  message: string;
  classs: string;
}

const Message: React.FC<MessageProps> = ({ user, message, classs }) => {
  return (
    <div
      className={`bg-green-500 m-2 w-1/2 p-2 rounded-lg shadow-lg font-serif ${
        classs === "right"
          ? "float-right bg-crimson text-white text-right"
          : "float-left bg-green-300 text-left"
      }`}
    >
      {user ? `${user}: ${message}` : `You: ${message}`}
    </div>
  );
};

export default Message;
