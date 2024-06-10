import React, { useEffect, useState } from 'react';
import { Box, Menu, MenuItem, ListItemIcon, Tooltip, Typography, Avatar, Paper, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';
import styled from 'styled-components';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowClasses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector((state) => state.user);

  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  if (error) {
    console.log(error);
  }

  const [showPopup, setShowPopup] = useState(false);

  const SclassButtonHaver = ({ row }) => {
    const actions = [
      { icon: <PostAddIcon />, name: 'Add Subjects', action: () => navigate("/Admin/addsubject/" + row.id) },
      { icon: <PersonAddAlt1Icon />, name: 'Add Student', action: () => navigate("/Admin/class/addstudents/" + row.id) },
    ];
    return (
      <ButtonContainer>
        <BlueButton variant="contained" onClick={() => navigate("/Admin/classes/class/" + row.id)}>
          View
        </BlueButton>
        <ActionMenu actions={actions} />
      </ButtonContainer>
    );
  };

  const ActionMenu = ({ actions }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <>
        <BoxContainer>
          <Tooltip title="Add Students & Subjects">
            <BlueButton variant="contained" onClick={handleClick}>
              Add
              <SpeedDialIcon />
            </BlueButton>
          </Tooltip>
        </BoxContainer>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: styles.styledPaper,
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {actions.map((action) => (
            <MenuItem onClick={action.action} key={action.name}>
              <ListItemIcon fontSize="small">
                {action.icon}
              </ListItemIcon>
              {action.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

  const actions = [
    {
      icon: <AddCardIcon color="primary" />, name: 'Add New Class',
      action: () => navigate("/Admin/addclass")
    },
  ];

  return (
    <>
      <Box sx={{ padding: "120px", paddingTop: "50px", position: "relative" }}>
        <Typography
          variant="h4"
          align="left"
          gutterBottom
          sx={{ fontWeight: "bold", marginBottom: "10px" }}
        >
          All Sections
        </Typography>
        <Box
          sx={{
            height: "3px",
            backgroundColor: "#ff8c0f",
            marginBottom: "20px",
          }}
        />
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              <GreenButton
                variant="contained"
                sx={{ backgroundColor: "#FFEDDA", borderBottom: "1.5px solid #000" }}
                onClick={() => navigate("/Admin/addclass")}
              >
                Add Class
              </GreenButton>
            </Box>
            <Box sx={{ marginTop: '16px' }}>
              {Array.isArray(sclassesList) && sclassesList.length > 0 && (
                <ClassContainer>
                  {sclassesList.map((sclass) => (
                    <ClassBox key={sclass._id}>
                      <AvatarContainer>
                        <Avatar src={sclass.profilePhoto} />
                      </AvatarContainer>
                      <Typography variant="h5">{sclass.sclassName}</Typography>
                      <Typography variant="body1">{sclass.schoolYear}</Typography>
                      <SclassButtonHaver row={{ id: sclass._id }} />
                    </ClassBox>
                  ))}
                </ClassContainer>
              )}
              <SpeedDialTemplate actions={actions} />
            </Box>
          </>
        )}
      </Box>
      <Popup setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default ShowClasses;

const styles = {
  styledPaper: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 100,
      height: 100,
      marginBottom: '1rem',
    },
    '& .MuiButtonBase-root': {
      marginBottom: '0.5rem',
    },
  }
};

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 10px;
`;

const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClassContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  margin-top: 40px;
`;

const ClassBox = styled(Paper)`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
  transition: transform 0.3s, background-color 0.3s;

  &:hover {
    transform: translateY(-5px);
    background-color: rgba(255, 140, 15, 0.6);
  }

  & h5 {
    font-weight: bold;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;

  & .MuiAvatar-root {
    width: 120px;
    height: 120px;
  }
`;
