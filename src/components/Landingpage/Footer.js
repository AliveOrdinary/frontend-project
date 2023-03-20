import React from "react";
import rafiki from "../../assets/rafiki.png";
import LOGO from "../../assets/LOGO.png";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-card">
        <img src={rafiki} alt="logo" />
        <div className="foofter-card-content">
          <h1 style={{ color: "#fff" }}>
            Get Matched The Most Valuable Jobs, Just Drop Your CV at Staffing
            Solutions
          </h1>
          <h5 style={{ color: "#fff" }}>
            In the subject line of email, write your name, the description of
            the position you want to apply
          </h5>
        </div>
      </div>
      <div className="footer">
        <img width="100px" src={LOGO} alt="" />
        <h3>About</h3>
        <h3>Jobs</h3>
        <h3>Contact Us</h3>
        <h3>Terms</h3>
        <h3>Privacy Policy</h3>
      </div>
    </div>
  );
};

export default Footer;
