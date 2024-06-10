import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTeachers } from "../../../redux/teacherRelated/teacherHandle";
import { Paper, Box, IconButton, Typography, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Button } from "@mui/material";
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

const ShowTeachers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teachersList, loading, error, response } = useSelector((state) => state.teacher);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllTeachers(currentUser._id));
  }, [currentUser._id, dispatch]);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  if (error) {
    console.log(error);
  }

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID);
    console.log(address);
    setMessage("Sorry the delete function has been disabled for now.");
    setShowPopup(true);
  };

  const teacherColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "teachSubject", label: "Subject", minWidth: 100 },
    { id: "teachSclass", label: "Class", minWidth: 170 },
  ];

  const teacherRows = teachersList.map((teacher) => ({
    name: teacher.name,
    teachSubject: teacher.teachSubject?.subName || null,
    teachSclass: teacher.teachSclass.sclassName,
    teachSclassID: teacher.teachSclass._id,
    id: teacher._id,
  }));

  const TeacherButtonHaver = ({ row }) => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton onClick={() => deleteHandler(row.id, "Teacher")}>
          <PersonRemoveIcon color="error" />
        </IconButton>
        <Button
          variant="contained"
          sx={{ ...buttonStyle, marginRight: "8px" }} // Apply buttonStyle here and add margin
          onClick={() => navigate("/Admin/teachers/teacher/" + row.id)}
        >
          View
        </Button>
        <Button
          variant="contained"
          sx={buttonStyle} // Apply buttonStyle here
          onClick={() => navigate(`/Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`)}
        >
          Add Subject
        </Button>
      </Box>
    );
  };

  const actions = [
    {
      icon: <PersonAddAlt1Icon color="primary" />,
      name: "Add New Teacher",
      action: () => navigate("/Admin/teachers/chooseclass"),
    },
    {
      icon: <PersonRemoveIcon color="error" />,
      name: "Delete All Teachers",
      action: () => deleteHandler(currentUser._id, "Teachers"),
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
          All Teachers
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
                  onClick={() => navigate("/Admin/teachers/chooseclass")}
                >
                  Add Teachers
                </Button>
              </Box>
            ) : (
              <>
                <Paper sx={{ width: "100%", overflow: "hidden", marginTop: 2 }}>
                  {Array.isArray(teachersList) && teachersList.length > 0 && (
                    <Table>
                      <TableHead>
                        <TableRow style={{ backgroundColor: "#ded2c6" }}>
                          {teacherColumns.map((column) => (
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
                              borderBottom: "2px solid #000",
                              width: "400px", 
                            }}
                          >
                            Actions
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {teacherRows.map((row, index) => (
                          <TableRow
                            key={row.id}
                            style={{
                              backgroundColor:
                                index % 2 === 0 ? "#fbe9e7" : "#ffffff",
                            }}
                          >
                            {teacherColumns.map((column) => {
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
                                  {column.id === 'teachSubject' ? (
                                    value ? (
                                      value
                                    ) : (
                                      <Button
                                        variant="contained"
                                        sx={buttonStyle}
                                        onClick={() => navigate(`/Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`)}
                                      >
                                        Add Subject
                                      </Button>
                                    )
                                  ) : (
                                    value
                                  )}
                                </TableCell>
                              );
                            })}
                            <TableCell
                              align="center"
                              sx={{
                                backgroundColor: "#FFEDDA",
                                borderBottom: "1.5px solid #000", // Line thickness
                                width: "150px", // Set the width for the actions column
                              }}
                            >
                              <TeacherButtonHaver row={row} />
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

export default ShowTeachers;
