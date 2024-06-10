import React, { useEffect, useState } from 'react'; // Added useState here
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    Paper, Box, IconButton, Typography, CircularProgress
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllNotices } from '../../../redux/noticeRelated/noticeHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import TableTemplate from '../../../components/TableTemplate';
import { GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowNotices = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllNotices(currentUser._id, "Notice"));
    }, [currentUser._id, dispatch]);

    const [showPopup, setShowPopup] = useState(false); // Defined useState here
    const [message, setMessage] = useState(""); // Defined useState here

    if (error) {
        console.log(error);
    }

    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry, the delete function has been disabled for now.");
        setShowPopup(true);
        
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getAllNotices(currentUser._id, "Notice"));
            });
    };

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = noticesList && noticesList.length > 0 && noticesList.map((notice) => {
        const date = new Date(notice.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            title: notice.title,
            details: notice.details,
            date: dateString,
            id: notice._id,
        };
    });

    const NoticeButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, "Notice")}>
                    <DeleteIcon color="error" />
                </IconButton>
            </>
        );
    };

    const actions = [
        {
            icon: <NoteAddIcon color="primary" />, name: 'Add New Notice',
            action: () => navigate("/Admin/addnotice")
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Notices',
            action: () => deleteHandler(currentUser._id, "Notices")
        }
    ];

    return (
        <>
            {loading ?
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                    <CircularProgress />
                </Box>
                :
                <>
                    {response ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/addnotice")}>
                                Add Notice
                            </GreenButton>
                        </Box>
                        :
                        <Box sx={{ padding: "120px", paddingTop: "50px", position: "relative" }}>
                            <Typography
                                variant="h4"
                                align="left"
                                gutterBottom
                                sx={{ fontWeight: "bold", marginBottom: "10px" }}
                            >
                                All Notices
                            </Typography>
                            <Box
                                sx={{
                                    height: "3px",
                                    backgroundColor: "#ff8c0f",
                                    marginBottom: "20px",
                                }}
                            />
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                {Array.isArray(noticesList) && noticesList.length > 0 ?
                                    <TableTemplate buttonHaver={NoticeButtonHaver} columns={noticeColumns} rows={noticeRows} />
                                    :
                                    <Typography variant="body1">No notices found.</Typography>
                                }
                                <SpeedDialTemplate actions={actions} />
                            </Paper>
                        </Box>
                    }
                </>
            }
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ShowNotices;
