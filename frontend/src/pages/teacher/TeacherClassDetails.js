import { useEffect } from "react";
import * as React from "react";
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
