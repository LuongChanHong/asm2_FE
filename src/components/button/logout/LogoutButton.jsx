import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "../../navbar/navbar.css";

import { logOutAction } from "../../../redux/actions/userAction";

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnclick = () => {
    navigate("/login");
    dispatch(logOutAction());
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
