import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getClassDetails,
  getClassStudents,
  getSubjectList,
} from "../../../redux/sclassRelated/sclassHandle";
import {
  Box,
  Container,
  Typography,
  Tab,
  IconButton,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  Grid,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  BlueButton,
  GreenButton,
  PurpleButton,
} from "../../../components/buttonStyles";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from "@mui/icons-material/PostAdd";
import TableChartIcon from "@mui/icons-material/TableChart";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";

const buttonStyle = {
  backgroundColor: "#CDB49A",
  "&:hover": {
    backgroundColor: "#ff8c0f",
  },
  color: "#ffffff",
};

const StudentsMarksButtonHaver = ({ row, subjectID }) => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="contained"
        sx={{ ...buttonStyle, marginRight: "8px" }}
        onClick={() => navigate("/Admin/students/student/" + row.id)}
      >
        View
      </Button>
      <Button
        variant="contained"
        sx={buttonStyle}
        onClick={() =>
          navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)
        }
      >
        Provide Marks
      </Button>
    </>
  );
};

const StudentsAttendanceButtonHaver = ({ row, deleteHandler }) => {
  const navigate = useNavigate();

  return (
    <>
      <IconButton onClick={() => deleteHandler(row.id, "Student")}>
        <PersonRemoveIcon color="error" />
      </IconButton>
      <Button
        variant="contained"
        sx={{ ...buttonStyle, marginRight: "8px", fontWeight: "bold", color: "#000000" }}
        onClick={() => navigate("/Admin/students/student/" + row.id)}
      >
        View
      </Button>
    </>
  );
};

