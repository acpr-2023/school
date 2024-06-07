import * as React from "react";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import ReportIcon from "@mui/icons-material/Report";
import AssignmentIcon from "@mui/icons-material/Assignment";

const SideBar = () => {
  const location = useLocation();
  return (
    <>
      <React.Fragment>
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <HomeIcon
              color={
                location.pathname === ("/" || "/Admin/dashboard")
                  ? "#ff8c0f"
                  : "#CDB49A"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/classes">
          <ListItemIcon>
            <ClassOutlinedIcon
              color={
                location.pathname.startsWith("/Admin/classes")
                  ? "#ff8c0f"
                  : "#CDB49A"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Classes" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/subjects">
          <ListItemIcon>
            <AssignmentIcon
              color={
                location.pathname.startsWith("/Admin/subjects")
                  ? "#ff8c0f"
                  : "#CDB49A"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Subjects" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/teachers">
          <ListItemIcon>
            <SupervisorAccountOutlinedIcon
              color={
                location.pathname.startsWith("/Admin/teachers")
                  ? "#ff8c0f"
                  : "#CDB49A"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Teachers" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/students">
          <ListItemIcon>
            <PersonOutlineIcon
              color={
                location.pathname.startsWith("/Admin/students")
                  ? "#ff8c0f"
                  : "#CDB49A"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/notices">
          <ListItemIcon>
            <AnnouncementOutlinedIcon
              color={
                location.pathname.startsWith("/Admin/notices")
                  ? "#ff8c0f"
                  : "#CDB49A"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Notices" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/complains">
          <ListItemIcon>
            <ReportIcon
              color={
                location.pathname.startsWith("/Admin/complains")
                  ? "#ff8c0f"
                  : "#CDB49A"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Complains" />
        </ListItemButton>
      </React.Fragment>
      <Divider sx={{ my: 1 }} />
      <React.Fragment>
        <ListSubheader component="div" inset>
          User
        </ListSubheader>
        <ListItemButton component={Link} to="/Admin/profile">
          <ListItemIcon>
            <AccountCircleOutlinedIcon
              color={
                location.pathname.startsWith("/Admin/profile")
                  ? "#ff8c0f"
                  : "#CDB49A"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton component={Link} to="/logout">
          <ListItemIcon>
            <ExitToAppIcon
              color={
                location.pathname.startsWith("/logout") ? "#ff8c0f" : "#CDB49A"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </React.Fragment>
    </>
  );
};

export default SideBar;
