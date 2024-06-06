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
  TableHead,
  Typography,
  Box,
} from "@mui/material";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import CustomBarChart from "../../components/CustomBarChart";

import InsertChartIcon from "@mui/icons-material/InsertChart";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import TableChartIcon from "@mui/icons-material/TableChart";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import { StyledTableCell, StyledTableRow } from "../../components/styles";

const StudentSubjects = () => {
  const dispatch = useDispatch();
  const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
  const { userDetails, currentUser, loading, response, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (currentUser && currentUser._id) {
      dispatch(getUserDetails(currentUser._id, "Student"));
    }
  }, [dispatch, currentUser]);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const [subjectMarks, setSubjectMarks] = useState([]);
  const [selectedSection, setSelectedSection] = useState("table");

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
      <>
        <Typography variant="h4" align="center" gutterBottom>
          Subject Marks
        </Typography>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Subject</StyledTableCell>
              <StyledTableCell>Marks</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {subjectMarks.map((result, index) => {
              if (!result.subName || !result.marksObtained) {
                return null;
              }
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell>{result.subName.subName}</StyledTableCell>
                  <StyledTableCell>{result.marksObtained}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </>
    );
  };

  const renderAverageMarks = () => {
    const averageMarks = calculateAverageMarks();
    console.log("Average Marks:", averageMarks); // Debugging log
    return (
      <Container
        sx={{
          marginTop: 4,
          padding: 2,
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Average Marks (GPA)
        </Typography>
        <Box display="flex" justifyContent="center">
          <Typography variant="h4" color="primary">
            {averageMarks}
          </Typography>
        </Box>
      </Container>
    );
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
