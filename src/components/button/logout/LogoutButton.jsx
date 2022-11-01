import React from "react";
import { useNavigate } from "react-router-dom";

import "../../navbar/navbar.css";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleOnclick = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <section>
      <button onClick={handleOnclick} className="navButton">
        Logout
      </button>
    </section>
  );
};

export default LogoutButton;
