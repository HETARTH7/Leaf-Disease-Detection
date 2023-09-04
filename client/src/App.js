import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Chat from "./components/Chat/Chat.jsx";
import Home from "./components/Home/Home.jsx";
import Register from "./components/Register/Register.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/auth" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:name" element={<Chat />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
