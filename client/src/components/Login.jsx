import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePwdChange = (e) => {
    setPwd(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, pwd };
    console.log(user);
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
