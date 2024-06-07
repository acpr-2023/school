import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

const complaints = [
  {
    id: 4,
    complaintDetails: "There is not enough time for lunch.",
  },
  {
    id: 5,
    complaintDetails: "The study materials are outdated.",
  },
  {
    id: 6,
    complaintDetails: "The seating arrangement is uncomfortable.",
  },
];

const TeacherComplain = () => {
  return (
    <Container>
      <Box mt={4}>
        <Grid container spacing={4}>
          {complaints.map((complaint) => (
            <Grid item xs={12} sm={6} md={4} key={complaint.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body1" component="p" sx={{ mt: 1 }}>
                    {complaint.complaintDetails}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  {" "}
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: "#ded2c6",
                      color: "black",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#ff8c0f",
                      },
                    }}
                  >
                    Resolve
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="contained"
                    sx={{
                      marginLeft: 1,
                      backgroundColor: "#ded2c6",
                      color: "black",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#ff8c0f",
                      },
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default TeacherComplain;
