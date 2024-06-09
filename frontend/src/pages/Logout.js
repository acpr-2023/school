import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../redux/userRelated/userSlice";
import styled from "styled-components";

const Logout = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authLogout());
    navigate("/");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <LogoutContainer>
      <UserName>{currentUser.name}</UserName>
      <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
      <LogoutButtonGroup>
        <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
        <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
      </LogoutButtonGroup>
    </LogoutContainer>
  );
};
export default Logout;

const LogoutContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin: 50px auto; // Center the container horizontally
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  background-color: #ded2c6;
  color: black;
  width: 500px; // Set the width to make it square
  height: 500px; // Set the height to match the width
`;

const UserName = styled.h1`
  border-bottom: 2px solid #ff8c0f; // Add a line under the name with color #ff8c0f
`;

const LogoutMessage = styled.p`
  margin-bottom: 20px;
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
`;

const LogoutButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 48%;
`;

const LogoutButton = styled.button`
  flex: 1;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  margin-right: 10px; // Add margin between the buttons

  &:last-child {
    margin-right: 0; // Remove margin from the last button

  &:hover {
    color: #fff;
    background-color: #333;
  }
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background-color: #ff8c0f;
  &:hover {
    color: #fff;
    background-color: #ea0606;
  }
`;

const LogoutButtonCancel = styled(LogoutButton)`
  background-color: #ff8c0f;
`;
