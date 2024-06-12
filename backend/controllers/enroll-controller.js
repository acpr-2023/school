const EnrolledStudent = require("../models/enrolledStudentSchema");

const enrollStudents = async (req, res) => {
  try {
    const { enrollmentData } = req.body;

    const enrolledStudents = await Promise.all(
      enrollmentData.map(async (data) => {
        const enrolledStudent = new EnrolledStudent({
          studentId: data.studentId,
          className: data.className,
          schoolYear: data.schoolYear,
          name: data.name,
          rollNum: data.rollNum,
        });
        return await enrolledStudent.save();
      })
    );

    res
      .status(200)
      .json({ message: "Students enrolled successfully", enrolledStudents });
  } catch (error) {
    console.error("Error enrolling students:", error);
    res.status(500).json({ error: "Failed to enroll students" });
  }
};

module.exports = { enrollStudents };
