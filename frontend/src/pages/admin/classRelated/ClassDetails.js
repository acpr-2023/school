import { useEffect, useState } from "react";
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
import TableTemplate from "../../../components/TableTemplate";
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

const ClassStudentsSection = ({
  subjectID,
  sclassStudents,
  deleteHandler,
  selectedSection,
  handleSectionChange,
}) => {
  const studentColumns = [
    { id: "rollNum", label: "Roll No.", minWidth: 100 },
    { id: "name", label: "Name", minWidth: 170 },
  ];

  const studentRows = sclassStudents.map((student) => ({
    rollNum: student.rollNum,
    name: student.name,
    id: student._id,
  }));

  const StudentsAttendanceButtonHaver = ({ row }) => {
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
                      <StudentsAttendanceButtonHaver row={row} />
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
  const subjectID = "yourSubjectID"; // Replace this with actual logic to get the subject ID

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

  const subjectColumns = [
    { id: "name", label: "Subject Name", minWidth: 170 },
    { id: "code", label: "Subject Code", minWidth: 100 },
  ];

  const subjectRows =
    subjectsList &&
    subjectsList.length > 0 &&
    subjectsList.map((subject) => {
      return {
        name: subject.subName,
        code: subject.subCode,
        id: subject._id,
      };
    });

  const SubjectsButtonHaver = ({ row }) => {
    return (
      <>
        <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
          <DeleteIcon color="error" />
        </IconButton>
        <BlueButton
          variant="contained"
          onClick={() => {
            navigate(`/Admin/class/subject/${classID}/${row.id}`);
          }}
        >
          View
        </BlueButton>
      </>
    );
  };

  const subjectActions = [
    {
      icon: <PostAddIcon color="primary" />,
      name: "Add New Subject",
      action: () => navigate("/Admin/addsubject/" + classID),
    },
    {
      icon: <DeleteIcon color="error" />,
      name: "Delete All Subjects",
      action: () => deleteHandler(classID, "SubjectsClass"),
    },
  ];

  const ClassSubjectsSection = () => {
    return (
      <>
        {response ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "16px",
            }}
          >
            <GreenButton
              variant="contained"
              onClick={() => navigate("/Admin/addsubject/" + classID)}
            >
              Add Subjects
            </GreenButton>
          </Box>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Subjects List:
            </Typography>

            <TableTemplate
              buttonHaver={SubjectsButtonHaver}
              columns={subjectColumns}
              rows={subjectRows}
            />
            <SpeedDialTemplate actions={subjectActions} />
          </>
        )}
      </>
    );
  };

  const ClassTeachersSection = () => {
    return <Typography variant="h5">Teachers</Typography>;
  };

  const ClassDetailsSection = () => {
    const numberOfSubjects = subjectsList.length;
    const numberOfStudents = sclassStudents.length;

    return (
      <Card sx={{ marginTop: 4 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            <strong>Class Details</strong>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Class Name:</Typography>
              <Typography variant="body1">{sclassDetails?.sclassName}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">School Year:</Typography>
              <Typography variant="body1">{sclassDetails?.schoolYear}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Number of Subjects:</Typography>
              <Typography variant="body1">{numberOfSubjects}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Number of Students:</Typography>
              <Typography variant="body1">{numberOfStudents}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                {getresponse && (
                  <GreenButton
                    variant="contained"
                    onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                  >
                    Add Students
                  </GreenButton>
                )}
                {response && (
                  <GreenButton
                    variant="contained"
                    onClick={() => navigate("/Admin/addsubject/" + classID)}
                  >
                    Add Subjects
                  </GreenButton>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
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
                <Tab label="Teachers" value="4" />
              </TabList>
            </Box>
            <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
              <TabPanel value="1">
                <ClassDetailsSection />
              </TabPanel>
              <TabPanel value="2">
                <ClassSubjectsSection />
              </TabPanel>
              <TabPanel value="3">
                <ClassStudentsSection
                  subjectID={subjectID}
                  sclassStudents={sclassStudents}
                  deleteHandler={deleteHandler}
                  selectedSection={selectedSection}
                  handleSectionChange={handleSectionChange}
                />
              </TabPanel>
              <TabPanel value="4">
                <ClassTeachersSection />
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
