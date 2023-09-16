import React, { useState } from "react";
import axios from "../api/axios.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePwdChange = (e) => {
    setPwd(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { name, email, pwd };
      const response = await axios.post("/register", newUser);
      alert(response.data.message);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <img
          src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          alt=""
        />
        <input onChange={handleNameChange} />
        <input type="email" onChange={handleEmailChange} />
        <input type="password" onChange={handlePwdChange} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Register;
