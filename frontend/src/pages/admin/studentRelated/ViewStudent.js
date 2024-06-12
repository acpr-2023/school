import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUserDetails, updateUser } from '../../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { Avatar, Box, Button, Container, Paper, Divider, Grid, Table, TableBody, TableHead, TableRow, TableCell, Typography, Tab, BottomNavigation, BottomNavigationAction, TableContainer } from '@mui/material'; // Updated import statement
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material'; // Removed unused import
import { removeStuff, updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../../components/attendanceCalculator';
import CustomBarChart from '../../../components/CustomBarChart';
import { styled } from '@mui/system';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import Popup from '../../../components/Popup';
import { Collapse } from '@mui/material';




const ViewStudent = () => {
    const [showTab, setShowTab] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { userDetails, response, loading, error } = useSelector((state) => state.user);

    const studentID = params.id;
    const address = "Student";

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    useEffect(() => {
        if (userDetails && userDetails.sclassName && userDetails.sclassName._id !== undefined) {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    if (response) { console.log(response); }
    else if (error) { console.log(error); }

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const [openStates, setOpenStates] = useState({});

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [selectedSection, setSelectedSection] = useState('table');
    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const fields = password === ""
        ? { name, rollNum }
        : { name, rollNum, password };

    useEffect(() => {
        if (userDetails) {
            setName(userDetails.name || '');
            setRollNum(userDetails.rollNum || '');
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateUser(fields, studentID, address))
            .then(() => {
                dispatch(getUserDetails(studentID, address));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const deleteHandler = () => {
        setMessage("Sorry the delete function has been disabled for now.");
        setShowPopup(true);

        // dispatch(deleteUser(studentID, address))
        //     .then(() => {
        //         navigate(-1)
        //     })
    }

    const removeHandler = (id, deladdress) => {
        dispatch(removeStuff(id, deladdress))
            .then(() => {
                dispatch(getUserDetails(studentID, address));
            });
    }

    const removeSubAttendance = (subId) => {
        dispatch(updateStudentFields(studentID, { subId }, "RemoveStudentSubAtten"))
            .then(() => {
                dispatch(getUserDetails(studentID, address));
            });
    }

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    const subjectData = Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    const StudentAttendanceSection = () => {
        const renderTableSection = () => {
            return (
                <Container>
                    <Typography
                        variant="h4"
                        align="left"
                        gutterBottom
                        sx={{ fontWeight: "bold", marginTop: "50px" }}
                    >
                        Attendance
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
                                    {["Subject", "Present", "Total Sessions", "Attendance Percentage", "Actions"].map((header, index) => (
                                        <TableCell
                                            key={index}
                                            sx={{
                                                backgroundColor: "#ded2c6",
                                                fontWeight: "bold",
                                                borderBottom: "1px solid #000",
                                                borderRight: index < 4 ? "1px solid #000" : "none",
                                                textAlign: "center",
                                                padding: "8px"
                                            }}
                                        >
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                    const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                                    return (
                                        <React.Fragment key={index}>
                                            <TableRow style={{ backgroundColor: "#FFEDDA" }}>
                                                <TableCell
                                                    sx={{
                                                        borderBottom: "1px solid #000",
                                                        borderRight: "1px solid #000",
                                                        textAlign: "center",
                                                        padding: "8px"
                                                    }}
                                                >
                                                    {subName}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        borderBottom: "1px solid #000",
                                                        borderRight: "1px solid #000",
                                                        textAlign: "center",
                                                        padding: "8px"
                                                    }}
                                                >
                                                    {present}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        borderBottom: "1px solid #000",
                                                        borderRight: "1px solid #000",
                                                        textAlign: "center",
                                                        padding: "8px"
                                                    }}
                                                >
                                                    {sessions}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        borderBottom: "1px solid #000",
                                                        borderRight: "1px solid #000",
                                                        textAlign: "center",
                                                        padding: "8px"
                                                    }}
                                                >
                                                    {subjectAttendancePercentage}%
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        borderBottom: "1px solid #000",
                                                        borderRight: "none",
                                                        backgroundColor: "#FFEDDA",
                                                        textAlign: "center",
                                                        padding: "8px"
                                                    }}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => handleOpen(subId)}
                                                        sx={{ 
                                                            marginRight: "8px",
                                                            fontWeight: 'bold',
                                                            color: "#000000",
                                                            backgroundColor: "#CDB49A",
                                                            "&:hover": {
                                                                backgroundColor: "#ff8c0f",
                                                            },
                                                        }}
                                                    >
                                                        {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />} Details
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: "#FFEDDA" }} colSpan={5}>
                                                    <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                        <Box sx={{ margin: 1 }}>
                                                            <Typography variant="h6" gutterBottom component="div">
                                                                Attendance Details
                                                            </Typography>
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
                                                                        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                        return (
                                                                            <TableRow key={index}>
                                                                                <TableCell component="th" scope="row">
                                                                                    {dateString}
                                                                                </TableCell>
                                                                                <TableCell align="right">{data.status}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    })}
                                                                </TableBody>
                                                            </Table>
                                                        </Box>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
                        <Typography variant="h6" component="div">
                            Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%
                        </Typography>
                    </Box>
                </Container>
            )
        }
    
        const renderChartSection = () => {
            return (
                <>
                    <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
                </>
            )
        }
    
        return (
            <>
                {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0
                    ?
                    <>
                        {selectedSection === 'table' && renderTableSection()}
                        {selectedSection === 'chart' && renderChartSection()}
    
                        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                            <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                                <BottomNavigationAction
                                    label="Table"
                                    value="table"
                                    icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                />
                                <BottomNavigationAction
                                    label="Chart"
                                    value="chart"
                                    icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                />
                            </BottomNavigation>
                        </Paper>
                    </>
                    :
                    <Button
                        variant="contained"
                        sx={styles.styledButton}
                        onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}
                    >
                        Add Attendance
                    </Button>
                }
            </>
        )
    }
    
    
    

    const StudentMarksSection = () => {
        const calculateAverageMarks = () => {
            if (subjectMarks.length === 0) return 0;
            const totalMarks = subjectMarks.reduce((sum, result) => sum + result.marksObtained, 0);
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
                                {subjectMarks.map((result, index) => (
                                    <TableRow key={index}>
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
    
        const renderChartSection = () => {
            return (
                <>
                    <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
                </>
            );
        };
    
        return (
            <>
                {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0
                    ?
                    <>
                        {selectedSection === 'table' && renderTableSection()}
                        {selectedSection === 'chart' && renderChartSection()}
    
                        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                            <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                                <BottomNavigationAction
                                    label="Table"
                                    value="table"
                                    icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                />
                                <BottomNavigationAction
                                    label="Chart"
                                    value="chart"
                                    icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                />
                            </BottomNavigation>
                        </Paper>
                    </>
                    :
                    null
                }
            </>
        );
    };
    
    
    

    const StudentDetailsSection = () => {
        const navigate = useNavigate();
        const { userDetails } = useSelector((state) => state.user);
    
        // Check if userDetails is defined before accessing its nested properties
        const studentName = userDetails?.name;
        const rollNum = userDetails?.rollNum;
        const className = userDetails?.sclassName?.sclassName;
        const schoolName = userDetails?.school?.schoolName;
    
        return (
            <Container maxWidth="md">
                <StyledPaper elevation={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Avatar alt="Student Avatar" sx={{ width: 150, height: 150 }}>
                                {String(studentName).charAt(0)}
                            </Avatar>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Typography
                                variant="h3"
                                component="h2"
                                textAlign="left"
                                sx={{ pl: 1 }}
                            >
                                {studentName}
                            </Typography>
                            <Divider
                                sx={{ my: 1, borderBottomWidth: 3, borderColor: "#FF8C0F" }}
                            />
                            <Typography
                                variant="subtitle1"
                                component="p"
                                textAlign="left"
                                sx={{ mb: 1 }}
                            >
                                <strong>Student Number:</strong> {rollNum}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="p"
                                textAlign="left"
                                sx={{ mb: 1 }}
                            >
                                <strong>Class:</strong> {className}
                            </Typography>
                            <Typography variant="subtitle1" component="p" textAlign="left">
                                <strong>School:</strong> {schoolName}
                            </Typography>
                        </Grid>
                    </Grid>
                </StyledPaper>
            </Container>
        );
    };
    
    

    return (
        <>
            {loading
                ?
                <>
                    <div>Loading...</div>
                </>
                :
                <>
                    <Box sx={{ width: '100%', typography: 'body1', }} >
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
                                    <Tab label="Details" value="1" />
                                    <Tab label="Attendance" value="2" />
                                    <Tab label="Marks" value="3" />
                                </TabList>
                            </Box>
                            <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                                <TabPanel value="1">
                                    <StudentDetailsSection />
                                </TabPanel>
                                <TabPanel value="2">
                                    <StudentAttendanceSection />
                                </TabPanel>
                                <TabPanel value="3">
                                    <StudentMarksSection />
                                </TabPanel>
                            </Container>
                        </TabContext>
                    </Box>
                </>
            }
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />

        </>
    )
}

export default ViewStudent

const styles = {
    attendanceButton: {
        marginLeft: "20px",
        backgroundColor: "#270843",
        "&:hover": {
            backgroundColor: "#3f1068",
        }
    },
    styledButton: {
        margin: "20px",
        backgroundColor: "#02250b",
        "&:hover": {
            backgroundColor: "#106312",
        }
    }
}

const StyledPaper = styled(Paper)`
  padding: 50px;
  margin-bottom: 20px;
  margin-top: 30px; /* Add margin-top to create space at the top */
`;