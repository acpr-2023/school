import React, { useEffect, useState } from 'react';
import { getClassStudents, getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box, Tab, Typography, CircularProgress, Button, Table, TableHead, TableRow, TableCell, TableBody, IconButton,
    BottomNavigation, BottomNavigationAction, Paper, Container, Divider
} from '@mui/material';
import { BlueButton, GreenButton, PurpleButton } from '../../../components/buttonStyles';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import styled from 'styled-components';
import { Grid } from '@mui/material';


const buttonStyle = {
    backgroundColor: "#CDB49A",
    "&:hover": {
        backgroundColor: "#ff8c0f",
    },
    color: "#ffffff",
};

const ViewSubject = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { subloading, subjectDetails, sclassStudents, getresponse, error } = useSelector((state) => state.sclass);

    const { classID, subjectID } = params;

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    if (error) {
        console.log(error);
    }

    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [selectedSection, setSelectedSection] = useState('attendance');
    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const studentColumns = [
        { id: 'rollNum', label: 'Roll No.', minWidth: 100 },
        { id: 'name', label: 'Name', minWidth: 170 },
    ];

    const studentRows = sclassStudents.map((student) => ({
        rollNum: student.rollNum,
        name: student.name,
        id: student._id,
    }));

    const StudentsAttendanceButtonHaver = ({ row }) => (
        <>
            <Button
                variant="contained"
                sx={{ ...buttonStyle, marginRight: "8px", fontWeight: 'bold',
                    color: "#000000" }}
                onClick={() => navigate("/Admin/students/student/" + row.id)}
            >
                View
            </Button>
        </>
    );

    const StudentsMarksButtonHaver = ({ row }) => (
        <>
            <Button
                variant="contained"
                sx={{ ...buttonStyle, marginRight: "8px"}}
                onClick={() => navigate("/Admin/students/student/" + row.id)}
            >
                View
            </Button>
            <Button
                variant="contained"
                sx={buttonStyle}
                onClick={() => navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)}
            >
                Provide Marks
            </Button>
        </>
    );

    const SubjectStudentsSection = () => (
      <Box sx={{ padding: '120px', paddingTop: '50px', position: 'relative' }}>
          <Typography variant="h3" align="left" gutterBottom sx={{ marginBottom: '10px' }}>
              Students List {/* Change the typography variant to h3 */}
          </Typography>
          <Box sx={{ height: '3px', backgroundColor: '#ff8c0f', marginBottom: '20px' }} />
          <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 2 }}>
              {Array.isArray(sclassStudents) && sclassStudents.length > 0 && (
                  <Table>
                      <TableHead>
                          <TableRow style={{ backgroundColor: '#ded2c6' }}>
                              {studentColumns.map((column) => (
                                  <TableCell
                                      key={column.id}
                                      sx={{
                                          fontWeight: 'bold',
                                          borderBottom: '2px solid #000',
                                          borderRight: '1.5px solid #000',
                                      }}
                                  >
                                      {column.label}
                                  </TableCell>
                              ))}
                              <TableCell
                                  align="center"
                                  sx={{
                                      fontWeight: 'bold',
                                      borderBottom: '2px solid #000',
                                      width: '300px', // Set the width for the actions column
                                  }}
                              >
                                  Actions
                              </TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {studentRows.map((row, index) => (
                              <TableRow
                                  key={row.id}
                                  style={{
                                      backgroundColor: index % 2 === 0 ? '#fbe9e7' : '#ffffff', // Alternating row colors
                                  }}
                              >
                                  {studentColumns.map((column) => {
                                      const value = row[column.id];
                                      return (
                                          <TableCell
                                              key={column.id}
                                              sx={{
                                                  backgroundColor: '#FFEDDA',
                                                  borderBottom: '1.5px solid #000',
                                                  borderRight: '1.5px solid #000',
                                              }}
                                          >
                                              {value}
                                          </TableCell>
                                      );
                                  })}
                                  <TableCell
                                    sx={{
                                        backgroundColor: '#FFEDDA',
                                        borderBottom: '1.5px solid #000',
                                        textAlign: 'center', // Center align the content
                                    }}
                                >
                                    {selectedSection === 'attendance' ? (
                                        <StudentsAttendanceButtonHaver row={row} />
                                    ) : (
                                        <StudentsMarksButtonHaver row={row} />
                                    )}
                                </TableCell>

                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              )}
          </Paper>
          <BottomNavigation
              value={selectedSection}
              onChange={handleSectionChange}
              showLabels
              sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
          >
              <BottomNavigationAction
                  label="Attendance"
                  value="attendance"
                  icon={selectedSection === 'attendance' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
              />
              <BottomNavigationAction
                  label="Marks"
                  value="marks"
                  icon={selectedSection === 'marks' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
              />
          </BottomNavigation>
      </Box>
    );
    
  


    const SubjectDetailsSection = () => {
        const numberOfStudents = sclassStudents.length;

        return (
            <StyledPaper elevation={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h3" component="h2" textAlign="left" sx={{ pl: 1 }}>
                            {subjectDetails?.subName}
                        </Typography>
                        <Divider sx={{ my: 1, borderBottomWidth: 3, borderColor: "#FF8C0F" }} />
                        <Typography variant="subtitle1" component="p" textAlign="left" sx={{ mb: 1 }}>
                            <strong>Subject Code:</strong> {subjectDetails?.subCode}
                        </Typography>
                        <Typography variant="subtitle1" component="p" textAlign="left" sx={{ mb: 1 }}>
                            <strong>Sessions:</strong> {subjectDetails?.sessions}
                        </Typography>
                        <Typography variant="subtitle1" component="p" textAlign="left" sx={{ mb: 1 }}>
                            <strong>Number of Students:</strong> {numberOfStudents}
                        </Typography>
                        <Typography variant="subtitle1" component="p" textAlign="left" sx={{ mb: 1 }}>
                            <strong>Class:</strong> {subjectDetails?.sclassName?.sclassName}
                        </Typography>
                        {subjectDetails?.teacher ? (
                            <Typography variant="subtitle1" component="p" textAlign="left" sx={{ mb: 1 }}>
                                <strong>Teacher:</strong> {subjectDetails.teacher.name}
                            </Typography>
                        ) : (
                            <Box textAlign="center" mt={2}>
                                <GreenButton variant="contained" onClick={() => navigate("/Admin/teachers/addteacher/" + subjectDetails._id)}>
                                    Add Subject Teacher
                                </GreenButton>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </StyledPaper>
        );
    };

    return (
        <>
            {subloading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
                                <Tab label="Details" value="1" />
                                <Tab label="Students" value="2" />
                            </TabList>
                        </Box>
                        <Container sx={{ marginTop: '3rem', marginBottom: '4rem' }}>
                            <TabPanel value="1">
                                <SubjectDetailsSection />
                            </TabPanel>
                            <TabPanel value="2">
                                <SubjectStudentsSection />
                            </TabPanel>
                        </Container>
                    </TabContext>
                </Box>
            )}
        </>
    );
};

export default ViewSubject;

const StyledPaper = styled(Paper)`
    padding: 50px;
    margin-bottom: 20px;
    margin-top: 30px;
`;
