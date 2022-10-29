import React from "react";

import "./login.css";

import Navbar from "../../components/navbar/Navbar";

const Login = () => {
  const onSubmit = (event) => {
    console.log("onSubmit");
    console.log("event:", event.target.value);
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
              />
              <input
                name="password"
                type="password"
                placeholder="password"
                className="form-control"
              />
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
