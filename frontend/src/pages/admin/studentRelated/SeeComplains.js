import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  Checkbox,
  Stack
} from '@mui/material';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';

const SeeComplains = () => {
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  const complainRows = complainsList && complainsList.length > 0 && complainsList.map((complain) => {
    const date = new Date(complain.date);
    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
    return {
      user: complain.user.name,
      complaint: complain.complaint,
      date: dateString,
      id: complain._id,
    };
  });

  const ComplainButtonHaver = ({ row }) => {
    return (
      <Checkbox inputProps={{ 'aria-label': 'Checkbox demo' }} />
    );
  };

  return (
    <Box
      sx={{
        flex: '1 1 auto',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        py: 5,
        px: 3
      }}
    >
      <Box
        sx={{
          maxWidth: 800,
          width: '100%',
        }}
      >
        <Stack spacing={1} sx={{ mb: 3, marginBottom: '20px' }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              borderBottom: '3px solid #ff8c0f',
            }}
          >
            View Complains
          </Typography>
        </Stack>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {response ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                No Complains Right Now
              </Box>
            ) : (
              <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                {Array.isArray(complainsList) && complainsList.length > 0 ? (
                  <TableTemplate
                    buttonHaver={ComplainButtonHaver}
                    columns={complainColumns}
                    rows={complainRows}
                  />
                ) : (
                  <Typography sx={{ textAlign: 'center', mt: 3 }}>
                    No Complains Available
                  </Typography>
                )}
              </Paper>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default SeeComplains;
