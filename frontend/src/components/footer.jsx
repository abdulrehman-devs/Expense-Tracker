import React from "react";
import "./footer.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Footer = () => {

  const location = useLocation();
  const navigate = useNavigate();

  function handleHomeButton (e) {
    e.preventDefault();

    if (location.pathname == '/') {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    else {
      navigate('/')
    }

  }

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* About Section */}
        <div className="footer-section">
          <h3>Expense Tracker</h3>
          <p>
            Track your expenses, manage budgets, and build better financial
            habits with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/" onClick={handleHomeButton}>Home</a></li>
            <li><a href="/" onClick={handleHomeButton}>Pricing</a></li>
            <li><Link to="/signin">Sign In</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: abdulrehmanfaheem1@gmail.com</p>
          <p>Phone: +123 456 7890</p>
          <div className="socials">
            <a href="#">🌐</a>
            <a href="#">🐦</a>
            <a href="#">📘</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
