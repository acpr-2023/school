import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography, Grid, Box, CircularProgress, Divider, Avatar, Paper } from '@mui/material';
import styled from 'styled-components';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <Container maxWidth="md">
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            ) : (
                <StyledPaper elevation={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Avatar alt="Teacher Avatar" sx={{ width: 150, height: 150 }}>
                                {String(teacherDetails?.name).charAt(0)}
                            </Avatar>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h3" component="h2" textAlign="left" sx={{ pl: 1 }}>
                                {teacherDetails?.name}
                            </Typography>
                            <Divider sx={{ my: 1, borderBottomWidth: 3, borderColor: "#FF8C0F" }} />
                            <Typography variant="subtitle1" component="p" textAlign="left" sx={{ mb: 1 }}>
                                <strong>Email:</strong> {teacherDetails?.email}
                            </Typography>
                            <Typography variant="subtitle1" component="p" textAlign="left" sx={{ mb: 1 }}>
                                <strong>Class:</strong> {teacherDetails?.teachSclass?.sclassName}
                            </Typography>
                            {isSubjectNamePresent ? (
                                <>
                                    <Typography variant="subtitle1" component="p" textAlign="left" sx={{ mb: 1 }}>
                                        <strong>Subject:</strong> {teacherDetails?.teachSubject?.subName}
                                    </Typography>
                                    <Typography variant="subtitle1" component="p" textAlign="left">
                                        <strong>Sessions:</strong> {teacherDetails?.teachSubject?.sessions}
                                    </Typography>
                                </>
                            ) : (
                                <Box textAlign="center" mt={2}>
                                    <Button variant="contained" onClick={handleAddSubject}>
                                        Add Subject
                                    </Button>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </StyledPaper>
            )}
        </Container>
    );
};

export default TeacherDetails;

const StyledPaper = styled(Paper)`
  padding: 50px;
  margin-bottom: 20px;
  margin-top: 30px;
`;
