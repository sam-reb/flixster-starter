import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <p>© 2024 Flixster. All rights reserved.</p>
        <p>
          Data provided by{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TMDB
          </a>
          .
        </p>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
