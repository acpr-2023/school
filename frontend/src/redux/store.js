import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userRelated/userSlice"; // Named import
import studentReducer from "./studentRelated/studentSlice"; // Default import
import { noticeReducer } from "./noticeRelated/noticeSlice"; // Named import
import { sclassReducer } from "./sclassRelated/sclassSlice"; // Named import
import { teacherReducer } from "./teacherRelated/teacherSlice"; // Named import
import { complainReducer } from "./complainRelated/complainSlice"; // Named import

const store = configureStore({
  reducer: {
    user: userReducer,
    student: studentReducer,
    teacher: teacherReducer,
    notice: noticeReducer,
    complain: complainReducer,
    sclass: sclassReducer,
  },
});

export default store;
