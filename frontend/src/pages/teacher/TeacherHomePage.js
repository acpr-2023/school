import React, { useEffect, useState } from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import SeeNotice from "../../components/SeeNotice";
import CountUp from "react-countup";
import Students from "../../assets/img1.png";
import {
  getClassStudents,
  getSubjectDetails,
} from "../../redux/sclassRelated/sclassHandle";

const TeacherHomePage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { subjectDetails, sclassStudents } = useSelector(
    (state) => state.sclass
  );

  const classID = currentUser.teachSclass?._id;
  const subjectID = currentUser.teachSubject?._id;

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    if (subjectID) {
      dispatch(getSubjectDetails(subjectID, "Subject"));
    }
    if (classID) {
      dispatch(getClassStudents(classID));
    }

    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch, subjectID, classID]);

  const numberOfStudents = sclassStudents?.length || 0;
  const numberOfSessions = subjectDetails?.sessions || 0;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <StyledPaper>
            <img src={Students} alt="Students" width="200" height="200" />
            <Title>Class Students</Title>
            <Data start={0} end={numberOfStudents} duration={2.5} />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <DatePaper>
            <Typography variant="h6">
              <Title>Today's Date</Title>
              {currentDateTime.toLocaleDateString()}
            </Typography>
          </DatePaper>
          <TimePaper>
            <Typography variant="h6">
              <Title>Current Time</Title>
              {currentDateTime.toLocaleTimeString()}
            </Typography>
          </TimePaper>
        </Grid>
        <Grid item xs={12}>
          <NoticePaper>
            <Typography variant="h6">No Notices to Show Right Now</Typography>
          </NoticePaper>
        </Grid>
      </Grid>
    </Container>
  );
};

const StyledPaper = styled(Paper)`
  && {
    background-color: #ded2c6;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 425px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ff8c0f;
    }

    &:active {
      background-color: #ff8c0f;
    }
  }
`;

const DatePaper = styled(Paper)`
  && {
    background-color: #ded2c6;
    padding: 16px;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 200px;
    width: 200%;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ff8c0f;
    }

    &:active {
      background-color: #ff8c0f;
    }
  }
`;

const TimePaper = styled(Paper)`
  && {
    background-color: #ded2c6;
    padding: 16px;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 200px;
    width: 200%;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ff8c0f;
    }

    &:active {
      background-color: #ff8c0f;
    }
  }
`;

const NoticePaper = styled(Paper)`
  && {
    background-color: #ded2c6;
    padding: 200px;
    margin-bottom: 24px;
    margin-left: -2px;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    margin-top: 4px;
  }
`;

const Title = styled.p`
  font-size: 1.25rem;
  color: white !important;
  padding: 15px;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + 0.6vw);
  color: green;
  font-weight: bold;
`;

export default TeacherHomePage;
