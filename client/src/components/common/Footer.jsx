import React from "react";
import "../../styles/Footer.css"; // import your CSS (adjust path if not using alias)

function Footer() {
  return (
    <footer className="footer bg-dark text-light pt-4 pb-3 mt-5">
      <div className="container text-center">
        <h5 className="footer-title mb-2">AuthorHub</h5>

        

        <div className="footer-links d-flex justify-content-center gap-4">
          <a href="/" className="footer-link">Home</a>
          <a href="/articles" className="footer-link">Articles</a>
          <a href="/about" className="footer-link">About</a>
          <a href="/contact" className="footer-link">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
