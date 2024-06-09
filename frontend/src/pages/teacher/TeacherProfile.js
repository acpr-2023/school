import React from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Container,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Divider } from "@mui/material";

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const teachSclass = currentUser.teachSclass
    ? currentUser.teachSclass.sclassName
    : "Unknown Class";
  const teachSubject = currentUser.teachSubject
    ? currentUser.teachSubject.subName
    : "Unknown Subject";
  const teachSchool = currentUser.school
    ? currentUser.school.schoolName
    : "Unknown School";

  // Function to format date without time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats date without time
  };

  return (
    <>
      <Container maxWidth="md">
        <StyledPaper elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Avatar alt="Teacher Avatar" sx={{ width: 150, height: 150 }}>
                {String(currentUser.name).charAt(0)}
              </Avatar>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h3"
                component="h2"
                textAlign="left"
                sx={{ pl: 1 }}
              >
                {currentUser.name}
              </Typography>
              <Divider
                sx={{ my: 1, borderBottomWidth: 3, borderColor: "#FF8C0F" }}
              />{" "}
              {/* Add a Divider with margin on the y-axis */}
              <Typography
                variant="subtitle1"
                component="p"
                textAlign="left"
                sx={{ mb: 1 }}
              >
                <strong>Email:</strong> {currentUser.email}
              </Typography>
              <Typography
                variant="subtitle1"
                component="p"
                textAlign="left"
                sx={{ mb: 1 }}
              >
                <strong>Class:</strong> {teachSclass}
              </Typography>
              <Typography
                variant="subtitle1"
                component="p"
                textAlign="left"
                sx={{ mb: 1 }}
              >
                <strong>Subject:</strong> {teachSubject}
              </Typography>
              <Typography variant="subtitle1" component="p" textAlign="left">
                <strong>School:</strong> {teachSchool}
              </Typography>
            </Grid>
          </Grid>
        </StyledPaper>
        {/* <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Personal Information
              <Divider
                sx={{ my: 1, borderBottomWidth: 3, borderColor: "#FF8C0F" }}
              />{" "}
              {/* Add a Divider with margin on the y-axis */}
        {/* </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>Date of Birth:</strong>{" "}
                  {formatDate(currentUser.birthdate)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>Gender:</strong> {currentUser.gender}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>Phone:</strong> {currentUser.contactNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>Address:</strong> {currentUser.address}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>Emergency Contact:</strong>{" "}
                  {currentUser.emergencyContactNumber}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card> */}
      </Container>
    </>
  );
};

export default TeacherProfile;

const StyledPaper = styled(Paper)`
  padding: 50px;
  margin-bottom: 20px;
  margin-top: 30px; /* Add margin-top to create space at the top */
`;
