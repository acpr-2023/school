// studentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    studentsList: [],
    loading: false,
    enrollmentSuccess: false,
    error: null,
  },
  reducers: {
    getRequest(state) {
      state.loading = true;
    },
    getSuccess(state, action) {
      state.loading = false;
      state.studentsList = action.payload;
    },
    getFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    stuffDone(state) {
      state.loading = false;
    },
    ENROLL_STUDENTS_SUCCESS(state, action) {
      state.loading = false;
      state.enrollmentSuccess = true;
      state.studentsList.push(...action.payload);
    },
    ENROLL_STUDENTS_FAILURE(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    underStudentControl(state) {
      state.loading = false;
      // Your logic here
    },
  },
});

export const {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  stuffDone,
  ENROLL_STUDENTS_SUCCESS,
  ENROLL_STUDENTS_FAILURE,
  underStudentControl,
} = studentSlice.actions;

export default studentSlice.reducer; // Ensure the default export is the reducer
