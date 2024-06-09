import React, { useState } from "react";
// import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteUser, updateUser } from '../../redux/userRelated/userHandle';
// import { useNavigate } from 'react-router-dom'
// import { authLogout } from '../../redux/userRelated/userSlice';
// import { Button, Collapse } from '@mui/material';

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminProfile = () => {
  // const [showTab, setShowTab] = useState(false);
  // const buttonText = showTab ? 'Cancel' : 'Edit profile';

  // const navigate = useNavigate()
  // const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [isHovered, setIsHovered] = useState(false);
  // const { currentUser, response, error } = useSelector((state) => state.user);
  // const address = "Admin"

  // if (response) { console.log(response) }
  // else if (error) { console.log(error) }

  // const [name, setName] = useState(currentUser.name);
  // const [email, setEmail] = useState(currentUser.email);
  // const [password, setPassword] = useState("");
  // const [schoolName, setSchoolName] = useState(currentUser.schoolName);

  // const fields = password === "" ? { name, email, schoolName } : { name, email, password, schoolName }

  // const submitHandler = (event) => {
  //     event.preventDefault()
  //     dispatch(updateUser(fields, currentUser._id, address))
  // }

  // const deleteHandler = () => {
  //     try {
  //         dispatch(deleteUser(currentUser._id, "Students"));
  //         dispatch(deleteUser(currentUser._id, address));
  //         dispatch(authLogout());
  //         navigate('/');
  //     } catch (error) {
  //         console.error(error);
  //     }
  // }

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start", // Align items to the top
      height: "100vh", // Full viewport height
      paddingTop: "70px", // Add padding to move the content downward
    },
    box: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      border: "3px solid #ccc",
      borderRadius: "10px",
      padding: "50px", // Increase padding for more space
      paddingTop: "75px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      width: "60%", // Fixed width
      maxWidth: "1200px", // Max width to prevent it from being too large on large screens
      minHeight: "500px", // Fixed height
      backgroundColor: "#f9f9f9", // Optional background color
    },
    name: {
      fontSize: "2.5em",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "5px",
    },
    line: {
      borderBottom: "3px solid #ff8c0f",
      marginBottom: "15px",
    },
    infoContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    email: {
      fontSize: "1em",
      color: "#555",
      marginBottom: "2px",
      border: "1px solid #ccc",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      borderRadius: "5px",
      padding: "10px", // Add padding for space inside the box
      marginRight: "10px", // Add space between email and school name
      width: "49%", // Set a fixed width
    },
    schoolName: {
      fontSize: "1em",
      color: "#555",
      marginBottom: "2px",
      border: "1px solid #ccc",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      borderRadius: "5px",
      padding: "10px", // Add padding for space inside the box
      width: "49%", // Set a fixed width
    },
    backButton: {
      alignSelf: "flex-start",
      marginTop: "20px",
      padding: "10px 20px",
      fontSize: "1em",
      fontWeight: "bold",
      color: "#fff",
      backgroundColor: isHovered ? "#ff8c0f" : "#ded2c6",
      border: "none",
      borderRadius: "5px",
      textDecoration: "none",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <div>
          <div style={styles.name}>Hi, Admin {currentUser.name}!</div>
          <div style={styles.line}></div>
          <div style={styles.infoContainer}>
            <div style={styles.email}>E-mail: {currentUser.email}</div>
            <div style={styles.schoolName}>
              School: {currentUser.schoolName}
            </div>
          </div>
        </div>
        <Link
          to="AdminDashboard.js"
          style={styles.backButton}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AdminProfile;

// const styles = {
//     attendanceButton: {
//         backgroundColor: "#270843",
//         "&:hover": {
//             backgroundColor: "#3f1068",
//         }
//     }
// }
