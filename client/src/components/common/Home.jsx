import React, { useContext, useEffect, useState } from "react";
import { userAuthorContextObj } from "../../contexts/userAuthorContext";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../../styles/Home.css"; // ⬅️ adjust path if your styles folder is different

function Home() {
  const { currUserAuthor, setCurrUserAuthor } = useContext(userAuthorContextObj);
  const { isSignedIn, user, isLoaded } = useUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handles role selection
  async function onSelectRole(e) {
    const selectedRole = e.target.value;
    const updatedAuthor = { ...currUserAuthor, role: selectedRole };

    try {
      let res = null;

      if (selectedRole === "author") {
        res = await axios.post(
          "http://localhost:3000/author-api/author",
          updatedAuthor
        );
      } else if (selectedRole === "user") {
        res = await axios.post(
          "http://localhost:3000/user-api/user",
          updatedAuthor
        );
      }

      const { message, payload } = res.data;

      if (message === selectedRole) {
        setCurrUserAuthor({ ...updatedAuthor, ...payload });
        navigate(`/${selectedRole}-profile/${updatedAuthor.email}`);
      } else if (
        message?.toLowerCase().includes("author already exists") &&
        selectedRole === "author"
      ) {
        navigate(`/author-profile/${updatedAuthor.email}`);
      } else if (
        message?.toLowerCase().includes("user already exists") &&
        selectedRole === "user"
      ) {
        navigate(`/user-profile/${updatedAuthor.email}`);
      } else {
        setError(message || "Unexpected error.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  }

  // When Clerk user loads, set context
  useEffect(() => {
    if (isLoaded && user) {
      setCurrUserAuthor({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.emailAddresses?.[0]?.emailAddress || "",
        profileImageUrl: user.imageUrl || "",
      });
    }
  }, [isLoaded, user, setCurrUserAuthor]);

  return (
    <div className="home-page py-5">
      <div className="container">
        {/* Not signed in → Hero */}
        {!isSignedIn && (
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="home-hero card shadow-sm border-0 text-center p-4 p-md-5">
                <h2 className="mb-3">Welcome to the Blog Application</h2>
                <p className="mb-4 text-muted">
                  Sign in or sign up to start writing articles as an author, or
                  explore content as a reader.
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <button
                    className="btn btn-primary px-4"
                    onClick={() => navigate("/signin")}
                  >
                    Sign In
                  </button>
                  <button
                    className="btn btn-outline-primary px-4"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Signed in → Role selection */}
        {isSignedIn && (
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card home-card shadow-sm border-0 p-4 p-md-5">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <img
                    className="user-image-home"
                    src={user.imageUrl}
                    alt="Profile"
                  />
                  <div>
                    <p className="h4 mb-0">Hi, {user.firstName}</p>
                    <p className="text-muted mb-0">
                      Choose how you want to use the platform.
                    </p>
                  </div>
                </div>

                <p className="fw-semibold mb-3">Select your role</p>

                {error && (
                  <div className="alert alert-danger py-2 mb-3">{error}</div>
                )}

                <div className="role-options d-flex flex-column gap-3">
                  {/* Author option */}
                  <label className="role-option card border-0 shadow-sm">
                    <div className="card-body d-flex align-items-center gap-3">
                      <input
                        type="radio"
                        name="role"
                        value="author"
                        className="form-check-input mt-0"
                        onChange={onSelectRole}
                      />
                      <div>
                        <h6 className="mb-1">Author</h6>
                        <p className="mb-0 text-muted small">
                          Create, edit, and manage your own articles.
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* User option */}
                  <label className="role-option card border-0 shadow-sm">
                    <div className="card-body d-flex align-items-center gap-3">
                      <input
                        type="radio"
                        name="role"
                        value="user"
                        className="form-check-input mt-0"
                        onChange={onSelectRole}
                      />
                      <div>
                        <h6 className="mb-1">User / Reader</h6>
                        <p className="mb-0 text-muted small">
                          Read, like, and follow your favorite authors.
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
