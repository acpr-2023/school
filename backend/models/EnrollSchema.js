// models/enrolledStudentSchema.js
const mongoose = require('mongoose');

const enrolledStudentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  className: { type: String, required: true },
  schoolYear: { type: String, required: true },
  name: { type: String, required: true },
  rollNum: { type: String, required: true },
});

const EnrolledStudent = mongoose.model('EnrolledStudent', enrolledStudentSchema);

module.exports = EnrolledStudent;
