import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableHead,
  Typography,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import {
  calculateOverallAttendancePercentage,
  calculateSubjectAttendancePercentage,
  groupAttendanceBySubject,
} from "../../components/attendanceCalculator";
import { StyledTableCell, StyledTableRow } from "../../components/styles";

const TeacherViewStudent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { currentUser, userDetails, response, loading, error } = useSelector(
    (state) => state.user
  );

  const address = "Student";
  const studentID = params.id;
  const teachSubject = currentUser.teachSubject?.subName;
  const teachSubjectID = currentUser.teachSubject?._id;

  const [sclassName, setSclassName] = useState("");
  const [studentSchool, setStudentSchool] = useState("");
  const [subjectMarks, setSubjectMarks] = useState([]);
  const [subjectAttendance, setSubjectAttendance] = useState([]);

  useEffect(() => {
    dispatch(getUserDetails(studentID, address));
  }, [dispatch, studentID]);

  useEffect(() => {
    if (userDetails) {
      setSclassName(userDetails.sclassName || "");
      setStudentSchool(userDetails.school || "");
      setSubjectMarks(userDetails.examResult || []);
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const overallAttendancePercentage =
    calculateOverallAttendancePercentage(subjectAttendance);
  const overallAbsentPercentage = 100 - overallAttendancePercentage;

  const chartData = [
    { name: "Present", value: overallAttendancePercentage },
    { name: "Absent", value: overallAbsentPercentage },
  ];

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Container>
          <Paper
            elevation={3}
            style={{
              margin: "20px 0",
              padding: "30px",
              backgroundColor: "#ded2c6",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h5" color="black" padding="10px">
                  Name: {userDetails.name}
                </Typography>
                <Typography variant="h5" color="black" padding="10px">
                  Student Number: {userDetails.rollNum}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" color="black" padding="10px">
                  Class: {sclassName.sclassName}
                </Typography>
                <Typography variant="h5" color="black" padding="10px">
                  School: {studentSchool.schoolName}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Box textAlign="center" my={2}>
            <Button
              variant="contained"
              onClick={() =>
                navigate(
                  `/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`
                )
              }
              sx={{
                margin: "0 10px",
                backgroundColor: "#ded2c6",
                color: "black",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#ff8c0f",
                },
              }}
            >
              Add Attendance
            </Button>
            <Button
              variant="contained"
              onClick={() =>
                navigate(
                  `/Teacher/class/student/marks/${studentID}/${teachSubjectID}`
                )
              }
              sx={{
                margin: "0 10px",
                backgroundColor: "#ded2c6",
                color: "black",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#ff8c0f",
                },
              }}
            >
              Add Marks
            </Button>
          </Box>

          <Box mt={2}>
            <Typography variant="h5" color="#6b4c35">
              Attendance Sheet
            </Typography>
            {subjectAttendance &&
              Array.isArray(subjectAttendance) &&
              subjectAttendance.length > 0 && (
                <Table>
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell>Subject</StyledTableCell>
                      <StyledTableCell>Present</StyledTableCell>
                      <StyledTableCell>Total Sessions</StyledTableCell>
                      <StyledTableCell>Attendance Percentage</StyledTableCell>
                      <StyledTableCell>Date</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>

                  <TableBody>
                    {Object.entries(
                      groupAttendanceBySubject(subjectAttendance)
                    ).map(
                      (
                        [subName, { present, allData, subId, sessions }],
                        index
                      ) => {
                        if (subName === teachSubject) {
                          const subjectAttendancePercentage =
                            calculateSubjectAttendancePercentage(
                              present,
                              sessions
                            );

                          return allData.map((data, dataIndex) => {
                            const date = new Date(data.date);
                            const dateString =
                              date.toString() !== "Invalid Date"
                                ? date.toISOString().substring(0, 10)
                                : "Invalid Date";
                            return (
                              <StyledTableRow key={`${index}-${dataIndex}`}>
                                <StyledTableCell>{subName}</StyledTableCell>
                                <StyledTableCell>{present}</StyledTableCell>
                                <StyledTableCell>{sessions}</StyledTableCell>
                                <StyledTableCell>
                                  {subjectAttendancePercentage}%
                                </StyledTableCell>
                                <StyledTableCell>{dateString}</StyledTableCell>
                                <StyledTableCell>{data.status}</StyledTableCell>
                              </StyledTableRow>
                            );
                          });
                        } else {
                          return null;
                        }
                      }
                    )}
                  </TableBody>
                </Table>
              )}
          </Box>

          <Box mt={2}>
            <Typography variant="h5" color="#6b4c35">
              Subject Marks
            </Typography>
            {subjectMarks &&
              Array.isArray(subjectMarks) &&
              subjectMarks.length > 0 && (
                <Table>
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell>Subject</StyledTableCell>
                      <StyledTableCell>Marks</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {subjectMarks.map((result, index) => {
                      if (result.subName.subName === teachSubject) {
                        return (
                          <StyledTableRow key={index}>
                            <StyledTableCell>
                              {result.subName.subName}
                            </StyledTableCell>
                            <StyledTableCell>
                              {result.marksObtained}
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      }
                      return null;
                    })}
                  </TableBody>
                </Table>
              )}
          </Box>
        </Container>
      )}
    </>
  );
};

export default TeacherViewStudent;
