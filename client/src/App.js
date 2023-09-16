import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./components/Chat";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:name" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
