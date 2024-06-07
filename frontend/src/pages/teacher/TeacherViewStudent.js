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
import CustomPieChart from "../../components/CustomPieChart";
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
  const [subjectMarks, setSubjectMarks] = useState("");
  const [subjectAttendance, setSubjectAttendance] = useState([]);

  useEffect(() => {
    dispatch(getUserDetails(studentID, address));
  }, [dispatch, studentID]);

  useEffect(() => {
    if (userDetails) {
      setSclassName(userDetails.sclassName || "");
      setStudentSchool(userDetails.school || "");
      setSubjectMarks(userDetails.examResult || "");
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
              margin: "50px",
              padding: "50px",
              textAlign: "left ",
              backgroundColor: "#ded2c6",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h5">Name: {userDetails.name}</Typography>
                <Typography variant="h5">
                  Student Number: {userDetails.rollNum}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5">
                  Class: {sclassName.sclassName}
                </Typography>
                <Typography variant="h5">
                  School: {studentSchool.schoolName}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Box mt={2} textAlign="center">
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
            <Typography variant="h5">Attendance Sheet</Typography>
            {subjectAttendance &&
              Array.isArray(subjectAttendance) &&
              subjectAttendance.length > 0 && (
                <>
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
                                  <StyledTableCell>
                                    {dateString}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {data.status}
                                  </StyledTableCell>
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
                  <Typography variant="h6">
                    Overall Attendance Percentage:{" "}
                    {overallAttendancePercentage.toFixed(2)}%
                  </Typography>
                </>
              )}
          </Box>

          <Box mt={2}>
            <Typography variant="h5">Subject Marks</Typography>
            {subjectMarks &&
              Array.isArray(subjectMarks) &&
              subjectMarks.length > 0 && (
                <>
                  {subjectMarks.map((result, index) => {
                    if (result.subName.subName === teachSubject) {
                      return (
                        <Table key={index}>
                          <TableHead>
                            <StyledTableRow>
                              <StyledTableCell>Subject</StyledTableCell>
                              <StyledTableCell>Marks</StyledTableCell>
                            </StyledTableRow>
                          </TableHead>
                          <TableBody>
                            <StyledTableRow>
                              <StyledTableCell>
                                {result.subName.subName}
                              </StyledTableCell>
                              <StyledTableCell>
                                {result.marksObtained}
                              </StyledTableCell>
                            </StyledTableRow>
                          </TableBody>
                        </Table>
                      );
                    } else if (!result.subName || !result.marksObtained) {
                      return null;
                    }
                    return null;
                  })}
                </>
              )}
          </Box>

          <Box mt={2}>
            <CustomPieChart data={chartData} />
          </Box>
        </Container>
      )}
    </>
  );
};

export default TeacherViewStudent;
