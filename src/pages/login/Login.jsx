import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./login.css";

import Navbar from "../../components/navbar/Navbar";
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
    const err = dispatch(logInAction(input, () => navigate(-1)));
    if (err) {
      err.then((res) => {
        setLoginError(true);
      });
    }
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
