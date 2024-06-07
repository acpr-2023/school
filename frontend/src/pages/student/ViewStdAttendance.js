import React, { useEffect, useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Collapse,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import {
  calculateOverallAttendancePercentage,
  calculateSubjectAttendancePercentage,
  groupAttendanceBySubject,
} from "../../components/attendanceCalculator";
import CustomBarChart from "../../components/CustomBarChart";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import TableChartIcon from "@mui/icons-material/TableChart";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";

const buttonStyle = {
  backgroundColor: "#CDB49A",
  "&:hover": {
    backgroundColor: "#ff8c0f",
  },
};

const ViewStdAttendance = () => {
  const dispatch = useDispatch();

  const [openStates, setOpenStates] = useState({});
  const [selectedSection, setSelectedSection] = useState("table");

  const { userDetails, currentUser, loading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "Student"));
  }, [dispatch, currentUser._id]);

  const handleOpen = (subId) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [subId]: !prevState[subId],
    }));
  };

  useEffect(() => {
    if (userDetails) {
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const [subjectAttendance, setSubjectAttendance] = useState([]);

  const attendanceBySubject = groupAttendanceBySubject(subjectAttendance);
  const overallAttendancePercentage =
    calculateOverallAttendancePercentage(subjectAttendance);

  const subjectData = Object.entries(attendanceBySubject).map(
    ([subName, { subCode, present, sessions }]) => {
      const subjectAttendancePercentage = calculateSubjectAttendancePercentage(
        present,
        sessions
      );
      return {
        subject: subName,
        attendancePercentage: subjectAttendancePercentage,
        totalClasses: sessions,
        attendedClasses: present,
      };
    }
  );

  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const renderTableSection = () => {
    return (
      <Box sx={{ padding: "120px", paddingTop: "50px", position: "relative" }}>
        <Typography
          variant="h4"
          align="left"
          gutterBottom
          sx={{ fontWeight: "bold", marginBottom: "10px" }}
        >
          Attendance
        </Typography>
        <Box
          sx={{
            height: "3px",
            backgroundColor: "#ff8c0f",
            marginBottom: "20px",
          }}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#ded2c6" }}>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    borderBottom: "2px solid #000",
                    borderRight: "1.5px solid #000",
                  }}
                >
                  Subject
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    borderBottom: "2px solid #000",
                    borderRight: "1.5px solid #000",
                  }}
                >
                  Present
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    borderBottom: "2px solid #000",
                    borderRight: "1.5px solid #000",
                  }}
                >
                  Total Sessions
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    borderBottom: "2px solid #000",
                    borderRight: "1.5px solid #000",
                  }}
                >
                  Attendance Percentage
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    borderBottom: "2px solid #000",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(attendanceBySubject).map(
                ([subName, { present, allData, subId, sessions }], index) => {
                  const subjectAttendancePercentage =
                    calculateSubjectAttendancePercentage(present, sessions);

                  return (
                    <React.Fragment key={index}>
                      <TableRow
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#fbe9e7" : "#ffffff",
                        }}
                      >
                        <TableCell
                          sx={{
                            backgroundColor: "#FFEDDA",
                            borderBottom: "1.5px solid #000",
                            borderRight: "1.5px solid #000",
                          }}
                        >
                          {subName}
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "#FFEDDA",
                            borderBottom: "1.5px solid #000",
                            borderRight: "1.5px solid #000",
                          }}
                        >
                          {present}
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "#FFEDDA",
                            borderBottom: "1.5px solid #000",
                            borderRight: "1.5px solid #000",
                          }}
                        >
                          {sessions}
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "#FFEDDA",
                            borderBottom: "1.5px solid #000",
                            borderRight: "1.5px solid #000",
                          }}
                        >
                          {subjectAttendancePercentage}%
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            backgroundColor: "#FFEDDA",
                            borderBottom: "1.5px solid #000",
                          }}
                        >
                          <Button
                            variant="contained"
                            sx={buttonStyle}
                            onClick={() => handleOpen(subId)}
                          >
                            {openStates[subId] ? (
                              <KeyboardArrowUp />
                            ) : (
                              <KeyboardArrowDown />
                            )}
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={5}
                        >
                          <Collapse
                            in={openStates[subId]}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box sx={{ margin: 1 }}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                                sx={{ fontWeight: "bold" }}
                              >
                                Attendance Details
                              </Typography>
                              <Box
                                sx={{
                                  height: "2px",
                                  backgroundColor: "#ff8c0f",
                                  marginBottom: "2px",
                                }}
                              />
                              <Table size="small" aria-label="purchases">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {allData.map((data, index) => {
                                    const date = new Date(data.date);
                                    const dateString =
                                      date.toString() !== "Invalid Date"
                                        ? date.toISOString().substring(0, 10)
                                        : "Invalid Date";
                                    return (
                                      <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                          {dateString}
                                        </TableCell>
                                        <TableCell
                                          align="right"
                                          sx={{ fontWeight: "bold" }}
                                        >
                                          {data.status}
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Typography
            variant="h6"
            align="right"
            gutterBottom
            sx={{ fontWeight: "bold", marginBottom: "10px", marginTop: "10px" }}
          >
            Overall Attendance Percentage:{" "}
            {overallAttendancePercentage.toFixed(2)}%
          </Typography>
        </div>
      </Box>
    );
  };

  const renderChartSection = () => {
    return (
      <Box sx={{ padding: "120px", marginTop: "5px" }}>
        <CustomBarChart
          chartData={subjectData}
          dataKey="attendancePercentage"
        />
      </Box>
    );
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {subjectAttendance &&
          Array.isArray(subjectAttendance) &&
          subjectAttendance.length > 0 ? (
            <>
              {selectedSection === "table" && renderTableSection()}
              {selectedSection === "chart" && renderChartSection()}

              <Paper
                sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                elevation={3}
              >
                <BottomNavigation
                  value={selectedSection}
                  onChange={handleSectionChange}
                  showLabels
                >
                  <BottomNavigationAction
                    label="Table"
                    value="table"
                    icon={
                      selectedSection === "table" ? (
                        <TableChartIcon />
                      ) : (
                        <TableChartOutlinedIcon />
                      )
                    }
                  />
                  <BottomNavigationAction
                    label="Chart"
                    value="chart"
                    icon={
                      selectedSection === "chart" ? (
                        <InsertChartIcon />
                      ) : (
                        <InsertChartOutlinedIcon />
                      )
                    }
                  />
                </BottomNavigation>
              </Paper>
            </>
          ) : (
            <>
              <Typography variant="h6" gutterBottom component="div">
                Currently You Have No Attendance Details
              </Typography>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ViewStdAttendance;
