import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";
import { Paper, Box } from "@mui/material";
import TableTemplate from "../../components/TableTemplate";
import { BeigeButton } from "../../components/buttonStyles";
const TeacherClassDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sclassStudents, loading, error, getresponse } = useSelector(
    (state) => state.sclass
  );

  const { currentUser } = useSelector((state) => state.user);
  const classID = currentUser.teachSclass?._id;

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
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <BeigeButton
            variant="contained"
            onClick={() => navigate("/Teacher/class/student/" + row.id)}
          >
            View
          </BeigeButton>
        </Box>
      </>
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
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                No Students Found
              </Box>
            </>
          ) : (
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              {Array.isArray(sclassStudents) && sclassStudents.length > 0 && (
                <TableTemplate
                  buttonHaver={StudentsButtonHaver}
                  columns={studentColumns}
                  rows={studentRows}
                />
              )}
            </Paper>
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
  font-weight: bold;
  padding: 16px;
  border-bottom: 2px solid #000;
  border-right: 1.5px solid #000;
  &:last-child {
    border-right: none;
  }
`;

const StyledTableCell = styled(TableCell)`
  font-weight: bold;
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
    color: #ffffff !important;
    &:hover {
      background-color: #ff8c0f !important;
    }
  }
`;
