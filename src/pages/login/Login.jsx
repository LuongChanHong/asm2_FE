import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./login.css";
import { post } from "../../utils/fetch";

import Navbar from "../../components/navbar/Navbar";

const Login = () => {
  const [input, setInput] = useState({
    email: "user1@mail.com",
    password: "456",
  });
  // const [user, setUser] = useState({});
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

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
    post("/login", input)
      .then((response) => response.json())
      .then(() => {
        // console.log("data:", data);
        // set user để navbar hiện user hiện tại
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ email: input.email })
        );
        setLoginError(false);
        navigate("/home");
      })
      .catch((err) => {
        console.log("err:", err);
        setLoginError(true);
      });
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
              {loginError ? (
                <span className="text-danger">wrong email or password</span>
              ) : (
                <></>
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
