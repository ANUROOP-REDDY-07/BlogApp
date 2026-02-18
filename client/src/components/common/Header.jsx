import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { userAuthorContextObj } from "../../contexts/userAuthorContext.jsx";

import "../../styles/Header.css"; 

function Header() {
  const { signOut } = useClerk();
  const { currUserAuthor, setCurrUserAuthor } = useContext(userAuthorContextObj);
  const navigate = useNavigate();
  const { isSignedIn, user, isLoaded } = useUser();

  async function handleSignOut() {
    await signOut();
    setCurrUserAuthor(null);
    navigate("/");
  }

  return (
    <header>
      <nav className="navbar navbar-dark bg-dark header-navbar shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Brand / Logo */}
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <div className="brand-logo d-flex align-items-center justify-content-center me-2">
              {/* You can replace this text with an actual logo image if you have one */}
              <span>A</span>
            </div>
            <span className="brand-text">AuthorHub</span>
          </Link>

          {/* Links / User section */}
          <ul className="nav header-links mb-0 d-flex align-items-center">
            {!isSignedIn ? (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signin" className="nav-link">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link btn btn-outline-light ms-2 px-3">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <div className="d-flex align-items-center gap-3 user-info">
                  <img
                    className="user-image"
                    src={user?.imageUrl}
                    alt={user?.firstName || "User"}
                  />
                  <div className="d-flex flex-column">
                    <span className="user-name">
                      {user?.firstName} {user?.lastName}
                    </span>
                    {currUserAuthor && (
                      <span className="user-role text-muted">
                        {currUserAuthor.role || "Author"}
                      </span>
                    )}
                  </div>
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
