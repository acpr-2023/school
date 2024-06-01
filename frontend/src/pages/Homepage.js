import { Box, Button, Container, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Students from "../assets/Students.png";
import { LightPurpleButton } from "../components/buttonStyles";

const Homepage = () => {
  return (
    <StyledContainer>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={12} md={6} container justifyContent="center">
          <img
            src={Students}
            alt="students"
            style={{ width: "80%", height: "auto" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <StyledTitle>
              <span style={{ fontSize: "30px" }}>Welcome to</span>
              <br />
              <span style={{ color: "#ff8c0f" }}>EDU: BRIGHT</span>
              <br />
            </StyledTitle>

            <StyledBox>
              <StyledLink to="/choose">
                <LightPurpleButton variant="contained" fullWidth>
                  Login
                </LightPurpleButton>
              </StyledLink>

              <StyledText>
                <span style={{ color: "#1b1b1b" }}>
                  Don't have an account?{" "}
                </span>
                <Link to="/Adminregister" style={{ color: "#FF8C0F" }}>
                  <span style={{ fontWeight: "bold" }}>Sign up</span>
                </Link>
              </StyledText>
            </StyledBox>
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Homepage;

const StyledContainer = styled(Container)`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  margin: 0;
`;

const StyledPaper = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
  width: 100%; // Ensures the buttons take full width within the Box
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  font-weight: bold;
  text-align: center;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  color: #550080;
  margin-top: 30px;
  margin-bottom: 30px;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%; // Ensures the button takes full width
`;
