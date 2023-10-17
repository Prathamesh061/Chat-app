import React, { useState } from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

let user: string;

const sendUser = () => {
  user = (document.getElementById("joinInput") as HTMLInputElement).value;
  (document.getElementById("joinInput") as HTMLInputElement).value = "";
};

const Join: React.FC = () => {
  const [name, setname] = useState<string>("");

  return (
    <div className="JoinPage bg-black w-screen min-h-screen flex justify-center items-center">
      <div className="JoinContainer w-1/2 flex items-center flex-col">
        <img src={logo} alt="logo" className="w-24 h-24 sm:w-20 sm:h-20" />
        <h1 className="text-white font-bold mb-4 border-b-2 border-white font-serif">
          Maifil
        </h1>
        <input
          onChange={(e) => setname(e.target.value)}
          placeholder="Enter Your Name"
          type="text"
          id="joinInput"
          className="px-4 py-2 border-gray-400 border-2 rounded-lg"
        />
        <Link
          onClick={(event) => (!name ? event.preventDefault() : null)}
          to="/chat"
        >
          <button
            onClick={sendUser}
            className="joinbtn my-6 px-4 py-2 bg-orange-600 rounded-lg border-gray-400 font-bold font-sans text-white hover:border-orange-600 hover:border-2 hover:bg-transparent"
          >
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
