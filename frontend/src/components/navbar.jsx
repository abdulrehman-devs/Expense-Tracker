import React from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";

function Navbar({ isLoggedIn, handleSignOut }) {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-title">Expense Tracker</div>
      <div className="navbar-buttons">
        {!isLoggedIn ? (
          <>
            <Link to="/" className="nav-link">
              Pricing
            </Link>
            {location.pathname === "/signin" ? (
              <Link to="/" className="nav-link">Sign Up</Link>
            ) : (
              <Link to="/signin" className="nav-link">Sign In</Link>
            )}
          </>
        ) : (
          <button className="nav-link" onClick={handleSignOut}>
            Sign out
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
