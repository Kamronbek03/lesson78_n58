import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../hooks/UseAuth";
import { useState } from "react";
import Log_In from "../pages/Log_In";
import Sign_In from "../pages/Sign_In";
import styled from "styled-components";

const Logo = styled.h2`
  font-size: 32px;
  color: #000;
  font-weight: 700;
`;

const Header = () => {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Link style={{ textDecoration: "none" }} to="/">
            <Logo>Students-App</Logo>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              {user ? (
                <>
                  <Nav.Link as={Link} to="/StudentsTable">
                    StudentsList
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Profile">
                    Profile
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={() => setShowLogin(true)}>Log In</Nav.Link>
                  <Nav.Link onClick={() => setShowSignIn(true)}>
                    Sign In
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Log_In show={showLogin} onHide={() => setShowLogin(false)} />
      <Sign_In show={showSignIn} onHide={() => setShowSignIn(false)} />
    </>
  );
};

export default Header;
