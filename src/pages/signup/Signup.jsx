import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { serverPath } from "../../utils/path";
import Navbar from "../../components/navbar/Navbar";

const Signup = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [signupError, setSignupError] = useState(false);

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
    // event.preventDefault();
    // console.log("input:", input);
    fetch(serverPath + "/signup", {
      method: "POST",
      body: JSON.stringify(input),
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("data:", data);
        setSignupError(false);
        // set user để navbar hiện user hiện tại
        localStorage.setItem("currentUser", JSON.stringify(data));
        navigate("/home");
      })
      .catch((err) => {
        console.log("err:", err);
        setSignupError(true);
      });
  };

  return (
    <section>
      <Navbar />
      <section className="login__body">
        <div className="card">
          <div className="d-flex flex-column card-body">
            <h1 className="text-center">Sign Up</h1>
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
              {signupError ? (
                <span className="text-danger">
                  email exist, try another one
                </span>
              ) : (
                <></>
              )}
              <button
                onClick={handleSubmit}
                type="button"
                className="btn btn-primary"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Signup;
