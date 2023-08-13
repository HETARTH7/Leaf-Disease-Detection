import React, { useState } from "react";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
                socket={socket}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
