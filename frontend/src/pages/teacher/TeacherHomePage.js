import React, { useEffect, useState } from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CountUp from "react-countup";
import StudentsPic from "../../assets/StudentsPic.png";
import TimePic from "../../assets/TimePic.png";
import DatePic from "../../assets/DatePic.png";
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
      <WhiteBackgroundPaper>
        <Grid container spacing={3}>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={12} md={4} lg={4}>
              <StyledPaper>
                <img src={StudentsPic} alt="Students" width="80" height="80" />
                <Title>Class Students</Title>
                <Data start={0} end={numberOfStudents} duration={2.5} />
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <DatePaper>
                <Typography variant="h6">
                  <img src={DatePic} alt="Students" width="50" height="50" />
                  <Title>Today's Date</Title>
                  {currentDateTime.toLocaleDateString()}
                </Typography>
              </DatePaper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TimePaper>
                <Typography variant="h6">
                  <img src={TimePic} alt="Students" width="50" height="50" />
                  <Title>Current Time</Title>
                  {currentDateTime.toLocaleTimeString()}
                </Typography>
              </TimePaper>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <NoticePaper>
              <Typography variant="h6">No Notices to Show Right Now</Typography>
            </NoticePaper>
          </Grid>
        </Grid>
      </WhiteBackgroundPaper>
    </Container>
  );
};

const WhiteBackgroundPaper = styled(Paper)`
  && {
    background-color: white;
    padding: 16px;
  }
`;

const StyledPaper = styled(Paper)`
  && {
    background-color: #ded2c6;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 200px;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 200px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    color: green;

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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 200px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    color: green;

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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
  }
`;

const Title = styled.p`
  font-size: 1.25rem;
  color: white !important;
  padding: 15px;
  font-weight: 500;
`;

const Data = styled(CountUp)`
  font-size: calc(1rem + 0.5vw);
  color: green;
  font-weight: bold;
`;

export default TeacherHomePage;
