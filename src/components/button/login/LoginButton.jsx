import React from "react";
import { useNavigate } from "react-router-dom";

import "../../navbar/navbar.css";

const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <section>
      <button onClick={() => navigate("/login")} className="navButton">
        Login
      </button>
    </section>
  );
};

export default LoginButton;
