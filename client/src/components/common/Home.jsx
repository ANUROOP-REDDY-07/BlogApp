import React, { useContext, useEffect, useState } from "react";
import { userAuthorContextObj } from "../../contexts/userAuthorContext";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import "../../styles/Home.css";

function Home() {
  const { currUserAuthor, setCurrUserAuthor } = useContext(userAuthorContextObj);
  const { isSignedIn, user, isLoaded } = useUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function onSelectRole(e) {
    const selectedRole = e.target.value;
    const updatedAuthor = { ...currUserAuthor, role: selectedRole };

    try {
      let res = null;
      const endpoint = selectedRole === "author"
        ? "http://localhost:3000/author-api/author"
        : "http://localhost:3000/user-api/user";

      res = await axios.post(endpoint, updatedAuthor);

      const { message, payload } = res.data;

      if (message === selectedRole) {
        setCurrUserAuthor({ ...updatedAuthor, ...payload });
        navigate(`/${selectedRole}-profile/${updatedAuthor.email}`);
      } else if (message?.toLowerCase().includes("already exists")) {
        navigate(`/${selectedRole}-profile/${updatedAuthor.email}`);
      } else {
        setError(message || "Unexpected error.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  }

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
    <div className="home-page min-vh-100 d-flex flex-column justify-content-center">
      <Container>
        {!isSignedIn ? (
          <Row className="align-items-center py-5">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className="display-3 fw-bold mb-4 lh-sm">
                Share Your Story <br />
                <span className="text-gradient">With the World</span>
              </h1>
              <p className="lead text-muted mb-4" style={{ maxWidth: '500px' }}>
                Join a community of passionate writers and readers. Discover thought-provoking articles or publish your own ideas today.
              </p>
              <div className="d-flex gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="px-5 rounded-pill shadow-lg"
                  onClick={() => navigate("/signin")}
                >
                  Start Writing
                </Button>
                <Button
                  variant="outline-light"
                  size="lg"
                  className="px-5 rounded-pill"
                  onClick={() => navigate("/signup")}
                >
                  Join Us
                </Button>
              </div>

              <div className="mt-5 pt-4 border-top border-secondary">
                <p className="small text-muted mb-2">Trusted by writers from</p>
                <div className="d-flex gap-4 opacity-50">
                  <span className="fw-bold">TechCrunch</span>
                  <span className="fw-bold">Medium</span>
                  <span className="fw-bold">Dev.to</span>
                </div>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <div className="glass-effect p-4 rounded-4 position-relative">
                <div className="position-absolute top-0 start-100 translate-middle p-2 bg-primary border border-light rounded-circle"></div>
                <div className="position-absolute top-100 start-0 translate-middle p-2 bg-secondary border border-light rounded-circle"></div>
                {/* Abstract UI representation */}
                <div className="bg-dark rounded-3 p-3 mb-3 border border-secondary text-start">
                  <div className="d-flex gap-2 mb-2">
                    <div className="bg-secondary rounded-circle" style={{ width: 30, height: 30 }}></div>
                    <div className="bg-secondary rounded-pill w-50 opacity-25"></div>
                  </div>
                  <div className="bg-secondary rounded w-100 mb-2 opacity-10" style={{ height: 100 }}></div>
                  <div className="bg-secondary rounded w-75 opacity-25" style={{ height: 10 }}></div>
                </div>
                <div className="bg-dark rounded-3 p-3 border border-secondary text-start opacity-75" style={{ transform: 'scale(0.95)' }}>
                  <div className="d-flex gap-2 mb-2">
                    <div className="bg-primary rounded-circle" style={{ width: 30, height: 30 }}></div>
                    <div className="bg-primary rounded-pill w-50 opacity-25"></div>
                  </div>
                  <div className="bg-primary rounded w-100 mb-2 opacity-10" style={{ height: 60 }}></div>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="glass-effect border-0 p-4">
                <Card.Body>
                  <div className="text-center mb-5">
                    <img
                      src={user.imageUrl}
                      alt="Profile"
                      className="rounded-circle mb-3 border border-3 border-primary"
                      width={80}
                      height={80}
                    />
                    <h2 className="fw-bold">Welcome, {user.firstName}!</h2>
                    <p className="text-muted">Choose your journey today</p>
                  </div>

                  {error && <div className="alert alert-danger">{error}</div>}

                  <div className="d-grid gap-3">
                    <Form.Check type="radio" id="role-author" name="role" className="d-none" />
                    <label
                      htmlFor="role-author"
                      className="role-card card bg-white border border-2 p-3 cursor-pointer transition-all mb-3"
                      onClick={(e) => onSelectRole({ target: { value: 'author' } })}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                          <i className="bi bi-pen-fill fs-4">✍️</i>
                        </div>
                        <div>
                          <h5 className="mb-1 fw-bold text-dark">Continue as Author</h5>
                          <p className="mb-0 text-secondary small">Write stories, manage articles, and build your audience.</p>
                        </div>
                      </div>
                    </label>

                    <Form.Check type="radio" id="role-user" name="role" className="d-none" />
                    <label
                      htmlFor="role-user"
                      className="role-card card bg-white border border-2 p-3 cursor-pointer transition-all"
                      onClick={(e) => onSelectRole({ target: { value: 'user' } })}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-success bg-opacity-10 p-3 rounded-circle text-success">
                          <i className="bi bi-book-fill fs-4">📖</i>
                        </div>
                        <div>
                          <h5 className="mb-1 fw-bold text-dark">Continue as Reader</h5>
                          <p className="mb-0 text-secondary small">Explore content, follow authors, and stay updated.</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Home;
