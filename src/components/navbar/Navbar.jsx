import { useState, useEffect } from "react";

import "./navbar.css";

// import LoginButton from "../button/loginButton/LoginButton";
import SignupButton from "../button/signup/SignupButton";
import TransactionButton from "../button/transaction/TransactionButton";
import LogoutButton from "../button/logout/LogoutButton";

const Navbar = () => {
  const [user, setUser] = useState(localStorage.getItem("currentUser"));

  // useEffect(() => {
  //   if (props.user) {
  //     setUser(props.user);
  //   } else {
  //     setUser({});
  //   }
  // }, [props.user]);

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Booking Website</span>
        {user ? (
          <div className="navItems">
            <TransactionButton />
            <LogoutButton />
          </div>
        ) : (
          <div className="navItems">
            <SignupButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
