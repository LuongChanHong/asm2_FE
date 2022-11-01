import React from "react";
import { useNavigate } from "react-router-dom";

import "../../navbar/navbar.css";

const SignupButton = () => {
  const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate("/signup");
  // };

  return (
    <section>
      <button onClick={() => navigate("/signup")} className="navButton">
        Sign Up
      </button>
    </section>
  );
};

export default SignupButton;
