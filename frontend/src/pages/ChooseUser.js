import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginUser } from "../redux/userRelated/userHandle";
import { Backdrop, CircularProgress } from "@mui/material";

const ChooseUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(
    (state) => state.user
  );

  const [loader, setLoader] = useState(false);

  const navigateHandler = (user) => {
    const fields = { password };
    setLoader(true);
    dispatch(loginUser(fields, user));
    navigate(`/${user.toLowerCase()}login`);
  };

  useEffect(() => {
    if (status === "success" || currentUser !== null) {
      if (currentRole === "Admin") {
        navigate("/Admin/dashboard");
      } else if (currentRole === "Student") {
        navigate("/Student/dashboard");
      } else if (currentRole === "Teacher") {
        navigate("/Teacher/dashboard");
      }
    } else if (status === "error") {
      setLoader(false);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <StyledPaper elevation={3} onClick={() => navigateHandler("Admin")}>
        <StyledTypography>Admin</StyledTypography>
      </StyledPaper>
      <StyledPaper elevation={3} onClick={() => navigateHandler("Student")}>
        <StyledTypography>Student</StyledTypography>
      </StyledPaper>
      <StyledPaper elevation={3} onClick={() => navigateHandler("Teacher")}>
        <StyledTypography>Teacher</StyledTypography>
      </StyledPaper>
      {loader && (
        <StyledBackdrop open={loader}>
          <StyledCircularProgress color="inherit" />
          Please Wait
        </StyledBackdrop>
      )}
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
`;

const StyledPaper = styled.div`
  padding: 30px;
  text-align: center;
  background-color: #1b1b1b;
  color: #ff8c0f;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: #ff8c0f;
  }
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
`;

const StyledBackdrop = styled(Backdrop)`
  && {
    color: #fff;
    z-index: ${({ theme }) => theme.zIndex.drawer + 1};
  }
`;

const StyledCircularProgress = styled(CircularProgress)`
  && {
    color: #fff;
  }
`;
