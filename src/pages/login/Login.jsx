import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./login.css";

import Navbar from "../../components/navbar/Navbar";
import { post } from "../../utils/fetch";
import { logInAction } from "../../redux/actions/userAction";

const Login = () => {
  const [input, setInput] = useState({
    email: "user1@mail.com",
    password: "456",
  });
  // const [user, setUser] = useState({});
  const [isLoginError, setLoginError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  localStorage.removeItem("currentUser");

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setInput({ ...input, [name]: value });
    // console.log("============");
    // console.log("input:", input);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("input:", input);
    dispatch(logInAction(input, () => navigate("/home")));
    // const login = async () => {
    //   try {
    //     const response = await post("/login", input);
    //     // setEmptyRooms(rooms);
    //     if (response.data !== null) {
    //       // set user để navbar hiện user hiện tại
    //       localStorage.setItem(
    //         "currentUser",
    //         JSON.stringify({ email: input.email })
    //       );
    //       navigate("/home");
    //     }
    //   } catch (err) {
    //     setLoginError(true);
    //   }
    // };

    // login();
  };

  return (
    <section>
      <Navbar />
      <section className="login__body">
        <div className="card">
          <div className="d-flex flex-column card-body">
            <h1 className="text-center">Login</h1>
            <form className="d-grid gap-3">
              <input
                name="email"
                type="email"
                placeholder="email"
                className="form-control"
                onChange={handleChange}
                value={input.email}
              />
              <input
                name="password"
                type="password"
                placeholder="password"
                className="form-control"
                onChange={handleChange}
                value={input.password}
              />
              {isLoginError && (
                <span className="text-danger">wrong email or password</span>
              )}
              <button
                onClick={handleSubmit}
                type="button"
                className="btn btn-primary"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Login;
