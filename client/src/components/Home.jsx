import React, { useEffect } from "react";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/data", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        console.log(json);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <div>
      <span>{!user ? "" : user.email}</span>
      <button onClick={handleClick}>Log out</button>
    </div>
  );
};

export default Home;
