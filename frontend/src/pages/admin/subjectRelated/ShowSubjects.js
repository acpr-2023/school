import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Paper, Box, IconButton, Typography, CircularProgress, Grid, CardContent,
} from '@mui/material';
import { styled } from '@mui/system';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import { BlueButton } from '../../../components/buttonStyles';

const StyledIconButton = styled(IconButton)({
    padding: '8px',
    '&:hover': {
        backgroundColor: '#f0f0f0',
    },
});

const StyledPaper = styled(Paper)({
    width: '100%',
    overflow: 'hidden',
    marginTop: '16px',
});

const StyledTypography = styled(Typography)({
    fontWeight: 'bold',
    marginBottom: '16px',
});

const StyledCard = styled(Paper)`
  background-color: white; /* Change to white */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 140, 15, 0.6);
  }

  & h6 {
    font-weight: bold;
  }
`;

const SubjectCard = ({ subject, onDelete, onView }) => (
    <StyledCard>
        <CardContent>
            <Typography variant="h6">{subject.subName}</Typography>
            <Typography variant="body1">Class Periods: {subject.sessions}</Typography>
            <Typography variant="body1">Section: {subject.sclassName}</Typography>
            <Grid container spacing={1} alignItems="center" sx={{ marginTop: '16px' }}>
                <Grid item>
                    <StyledIconButton onClick={() => onDelete(subject.id, "Subject")}>
                        <DeleteIcon color="error" />
                    </StyledIconButton>
                </Grid>
                <Grid item>
                    <BlueButton variant="contained"
                        onClick={() => onView(subject.sclassID, subject.id)}>
                        View
                    </BlueButton>
                </Grid>
            </Grid>
        </CardContent>
    </StyledCard>
);

const ShowSubjects = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, loading } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    }, [currentUser._id, dispatch]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry, the delete function has been disabled for now.");
        setShowPopup(true);
    };

    const viewHandler = (sclassID, subjectID) => {
        navigate(`/Admin/subjects/subject/${sclassID}/${subjectID}`);
    };

    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate("/Admin/subjects/chooseclass")
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
            action: () => deleteHandler(currentUser._id, "Subjects")
        }
    ];

    return (
        <>
            <StyledPaper>
                <Box p={3}>
                    <StyledTypography variant="h5">Subjects List</StyledTypography>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        Array.isArray(subjectsList) && subjectsList.length > 0 ? (
                            <Grid container spacing={2}>
                                {subjectsList.map((subject) => (
                                    <Grid item xs={12} sm={6} key={subject._id}>
                                        <SubjectCard 
                                            subject={{
                                                subName: subject.subName,
                                                sessions: subject.sessions,
                                                sclassName: subject.sclassName.sclassName,
                                                sclassID: subject.sclassName._id,
                                                id: subject._id,
                                            }} 
                                            onDelete={deleteHandler} 
                                            onView={viewHandler} 
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Typography variant="body1">No subjects found.</Typography>
                        )
                    )}
                </Box>
                <SpeedDialTemplate actions={actions} />
            </StyledPaper>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ShowSubjects;
