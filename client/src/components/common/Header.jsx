import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";
import { Navbar, Container, Nav, Button, Image } from "react-bootstrap";
import { userAuthorContextObj } from "../../contexts/userAuthorContext.jsx";
import "../../styles/Header.css";

function Header() {
  const { signOut } = useClerk();
  const { currUserAuthor, setCurrUserAuthor } = useContext(userAuthorContextObj);
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();

  async function handleSignOut() {
    await signOut();
    setCurrUserAuthor(null);
    navigate("/");
  }

  const handleProfileClick = () => {
    const role = currUserAuthor?.role || 'user';
    const email = user?.emailAddresses?.[0]?.emailAddress;
    navigate(`/${role === 'author' ? 'author' : 'user'}-profile/${email}`);
  }

  return (
    <Navbar expand="lg" className="header-glass sticky-top py-3 mb-5" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fs-3">
          <span className="brand-text">AuthorHub</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-4">
            {!isSignedIn ? (
              <>
                <Nav.Link as={Link} to="/" className="fw-semibold text-dark">Home</Nav.Link>
                <Nav.Link as={Link} to="/signin" className="fw-semibold text-dark">Sign In</Nav.Link>
                <Link to="/signup">
                  <Button variant="primary" className="px-4">Get Started</Button>
                </Link>
              </>
            ) : (
              <>
                <Nav className="d-flex gap-3 me-3">
                  <Nav.Link as={Link} to="/" className="fw-medium text-dark">Home</Nav.Link>
                  <Nav.Link as={Link} to={`/${currUserAuthor?.role === 'author' ? 'author' : 'user'}-profile/${user?.emailAddresses?.[0]?.emailAddress}/articles`} className="fw-medium text-dark">Articles</Nav.Link>
                </Nav>

                <div className="d-flex align-items-center gap-3 ps-3 border-start border-2">
                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={handleSignOut}
                    className="rounded-pill px-3"
                  >
                    Sign Out
                  </Button>

                  <div
                    className="d-flex align-items-center gap-2 cursor-pointer profile-pill p-1 pe-3 rounded-pill hover-bg-light transition-all"
                    onClick={handleProfileClick}
                    title="Go to Dashboard"
                    style={{ border: '1px solid transparent', transition: 'all 0.2s' }}
                  >
                    <Image
                      src={user?.imageUrl}
                      roundedCircle
                      style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                      className="border border-2 border-white shadow-sm"
                      alt="Profile"
                    />
                    <div className="d-none d-lg-block lh-1 text-start">
                      <div className="fw-bold text-dark small">{user?.firstName}</div>
                      <div className="text-muted" style={{ fontSize: '0.7rem' }}>{currUserAuthor?.role}</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
