import React from "react";
import { Link } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <nav>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </nav>
    </div>
  );
};

export default Root;
