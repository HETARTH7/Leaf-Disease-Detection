import React, { useState } from "react";
import axios from "../api/axios.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePwdChange = (e) => {
    setPwd(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = { email, pwd };
      await axios.post("/auth", user);
      navigate("/chat");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" onChange={handleEmailChange} />
        <input type="password" onChange={handlePwdChange} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Register;
