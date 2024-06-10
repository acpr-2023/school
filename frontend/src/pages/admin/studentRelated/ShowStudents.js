import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllStudents } from "../../../redux/studentRelated/studentHandle";
import {
  Paper,
  Box,
  IconButton,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Button,
} from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";

const buttonStyle = {
  backgroundColor: "#CDB49A", // Match the color in ViewStdAttendance
  "&:hover": {
    backgroundColor: "#ff8c0f", // Change hover color if needed
  },
  color: "#ffffff", // Set text color to white
};

const ShowStudents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { studentsList, loading, error, response } = useSelector(
    (state) => state.student
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllStudents(currentUser._id));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID);
    console.log(address);
    setMessage("Sorry the delete function has been disabled for now.");
    setShowPopup(true);
  };

  const studentColumns = [
    { id: "schoolYear", label: "School Year", minWidth: 170 },
    { id: "name", label: "Name", minWidth: 170 },
    { id: "rollNum", label: "Student Number", minWidth: 100 },
    { id: "sclassName", label: "Class", minWidth: 170 },
  ];

  const studentRows = studentsList.map((student) => ({
    schoolYear: student.schoolYear,
    name: student.name,
    rollNum: student.rollNum,
    sclassName: student.sclassName.sclassName,
    id: student._id,
  }));

  const StudentButtonHaver = ({ row }) => {
    const handlePromote = () => {
      navigate("/Admin/students/student/promote/" + row.id);
    };

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton onClick={() => deleteHandler(row.id, "Student")}>
          <PersonRemoveIcon color="error" />
        </IconButton>
        <Button
          variant="contained"
          sx={{ ...buttonStyle, marginRight: "8px" }} // Apply buttonStyle here and add margin
          onClick={() => navigate("/Admin/students/student/" + row.id)}
        >
          View
        </Button>
        <Button
          variant="contained"
          sx={buttonStyle} // Apply buttonStyle here
          onClick={handlePromote}
        >
          Promote
        </Button>
      </Box>
    );
  };

  const actions = [
    {
      icon: <PersonAddAlt1Icon color="primary" />,
      name: "Add New Student",
      action: () => navigate("/Admin/addstudents"),
    },
    {
      icon: <PersonRemoveIcon color="error" />,
      name: "Delete All Students",
      action: () => deleteHandler(currentUser._id, "Students"),
    },
  ];

  return (
    <>
      <Box sx={{ padding: "120px", paddingTop: "50px", position: "relative" }}>
        <Typography
          variant="h4"
          align="left"
          gutterBottom
          sx={{ fontWeight: "bold", marginBottom: "10px" }}
        >
          All Students
        </Typography>
        <Box
          sx={{
            height: "3px",
            backgroundColor: "#ff8c0f", // Line color
            marginBottom: "20px",
          }}
        />
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {response ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "16px",
                }}
              >
                <Button
                  variant="contained"
                  sx={buttonStyle}
                  onClick={() => navigate("/Admin/addstudents")}
                >
                  Add Students
                </Button>
              </Box>
            ) : (
              <>
                <Paper sx={{ width: "100%", overflow: "hidden", marginTop: 2 }}>
                  {Array.isArray(studentsList) && studentsList.length > 0 && (
                    <Table>
                      <TableHead>
                        <TableRow style={{ backgroundColor: "#ded2c6" }}>
                          {studentColumns.map((column) => (
                            <TableCell
                              key={column.id}
                              sx={{
                                fontWeight: "bold",
                                borderBottom: "2px solid #000", // Line thickness
                                borderRight: "1.5px solid #000", // Line thickness
                              }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                          <TableCell
                            align="center"
                            sx={{
                              fontWeight: "bold",
                              borderBottom: "2px solid #000", // Line thickness
                              width: "400px", // Set the width for the actions column
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
                              backgroundColor:
                                index % 2 === 0 ? "#fbe9e7" : "#ffffff",
                            }}
                          >
                            {studentColumns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell
                                  key={column.id}
                                  sx={{
                                    backgroundColor: "#FFEDDA",
                                    borderBottom: "1.5px solid #000", // Line thickness
                                    borderRight: "1.5px solid #000", // Line thickness
                                  }}
                                >
                                  {value}
                                </TableCell>
                              );
                            })}
                            <TableCell
                              sx={{
                                backgroundColor: "#FFEDDA",
                                borderBottom: "1.5px solid #000", // Line thickness
                              }}
                            >
                              <StudentButtonHaver row={row} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </Paper>
                <SpeedDialTemplate actions={actions} />
              </>
            )}
          </>
        )}
      </Box>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default ShowStudents;
