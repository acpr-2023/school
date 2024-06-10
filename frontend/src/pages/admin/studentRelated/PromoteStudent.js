import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllStudents } from "../../../redux/studentRelated/studentHandle";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import {
  Paper,
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
} from "@mui/material";
import TableTemplate from "../../../components/TableTemplate";

const PromoteStudent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { studentsList, loading, error } = useSelector(
    (state) => state.student
  );
  const { currentUser } = useSelector((state) => state.user);
  const { sclassesList } = useSelector((state) => state.sclass);

  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllStudents(currentUser._id));
  }, [currentUser._id, dispatch]);

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  const [selectedSchoolYear, setSelectedSchoolYear] = useState("");
  const [selectedClass, setClassName] = useState("");
  const [studentsToPromote, setStudentsToPromote] = useState([]);

  const handleSchoolYearChange = (event) => {
    setSelectedSchoolYear(event.target.value);
  };

  const handleClassChange = (event) => {
    const selectedClassName = event.target.value;
    setClassName(selectedClassName);
    const filteredStudents = studentsList.filter(
      (student) =>
        student.sclassName.sclassName === selectedClassName &&
        student.schoolYear === selectedSchoolYear
    );
    setStudentsToPromote(filteredStudents);
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
        />
      ),
    },
  ];

  const studentRows = studentsToPromote.map((student) => ({
    name: student.name,
    rollNum: student.rollNum,
    className: student.sclassName.sclassName,
    schoolYear: student.schoolYear,
    id: student._id,
  }));

  const handlePromoteStudents = () => {
    // Implement logic to promote selected students
    console.log("Promoting students:", studentsToPromote);
    // Navigate back to the main student list after promotion
    navigate("/Admin/students");
  };

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
                  ...new Set(
                    sclassesList.map((classItem) => classItem.schoolYear)
                  ),
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
              rows={studentRows}
              buttonHaver={({ row }) => (
                <input
                  type="checkbox"
                  checked={studentsToPromote.some((s) => s._id === row.id)}
                  onChange={() => {
                    // Logic to handle checkbox change
                  }}
                />
              )}
            />
          )}
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handlePromoteStudents}
          >
            Promote Students
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default PromoteStudent;
