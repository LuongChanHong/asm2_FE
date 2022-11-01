import { useState, useEffect } from "react";
import "./navbar.css";

// import LoginButton from "../button/loginButton/LoginButton";
import SignupButton from "../button/signup/SignupButton";
import TransactionButton from "../button/transaction/TransactionButton";
import LoginButton from "../button/login/LoginButton";
import LogoutButton from "../button/logout/LogoutButton";

const Navbar = () => {
  const [user, setUser] = useState(
    localStorage.currentUser ? JSON.parse(localStorage.currentUser) : ""
  );
  useEffect(() => {
    if (localStorage.currentUser) setUser(JSON.parse(localStorage.currentUser));
  }, [localStorage.currentUser]);

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Booking Website</span>
        {user ? (
          <div className="d-flex align-items-center">
            <span>{user.email}</span>
            <TransactionButton />
            <LogoutButton />
          </div>
        ) : (
          <div className="navItems">
            <LoginButton />
            <SignupButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
