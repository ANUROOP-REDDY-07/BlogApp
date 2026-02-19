import React from "react";
import "../../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer bg-white border-top mt-auto pt-5 pb-3">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6 mb-3">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="fs-4 fw-bold text-primary">AuthorHub</span>
            </div>
            <p className="text-secondary small">
              Empowering voices, connecting minds. A platform for writers to share their stories with the world.
            </p>
            <div className="d-flex gap-3 mt-3">
              <button className="btn btn-sm btn-outline-secondary rounded-circle" style={{ width: 32, height: 32, padding: 0 }}><i className="bi bi-twitter"></i></button>
              <button className="btn btn-sm btn-outline-secondary rounded-circle" style={{ width: 32, height: 32, padding: 0 }}><i className="bi bi-github"></i></button>
              <button className="btn btn-sm btn-outline-secondary rounded-circle" style={{ width: 32, height: 32, padding: 0 }}><i className="bi bi-linkedin"></i></button>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 col-6 mb-3">
            <h6 className="fw-bold mb-3 text-dark">Platform</h6>
            <div className="d-flex flex-column gap-2 small">
              <a href="/" className="text-decoration-none text-muted hover-primary">Home</a>
              <a href="/articles" className="text-decoration-none text-muted hover-primary">Articles</a>
              <a href="/authors" className="text-decoration-none text-muted hover-primary">Authors</a>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 col-6 mb-3">
            <h6 className="fw-bold mb-3 text-dark">Company</h6>
            <div className="d-flex flex-column gap-2 small">
              <a href="/about" className="text-decoration-none text-muted hover-primary">About Us</a>
              <a href="/careers" className="text-decoration-none text-muted hover-primary">Careers</a>
              <a href="/privacy" className="text-decoration-none text-muted hover-primary">Privacy</a>
            </div>
          </div>

          <div className="col-lg-4 col-md-12 mb-3">
            <h6 className="fw-bold mb-3 text-dark">Newsletter</h6>
            <p className="text-secondary small mb-3">Subscribe to get the latest articles and updates.</p>
            <div className="input-group">
              <input type="email" className="form-control" placeholder="Enter your email" />
              <button className="btn btn-primary" type="button">Subscribe</button>
            </div>
          </div>
        </div>

        <hr className="my-4 border-secondary opacity-10" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small text-secondary">
          <div>&copy; {new Date().getFullYear()} AuthorHub. All rights reserved.</div>
          <div className="d-flex gap-3 mt-2 mt-md-0">
            <a href="#" className="text-decoration-none text-muted">Terms</a>
            <a href="#" className="text-decoration-none text-muted">Privacy</a>
            <a href="#" className="text-decoration-none text-muted">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
