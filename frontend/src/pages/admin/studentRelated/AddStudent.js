import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/userRelated/userHandle";
import Popup from "../../../components/Popup";
import { underControl } from "../../../redux/userRelated/userSlice";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import { CircularProgress } from "@mui/material";

const AddStudent = ({ situation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const userState = useSelector((state) => state.user);
  const { status, currentUser, response, error } = userState;
  const { sclassesList } = useSelector((state) => state.sclass);

  const [name, setName] = useState("");
  const [rollNum, setRollNum] = useState("");
  const [password, setPassword] = useState("");
  const [className, setClassName] = useState("");
  const [sclassName, setSclassName] = useState("");
  const [schoolYear, setSchoolYear] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const adminID = currentUser._id;
  const role = "Student";
  const attendance = [];

  useEffect(() => {
    if (situation === "Class") {
      setSclassName(params.id);
    }
  }, [params.id, situation]);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  const handleClassNameChange = (event) => {
    const selectedClassName = event.target.value;
    setClassName(selectedClassName);
    const selectedClass = sclassesList.find(
      (classItem) => classItem.sclassName === selectedClassName
    );
    setSclassName(selectedClass ? selectedClass._id : "");
  };

  const handleSchoolYearChange = (event) => {
    setSchoolYear(event.target.value);
  };

  const fields = {
    name,
    rollNum,
    password,
    sclassName,
    schoolYear,
    adminID,
    role,
    attendance,
    birthdate,
    gender,
    contactNumber,
    emergencyContactNumber,
    email,
    address,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!className || !schoolYear) {
      setMessage("Please select a class name and school year");
      setShowPopup(true);
    } else {
      setLoader(true);
      dispatch(registerUser(fields, role));
    }
  };

  useEffect(() => {
    if (status === "added") {
      dispatch(underControl());
      navigate(-1);
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <>
      <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="registerTitle">Add Student</span>
          <label>Name</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter student's name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
          />
          {situation === "Student" && (
            <>
              <label>Class Name</label>
              <select
                className="registerInput"
                value={className}
                onChange={handleClassNameChange}
                required
              >
                <option value="">Select Class Name</option>
                {sclassesList.map((classItem, index) => (
                  <option key={index} value={classItem.sclassName}>
                    {classItem.sclassName}
                  </option>
                ))}
              </select>
              <label>School Year</label>
              <select
                className="registerInput"
                value={schoolYear}
                onChange={handleSchoolYearChange}
                required
              >
                <option value="">Select School Year</option>
                {[
                  ...new Set(
                    sclassesList.map((classItem) => classItem.schoolYear)
                  ),
                ].map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </>
          )}
          <label>Student Number</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter student's Student Number..."
            value={rollNum}
            onChange={(event) => setRollNum(event.target.value)}
            required
          />
          <label>Password</label>
          <input
            className="registerInput"
            type="password"
            placeholder="Enter student's password..."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            required
          />
          <label>Birthdate</label>
          <input
            className="registerInput"
            type="date"
            placeholder="Enter student's birthdate..."
            value={birthdate}
            onChange={(event) => setBirthdate(event.target.value)}
            required
          />
          <label>Gender</label>
          <select
            className="registerInput"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <label>Contact Number</label>
          <input
            className="registerInput"
            type="tel"
            placeholder="Enter student's contact number..."
            value={contactNumber}
            onChange={(event) => setContactNumber(event.target.value)}
            required
          />
          <label>Emergency Contact Number</label>
          <input
            className="registerInput"
            type="tel"
            placeholder="Enter emergency contact number..."
            value={emergencyContactNumber}
            onChange={(event) => setEmergencyContactNumber(event.target.value)}
            required
          />
          <label>Email</label>
          <input
            className="registerInput"
            type="email"
            placeholder="Enter student's email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label>Address</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter student's address..."
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
          />
          <button className="registerButton" type="submit" disabled={loader}>
            {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
          </button>
        </form>
      </div>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default AddStudent;
