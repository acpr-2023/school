import { useEffect } from "react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";
import {
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Container,
  Typography,
} from "@mui/material";
import styled from "styled-components";

// Description: Component for displaying details of a teacher's class including students

const TeacherClassDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sclassStudents, loading, error, getresponse } = useSelector(
    (state) => state.sclass
  );

  const { currentUser } = useSelector((state) => state.user);
  const classID = currentUser.teachSclass?._id;
  const subjectID = currentUser.teachSubject?._id;

  useEffect(() => {
    dispatch(getClassStudents(classID));
  }, [dispatch, classID]);

  if (error) {
    console.log(error);
  }

  const studentColumns = [
    { id: "name", label: "Student Name", minWidth: 170 },
    { id: "rollNum", label: "Student Number", minWidth: 100 },
    { id: "schoolYear", label: "School Year", minWidth: 100 },
    { id: "contactNumber", label: "Contact Number", minWidth: 100 },
  ];

  const studentRows = sclassStudents.map((student) => {
    console.log("Student Data:", student); // Debugging log
    return {
      name: student.name,
      rollNum: student.rollNum,
      contactNumber: student.contactNumber,
      schoolYear: student.schoolYear,
      id: student._id,
    };
  });

  const StudentsButtonHaver = ({ row }) => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <StyledButton
          variant="contained"
          onClick={() => navigate("/Teacher/class/student/" + row.id)}
        >
          View
        </StyledButton>
      </Box>
    );
  };

  const teachSclass = currentUser.teachSclass
    ? currentUser.teachSclass.sclassName
    : "Unknown Class";

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {getresponse ? (
            <CenteredBox>No Students Found</CenteredBox>
          ) : (
            <Container>
              <Typography
                variant="h4"
                align="left"
                gutterBottom
                sx={{ marginTop: "50px" }}
              >
                {teachSclass}
              </Typography>
              <Box
                sx={{
                  borderBottom: "3px solid #ff8c0f",
                  marginTop: "5px",
                  marginBottom: "20px",
                }}
              />
              <StyledPaper>
                {Array.isArray(sclassStudents) && sclassStudents.length > 0 && (
                  <TableContainer component={Paper}>
                    <StyledTable>
                      <TableHead>
                        <TableRow>
                          {studentColumns.map((column) => (
                            <StyledTableCellHeader
                              key={column.id}
                              sx={{
                                borderBottom: "1.5px solid #000",
                                borderRight: "1.5px solid #000",
                              }}
                            >
                              <strong>{column.label}</strong>
                            </StyledTableCellHeader>
                          ))}
                          <StyledTableCellHeader sx={{ borderBottom: "1.5px solid #000", textAlign: "center" }}>
                            <strong>Action</strong>
                          </StyledTableCellHeader>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {studentRows.map((row, index) => (
                          <StyledTableRow
                            key={row.id}
                            index={index}
                            length={studentRows.length}
                          >
                            {studentColumns.map((column) => {
                              const value = row[column.id];
                              console.log(`Value for ${column.id}:`, value); // Debugging log
                              return (
                                <StyledTableCell key={column.id}>
                                  {value}
                                </StyledTableCell>
                              );
                            })}
                            <StyledTableCell>
                              <StudentsButtonHaver row={row} />
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </StyledTable>
                  </TableContainer>
                )}
              </StyledPaper>
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default TeacherClassDetails;

const StyledPaper = styled(Paper)`
  width: 100%;
  overflow: hidden;
  margin-top: 20px;
`;

const CenteredBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 20px;
`;

const StyledTable = styled(Table)`
  min-width: 650px;
`;

const StyledTableCellHeader = styled(TableCell)`
  background-color: #ded2c6;
  padding: 16px;
  border-bottom: 2px solid #000;
  border-right: 1.5px solid #000;
  &:last-child {
    border-right: none;
  }
`;

const StyledTableCell = styled(TableCell)`
  padding: 16px;
  border-bottom: 2px solid #000;
  border-right: 1.5px solid #000;
  &:last-child {
    border-right: none;
  }
`;

const StyledTableRow = styled(TableRow)`
  background-color: ${({ index, length }) =>
    index === 0 || index === length - 1 ? "#FFEDDA" : "#ffffff"};

  &:nth-of-type(odd) {
    background-color: ${({ index, length }) =>
      index === 0 || index === length - 1 ? "#FFEDDA" : "#f9f9f9"};
  }

  &:nth-of-type(even) {
    background-color: ${({ index, length }) =>
      index === 0 || index === length - 1 ? "#FFEDDA" : "#ffffff"};
  }
`;

const StyledButton = styled(Button)`
  && {
    background-color: #cdb49a !important;
    color: #000000 !important; /* Black text */
    font-weight: bold; /* Make text bold */
    &:hover {
      background-color: #ff8c0f !important;
    }
  }
`;

