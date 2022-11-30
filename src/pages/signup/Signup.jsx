import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { post } from "../../utils/fetch";

import Navbar from "../../components/navbar/Navbar";
import { signUpAction } from "../../redux/actions/userAction";

const Signup = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [signupError, setSignupError] = useState(false);

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
    // event.preventDefault();
    // console.log("input:", input);
    dispatch(signUpAction(input, () => navigate("/login")));
    // const signup = async () => {
    //   try {
    //     await post("/signup", input);
    //     navigate("/login");
    //   } catch (err) {
    //     setSignupError(true);
    //   }
    // };
    // signup();
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
