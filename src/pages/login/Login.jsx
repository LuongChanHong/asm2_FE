import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./login.css";
import { mainPath, serverPath } from "../../utils/path";

import Navbar from "../../components/navbar/Navbar";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [user, setUser] = useState({});

  const onChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setInput({ ...input, [name]: value });
    console.log("============");
    console.log("input:", input);
  };

  const onSubmit = (event) => {
    // console.log("input:", input);

    fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify(input),
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        localStorage.setItem("data", JSON.stringify(data));
        if (data != null) {
          localStorage.setItem("currentUser", JSON.stringify(input));
          setUser(JSON.parse(localStorage.getItem("currentUser")));
          localStorage.removeItem("loginError");
          // navigate("/");
          window.location.href = "http://localhost:3000/home";
        } else {
          localStorage.loginError = true;
        }
      })
      .catch((err) => {
        console.log("err:", err);
        localStorage.setItem("err", err);
      });
  };

  return (
    <section>
      <Navbar />
      <section className="login__body">
        <div className="card">
          <div className="d-flex flex-column card-body">
            <h1 className="text-center">Login</h1>
            <form
              onSubmit={(event) => onSubmit(event)}
              className="d-grid gap-3"
            >
              <input
                name="email"
                type="email"
                placeholder="email"
                className="form-control"
                onChange={onChange}
                value={input.email}
              />
              <input
                name="password"
                type="password"
                placeholder="password"
                className="form-control"
                onChange={onChange}
                value={input.password}
              />
              {localStorage.loginError ? (
                <span className="text-danger">wrong email or password</span>
              ) : (
                <></>
              )}
              <button type="submit" className="btn btn-primary">
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
