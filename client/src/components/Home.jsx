import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();
  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
    }
    navigate("/chat", { replace: true });
  };
  return (
    <div>
      <h1>Skynet</h1>
      <p>Come and chat</p>
      <form>
        <label>Username</label>
        <input onChange={(e) => setUsername(e.target.value)} required />
        <label>Select a room</label>
        <select onChange={(e) => setRoom(e.target.value)} required></select>
        <button onClick={joinRoom}>Join</button>
      </form>
    </div>
  );
};

export default Home;
