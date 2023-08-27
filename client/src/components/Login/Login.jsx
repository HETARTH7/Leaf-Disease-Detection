import React, { useState } from "react";
import "./Login.css";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isNew, setIsNew] = useState(false);
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setpwd] = useState("");
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  const handleChangeUser = (e) => {
    setname(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangepwd = (e) => {
    setpwd(e.target.value);
  };
  const handleUploadImg = (e) => console.log(e.target.files[0]);

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      await axios.post("/register", { name, email, pwd });
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("/auth", { email, pwd });
      response.status === 201 ? navigate("/chat") : alert("Something's wrong");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container">
      <h1 className="heading">SkyNet</h1>
      <div className="login-container">
        <button onClick={() => setIsNew(false)}>Login</button>
        <button onClick={() => setIsNew(true)}>Register</button>
        {isNew ? (
          <form onSubmit={handleRegister}>
            <h1>Register</h1>
            <input onChange={handleChangeUser} placeholder="name" />
            <input
              onChange={handleChangeEmail}
              type="email"
              placeholder="Email"
            />
            <input
              onChange={handleChangepwd}
              type="password"
              placeholder="Password"
            />
            <input onChange={handleUploadImg} accept="image/*" type="file" />
            <button className="btn" type="submit">
              Register
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <input onChange={handleChangeEmail} placeholder="Email" />
            <input
              onChange={handleChangepwd}
              type="password"
              placeholder="Password"
            />
            <button className="btn" type="submit">
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