const ClassStudentsSection = ({ subjectID, sclassStudents, deleteHandler, selectedSection, handleSectionChange }) => {
  const studentColumns = [
    { id: "rollNum", label: "Roll No.", minWidth: 100 },
    { id: "name", label: "Name", minWidth: 170 },
  ];

  const studentRows = sclassStudents.map((student) => ({
    rollNum: student.rollNum,
    name: student.name,
    id: student._id,
  }));

  return (
    <Box sx={{ padding: "120px", paddingTop: "50px", position: "relative" }}>
      <Typography
        variant="h3"
        align="left"
        gutterBottom
        sx={{ marginBottom: "10px" }}
      >
        Students List
      </Typography>
      <Box sx={{ height: "3px", backgroundColor: "#ff8c0f", marginBottom: "20px" }} />
      <Paper sx={{ width: "100%", overflow: "hidden", marginTop: 2 }}>
        {Array.isArray(sclassStudents) && sclassStudents.length > 0 && (
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#ded2c6" }}>
                {studentColumns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      fontWeight: "bold",
                      borderBottom: "2px solid #000",
                      borderRight: "1.5px solid #000",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    borderBottom: "2px solid #000",
                    width: "300px", // Set the width for the actions column
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
                    backgroundColor: index % 2 === 0 ? "#fbe9e7" : "#ffffff", // Alternating row colors
                  }}
                >
                  {studentColumns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        sx={{
                          backgroundColor: "#FFEDDA",
                          borderBottom: "1.5px solid #000",
                          borderRight: "1.5px solid #000",
                        }}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                  <TableCell
                    sx={{
                      backgroundColor: "#FFEDDA",
                      borderBottom: "1.5px solid #000",
                      textAlign: "center", // Center align the content
                    }}
                  >
                    {selectedSection === "attendance" ? (
                      <StudentsAttendanceButtonHaver row={row} deleteHandler={deleteHandler} />
                    ) : (
                      <StudentsMarksButtonHaver row={row} subjectID={subjectID} />
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
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      >
        <BottomNavigationAction
          label="Attendance"
          value="attendance"
          icon={selectedSection === "attendance" ? <TableChartIcon /> : <TableChartOutlinedIcon />}
        />
        <BottomNavigationAction
          label="Marks"
          value="marks"
          icon={selectedSection === "marks" ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

const ClassSubjectsSection = ({ subjectsList = [], classID, deleteHandler }) => {
  const subjectColumns = [
    { id: "name", label: "Subject Name", minWidth: 170 },
    { id: "code", label: "Subject Code", minWidth: 100 },
  ];

  const subjectRows = subjectsList.map((subject) => ({
    name: subject.subName,
    code: subject.subCode,
    id: subject._id,
  }));

  const SubjectsButtonHaver = ({ row }) => {
    const navigate = useNavigate();

    return (
      <>
        <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
          <DeleteIcon color="error" />
        </IconButton>
        <Button
          variant="contained"
          sx={{ ...buttonStyle, marginRight: "8px" }}
          onClick={() => navigate(`/Admin/class/subject/${classID}/${row.id}`)}
        >
          View
        </Button>
      </>
    );
  };

  return (
    <Box sx={{ padding: "120px", paddingTop: "50px", position: "relative" }}>
      <Typography
        variant="h3"
        align="left"
        gutterBottom
        sx={{ marginBottom: "10px" }}
      >
        Subjects List
      </Typography>
      <Box sx={{ height: "3px", backgroundColor: "#ff8c0f", marginBottom: "20px" }} />
      <Paper sx={{ width: "100%", overflow: "hidden", marginTop: 2 }}>
        {Array.isArray(subjectsList) && subjectsList.length > 0 && (
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#ded2c6" }}>
                {subjectColumns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      fontWeight: "bold",
                      borderBottom: "2px solid #000",
                      borderRight: "1.5px solid #000",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    borderBottom: "2px solid #000",
                    width: "300px", // Set the width for the actions column
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjectRows.map((row, index) => (
                <TableRow
                  key={row.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#fbe9e7" : "#ffffff", // Alternating row colors
                  }}
                >
                  {subjectColumns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        sx={{
                          backgroundColor: "#FFEDDA",
                          borderBottom: "1.5px solid #000",
                          borderRight: "1.5px solid #000",
                        }}                    >
                        {value}
                      </TableCell>
                    );
                  })}
                  <TableCell
                    sx={{
                      backgroundColor: "#FFEDDA",
                      borderBottom: "1.5px solid #000",
                      textAlign: "center", // Center align the content
                    }}
                  >
                    <SubjectsButtonHaver row={row} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
};

const ClassDetailsSection = ({
  subjectsList,
  sclassStudents,
  sclassDetails,
  classID,
  navigate,
  response,
  getresponse,
}) => {
  const numberOfSubjects = subjectsList.length;
  const numberOfStudents = sclassStudents.length;

  return (
    <Card sx={{ marginTop: 4 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3" component="h2" textAlign="left">
              {sclassDetails?.sclassName}
            </Typography>
            <Divider sx={{ my: 1, borderBottomWidth: 3, borderColor: "#FF8C0F" }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" component="p" textAlign="left">
              <strong>School Year:</strong> {sclassDetails?.schoolYear}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" component="p" textAlign="left">
              <strong>Number of Subjects:</strong> {numberOfSubjects}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" component="p" textAlign="left">
              <strong>Number of Students:</strong> {numberOfStudents}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              {getresponse && (
                <Button
                  variant="contained"
                  sx={{
                    ...buttonStyle,
                    fontWeight: 'bold',
                    ml: 90,
                    color: "#000000"
                  }}
                  onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                >
                  Add Students
                </Button>
              )}
              {response && (
                <Button
                  variant="contained"
                  sx={{
                    ...buttonStyle,
                    ml: 2,
                    fontWeight: 'bold',
                    color: "#000000"
                  }}
                  onClick={() => navigate("/Admin/addsubject/" + classID)}
                >
                  Add Subjects
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};


const ClassDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    subjectsList,
    sclassStudents,
    sclassDetails,
    loading,
    error,
    response,
    getresponse,
  } = useSelector((state) => state.sclass);

  const classID = params.id;

  useEffect(() => {
    dispatch(getClassDetails(classID, "Sclass"));
    dispatch(getSubjectList(classID, "ClassSubjects"));
    dispatch(getClassStudents(classID));
  }, [dispatch, classID]);

  if (error) {
    console.log(error);
  }

  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [selectedSection, setSelectedSection] = useState("attendance");
  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID);
    console.log(address);
    setMessage("Sorry the delete function has been disabled for now.");
    setShowPopup(true);
  };

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                sx={{
                  position: "fixed",
                  width: "100%",
                  bgcolor: "background.paper",
                  zIndex: 1,
                }}
              >
                <Tab label="Details" value="1" />
                <Tab label="Subjects" value="2" />
                <Tab label="Students" value="3" />
              </TabList>
            </Box>
            <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
              <TabPanel value="1">
                <ClassDetailsSection
                  subjectsList={subjectsList}
                  sclassStudents={sclassStudents}
                  sclassDetails={sclassDetails}
                  classID={classID}
                  navigate={navigate}
                  response={response}
                  getresponse={getresponse}
                />
              </TabPanel>
              <TabPanel value="2">
                <ClassSubjectsSection
                  subjectsList={subjectsList}
                  classID={classID}
                  deleteHandler={deleteHandler}
                />
              </TabPanel>
              <TabPanel value="3">
                <ClassStudentsSection
                  subjectID={classID} // Updated to pass classID as subjectID
                  sclassStudents={sclassStudents}
                  deleteHandler={deleteHandler}
                  selectedSection={selectedSection}
                  handleSectionChange={handleSectionChange}
                />
              </TabPanel>
            </Container>
          </TabContext>
        </Box>
      )}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default ClassDetails;

                     
