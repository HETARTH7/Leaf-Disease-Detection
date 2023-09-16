import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>SkyNet</h1>
      <Link to={"/auth"}>Login</Link>
      <Link to={"/register"}>Register</Link>
    </div>
  );
};

export default Home;
