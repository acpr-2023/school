import { Container, Grid, Paper } from "@mui/material";
import SeeNotice from "../../components/SeeNotice";
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import styled from "styled-components";
import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSclasses } from "../../redux/sclassRelated/sclassHandle";
import { getAllStudents } from "../../redux/studentRelated/studentHandle";
import { getAllTeachers } from "../../redux/teacherRelated/teacherHandle";
import backgroundImage from "../../assets/bg.png";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const { studentsList } = useSelector((state) => state.student);
  const { sclassesList } = useSelector((state) => state.sclass);
  const { teachersList } = useSelector((state) => state.teacher);

  const { currentUser } = useSelector((state) => state.user);

  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllStudents(adminID));
    dispatch(getAllSclasses(adminID, "Sclass"));
    dispatch(getAllTeachers(adminID));
  }, [adminID, dispatch]);

  const numberOfStudents = studentsList && studentsList.length;
  const numberOfClasses = sclassesList && sclassesList.length;
  const numberOfTeachers = teachersList && teachersList.length;

  return (
    <Background>
      <CenteredContainer maxWidth="lg">
        <GridContainer container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            <StyledPaper>
              <img src={Students} alt="Students" />
              <Title>Total Students</Title>
              <Data start={0} end={numberOfStudents} duration={2.5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <StyledPaper>
              <img src={Classes} alt="Classes" />
              <Title>Total Classes</Title>
              <Data start={0} end={numberOfClasses} duration={5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <StyledPaper>
              <img src={Teachers} alt="Teachers" />
              <Title>Total Teachers</Title>
              <Data start={0} end={numberOfTeachers} duration={2.5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="center" alignItems="center"> {/* Nested Grid container */}
              <Grid item xs={8}> {/* Adjust width as needed */}
                <NoticePaper>
                  <SeeNotice />
                </NoticePaper>
              </Grid>
            </Grid>
          </Grid>
        </GridContainer>
      </CenteredContainer>
    </Background>
  );
};

const Background = styled.div`
  // background-image: url(${backgroundImage});}
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const CenteredContainer = styled(Container)`
  background-color: rgba(255, 255, 255, 0.6);
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GridContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPaper = styled(Paper)`
  && {
    background-color: #ded2c6;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

const NoticePaper = styled(Paper)`
  && {
    background-color: #ded2c6;
    padding: 6px;
    margin-right: 200px;
    margin-left: -190px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 2px;
    height: 500px;
    width: 150%;
  }

  /* Target the notice text element (replace with your actual element) */
  && p {
    margin-bottom: -80px; /* Adjust the margin value as needed */
  }
`;

const Title = styled.p`
  font-size: 1.25rem;
  color: white !important;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + 0.6vw);
  color: white;
`;

export default AdminHomePage;
