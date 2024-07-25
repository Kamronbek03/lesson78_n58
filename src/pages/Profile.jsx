import React from "react";
import { useAuth } from "../hooks/UseAuth";
import { Container } from "react-bootstrap";
import styled from "styled-components";

const Title = styled.h1`
  margin-bottom: 16px;
`;

const Info = styled.p`
  margin: 8px 0;
`;

const LogoutButton = styled.button`
  font-family: monospace;
  background-color: #f3f7fe;
  color: #3b82f6;
  border: none;
  border-radius: 8px;
  width: 100px;
  height: 45px;
  transition: 0.3s;

  &:hover {
    background-color: #cd4632;
    box-shadow: 0 0 0 5px #eb85855f;
    color: #fff;
  }
`;
const Tittle = styled.h2`
  font-weight: 600;
  color: crimson;
`;

const Profile = () => {
  const { user, isNewUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <Container>
      <Title>Profile</Title>
      {user ? (
        <div>
          <Tittle>{isNewUser ? "Hello new user" : "Hello old user"}</Tittle>
          <Info>
            <strong>ID:</strong> {user.id}
          </Info>
          <Info>
            <strong>First Name:</strong> {user.firstName}
          </Info>
          <Info>
            <strong>Last Name:</strong> {user.lastName}
          </Info>
          <Info>
            <strong>Group:</strong> {user.group}
          </Info>
        </div>
      ) : (
        <p>No user logged in</p>
      )}
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Container>
  );
};

export default Profile;
