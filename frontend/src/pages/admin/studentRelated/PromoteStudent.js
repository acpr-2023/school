import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllStudents,
  promoteStudents,
} from "../../../redux/studentRelated/studentHandle";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import {
  Paper,
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Modal,
  Typography,
  Snackbar,
} from "@mui/material";
import TableTemplate from "../../../components/TableTemplate";

const PromoteStudent = () => {
  const dispatch = useDispatch();
  const { studentsList, loading, enrollmentSuccess } = useSelector((state) => state.student);
  const { currentUser } = useSelector((state) => state.user);
  const { sclassesList } = useSelector((state) => state.sclass);

  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllStudents(adminID));
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  const [selectedSchoolYear, setSelectedSchoolYear] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [studentsToPromote, setStudentsToPromote] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [modalSchoolYear, setModalSchoolYear] = useState("");
  const [modalClass, setModalClass] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSchoolYearChange = (event) => {
    setSelectedSchoolYear(event.target.value);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  useEffect(() => {
    const filteredStudents = studentsList.filter(
      (student) =>
        (selectedClass === "" ||
          student.sclassName.sclassName === selectedClass) &&
        (selectedSchoolYear === "" || student.schoolYear === selectedSchoolYear)
    );
    setStudentsToPromote(filteredStudents);
  }, [selectedClass, selectedSchoolYear, studentsList]);

  const handleCheckboxChange = (studentId) => {
    setStudentsToPromote((prevStudents) =>
      prevStudents.some((s) => s._id === studentId)
        ? prevStudents.filter((s) => s._id !== studentId)
        : [...prevStudents, studentsList.find((s) => s._id === studentId)]
    );
  };

  const studentColumns = [
    { id: "name", label: "Student Name", minWidth: 170 },
    { id: "rollNum", label: "Student Number", minWidth: 100 },
    { id: "className", label: "Class Name", minWidth: 100 },
    { id: "schoolYear", label: "School Year", minWidth: 100 },
    {
      id: "promote",
      label: "Promote",
      minWidth: 100,
      renderCell: (row) => (
        <input
          type="checkbox"
          checked={studentsToPromote.some((s) => s._id === row.id)}
          onChange={() => handleCheckboxChange(row.id)}
        />
      ),
    },
  ];

  const filteredStudentRows = studentsList
    .filter(
      (student) =>
        (selectedClass === "" ||
          student.sclassName.sclassName === selectedClass) &&
        (selectedSchoolYear === "" || student.schoolYear === selectedSchoolYear)
    )
    .map((student) => ({
      name: student.name,
      rollNum: student.rollNum,
      className: student.sclassName.sclassName,
      schoolYear: student.schoolYear,
      id: student._id,
    }));

  const handlePromoteButtonClick = () => {
    setOpenModal(true);
  };

  const handleEnrollButtonClick = () => {
    // Collect data for each student to be enrolled
    const enrollmentData = studentsToPromote.map((student) => ({
      studentId: student._id,
      className: modalClass,
      schoolYear: modalSchoolYear,
      name: student.name,
      rollNum: student.rollNum,
    }));

  
  };

  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  useEffect(() => {
    if (enrollmentSuccess) {
      setShowSuccessMessage(true);
    }
  }, [enrollmentSuccess]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Box sx={{ padding: "16px" }}>
          <Box sx={{ display: "flex", mb: 2 }}>
            <FormControl sx={{ width: "20%" }}>
              <InputLabel id="school-year-label">School Year</InputLabel>
              <Select
                labelId="school-year-label"
                value={selectedSchoolYear}
                onChange={handleSchoolYearChange}
              >
                <MenuItem value="">All School Years</MenuItem>
                {[
                  ...new Set(studentsList.map((student) => student.schoolYear)),
                ].map((year, index) => (
                  <MenuItem key={index} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "20%", marginLeft: "16px" }}>
              <InputLabel id="class-label">Class</InputLabel>
              <Select
                labelId="class-label"
                value={selectedClass}
                onChange={handleClassChange}
              >
                <MenuItem value="">All Classes</MenuItem>
                {sclassesList.map((classItem, index) => (
                  <MenuItem key={index} value={classItem.sclassName}>
                    {classItem.sclassName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {Array.isArray(studentsList) && studentsList.length > 0 && (
            <TableTemplate
              columns={studentColumns}
              rows={filteredStudentRows}
              buttonHaver={({ row }) => (
                <input
                  type="checkbox"
                  checked={studentsToPromote.some((s) => s._id === row.id)}
                  onChange={() => handleCheckboxChange(row.id)}
                />
              )}
            />
          )}
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handlePromoteButtonClick}
            disabled={studentsToPromote.length === 0}
          >
            Promote Students
          </Button>
        </Box>
      )}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enroll Students
          </Typography>
          <FormControl sx={{ width: "100%", mt: 2 }}>
            <InputLabel id="modal-school-year-label">School Year</InputLabel>
            <Select
              labelId="modal-school-year-label"
              value={modalSchoolYear}
              onChange={(event) => setModalSchoolYear(event.target.value)}
            >
              <MenuItem value="">Select School Year</MenuItem>
              {[
                ...new Set(studentsList.map((student) => student.schoolYear)),
              ].map((year, index) => (
                <MenuItem key={index} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "100%", mt: 2 }}>
            <InputLabel id="modal-class-label">Class</InputLabel>
            <Select
              labelId="modal-class-label"
              value={modalClass}
              onChange={(event) => setModalClass(event.target.value)}
            >
              <MenuItem value="">Select Class</MenuItem>
              {sclassesList.map((classItem, index) => (
                <MenuItem key={index} value={classItem.sclassName}>
                  {classItem.sclassName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleEnrollButtonClick}
            disabled={!modalSchoolYear || !modalClass}
          >
            Enroll Students
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={6000}
        onClose={handleCloseSuccessMessage}
        message="Enrollment data saved successfully"
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
    </Paper>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default PromoteStudent;
