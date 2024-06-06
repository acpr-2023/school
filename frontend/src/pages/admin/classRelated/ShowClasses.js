import { useEffect, useState } from 'react';
import { IconButton, Box, Menu, MenuItem, ListItemIcon, Tooltip, Typography, Avatar, Paper } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';
import styled from 'styled-components';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowClasses = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user)

  const adminID = currentUser._id

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  if (error) {
    console.log(error)
  }

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID);
    console.log(address);
    setMessage("Sorry the delete function has been disabled for now.")
    setShowPopup(true)
  }

  const SclassButtonHaver = ({ row }) => {
    const actions = [
      { icon: <PostAddIcon />, name: 'Add Subjects', action: () => navigate("/Admin/addsubject/" + row.id) },
      { icon: <PersonAddAlt1Icon />, name: 'Add Student', action: () => navigate("/Admin/class/addstudents/" + row.id) },
    ];
    return (
      <ButtonContainer>
        <IconButton onClick={() => deleteHandler(row.id, "Sclass")} color="secondary">
          <DeleteIcon color="error" />
        </IconButton>
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
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Add Students & Subjects">
            <Box border={1} borderRadius={10} p={1}> {/* Added Box with border and borderRadius */}
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <h5>Add</h5>
                <SpeedDialIcon />
              </IconButton>
            </Box>
          </Tooltip>
        </Box>
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
            <MenuItem onClick={action.action}>
              <ListItemIcon fontSize="small">
                {action.icon}
              </ListItemIcon>
              {action.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }

  const actions = [
    {
      icon: <AddCardIcon color="primary" />, name: 'Add New Class',
      action: () => navigate("/Admin/addclass")
    },
    {
      icon: <DeleteIcon color="error" />, name: 'Delete All Classes',
      action: () => deleteHandler(adminID, "Sclasses")
    },
  ];

  return (
    <>
      {loading ?
        <div>Loading...</div>
        :
        <>
          {getresponse ?
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <GreenButton variant="contained" onClick={() => navigate("/Admin/addclass")}>
                Add Class
              </GreenButton>
            </Box>
            :
            <>
              {Array.isArray(sclassesList) && sclassesList.length > 0 &&
                <ClassContainer>
                  {sclassesList.map((sclass) => (
                    <ClassBox key={sclass._id}>
                      <AvatarContainer>
                        <Avatar src={sclass.profilePhoto} />
                      </AvatarContainer>
                      <Typography variant="h5">{sclass.sclassName}</Typography>
                      <SclassButtonHaver row={{ id: sclass._id }} />
                    </ClassBox>
                  ))}
                </ClassContainer>
              }
              <SpeedDialTemplate actions={actions} />
            </>}
        </>
      }
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
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
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const ClassContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  margin-top: 40px;
`;
const ClassBox = styled(Paper)`
  background-color: rgba(255, 140, 15, 0.7); /* Lower opacity */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 350px; /* Increased width */
  text-align: center;
  transition: transform 0.3s, background-color 0.3s; /* Added background-color transition */

  &:hover {
    transform: translateY(-5px);
    background-color: rgba(255, 140, 15, 0.6); /* Change background color on hover with lower opacity */
  }

  & h5 {
    font-weight: bold; /* Bold text */
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem; /* Increase bottom margin */
  gap: 1rem; /* Added gap between avatar and text */

  & .MuiAvatar-root {
    width: 120px; /* Increase width */
    height: 120px; /* Increase height */
  }
`;
