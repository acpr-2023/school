import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectList } from "../../redux/sclassRelated/sclassHandle";
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import CustomBarChart from "../../components/CustomBarChart";

import InsertChartIcon from "@mui/icons-material/InsertChart";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import TableChartIcon from "@mui/icons-material/TableChart";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";

import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const StudentSubjects = () => {
  const dispatch = useDispatch();
  const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
  const { userDetails, currentUser, loading, response, error } = useSelector(
    (state) => state.user
  );

  const [subjectMarks, setSubjectMarks] = useState([]);
  const [selectedSection, setSelectedSection] = useState("table");

  useEffect(() => {
    if (currentUser && currentUser._id) {
      dispatch(getUserDetails(currentUser._id, "Student"));
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (userDetails) {
      setSubjectMarks(userDetails.examResult || []);
    }
  }, [userDetails]);

  useEffect(() => {
    if (subjectMarks.length === 0 && currentUser && currentUser.sclassName) {
      dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
    }
  }, [subjectMarks, dispatch, currentUser]);

  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const calculateAverageMarks = () => {
    if (subjectMarks.length === 0) return 0;
    const totalMarks = subjectMarks.reduce(
      (total, result) => total + (result.marksObtained || 0),
      0
    );
    return (totalMarks / subjectMarks.length).toFixed(2);
  };

  const renderTableSection = () => {
    return (
      <Container>
        <Typography
          variant="h4"
          align="left"
          gutterBottom
          sx={{ fontWeight: "bold", marginTop: "50px" }}
        >
          Subject Marks
        </Typography>
        <Box
          sx={{
            borderBottom: "3px solid #ff8c0f",
            marginTop: "5px",
            marginBottom: "20px",
          }}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#ded2c6",
                    fontWeight: "bold",
                    borderBottom: "2px solid #000",
                    borderRight: "1.5px solid #000",
                  }}
                >
                  SUBJECT
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#ded2c6",
                    fontWeight: "bold",
                    borderBottom: "2px solid #000",
                  }}
                >
                  MARKS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjectMarks.map((result) => (
                <TableRow key={result.subName.subName}>
                  <TableCell
                    sx={{
                      backgroundColor: "#FFEDDA",
                      borderBottom: "1.5px solid #000",
                      borderRight: "1.5px solid #000",
                    }}
                  >
                    {result.subName.subName}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "1.5px solid #000" }}>
                    {result.marksObtained}
                  </TableCell>
                </TableRow>
              ))}
              {/* Add a new row for the average marks */}
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#ded2c6",
                    fontWeight: "bold",
                    borderBottom: "2px solid #000",
                    borderRight: "1.5px solid #000",
                  }}
                >
                  Average Marks
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "2px solid #000", fontWeight: "bold" }}
                >
                  {calculateAverageMarks()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  };

  const renderAverageMarks = () => {
    const averageMarks = calculateAverageMarks();
    console.log("Average Marks:", averageMarks); // Debugging log
    // return (
    //   <Container
    //     sx={{
    //       marginTop: 4,
    //       padding: 2,
    //       borderRadius: "8px",
    //       boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Added shadow
    //       backgroundColor: "#ded2c6",
    //     }}
    //   >
    //     <Typography
    //       variant="h5"
    //       align="center"
    //       gutterBottom
    //       sx={{ fontWeight: "bold" }}
    //     >
    //       Average Marks (GPA)
    //     </Typography>
    //     <Box display="flex" justifyContent="center">
    //       <Typography variant="h4" sx={{ color: "#ff8c0f" }}>
    //         {averageMarks}
    //       </Typography>
    //     </Box>
    //   </Container>
    // );
  };

  const renderChartSection = () => {
    return <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />;
  };

  const renderClassDetailsSection = () => {
    return (
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Class Details
        </Typography>
        <Typography variant="h5" gutterBottom>
          You are currently in Class {sclassDetails && sclassDetails.sclassName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          And these are the subjects:
        </Typography>
        {subjectsList &&
          subjectsList.map((subject, index) => (
            <div key={index}>
              <Typography variant="subtitle1">
                {subject.subName} ({subject.subCode})
              </Typography>
            </div>
          ))}
      </Container>
    );
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {subjectMarks &&
          Array.isArray(subjectMarks) &&
          subjectMarks.length > 0 ? (
            <>
              {selectedSection === "table" && (
                <>
                  {renderTableSection()}
                  {renderAverageMarks()}
                </>
              )}
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
            <>{renderClassDetailsSection()}</>
          )}
        </div>
      )}
    </>
  );
};

export default StudentSubjects;
