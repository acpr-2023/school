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
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import { useSelector } from "react-redux";

const TeacherSideBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const sclassName = currentUser.teachSclass;

  const location = useLocation();
  return (
    <>
      <React.Fragment>
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <HomeIcon
              style={{
                color:
                  location.pathname === ("/" || "/Teacher/dashboard")
                    ? "#ff8c0f"
                    : "#CDB49A",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Teacher/class">
          <ListItemIcon>
            <ClassOutlinedIcon
              style={{
                color: location.pathname.startsWith("/Teacher/class")
                  ? "#ff8c0f"
                  : "#CDB49A",
              }}
            />
          </ListItemIcon>
          <ListItemText primary={`Class ${sclassName.sclassName}`} />
        </ListItemButton>
        <ListItemButton component={Link} to="/Teacher/complain">
          <ListItemIcon>
            <AnnouncementOutlinedIcon
              style={{
                color: location.pathname.startsWith("/Teacher/complain")
                  ? "#ff8c0f"
                  : "#CDB49A",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Complain" />
        </ListItemButton>
      </React.Fragment>
      <Divider sx={{ my: 1 }} />
      <React.Fragment>
        <ListSubheader component="div" inset>
          User
        </ListSubheader>
        <ListItemButton component={Link} to="/Teacher/profile">
          <ListItemIcon>
            <AccountCircleOutlinedIcon
              style={{
                color: location.pathname.startsWith("/Teacher/profile")
                  ? "#ff8c0f"
                  : "#CDB49A",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton component={Link} to="/logout">
          <ListItemIcon>
            <ExitToAppIcon
              style={{
                color: location.pathname.startsWith("/logout")
                  ? "#ff8c0f"
                  : "#CDB49A",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </React.Fragment>
    </>
  );
};

export default TeacherSideBar;
