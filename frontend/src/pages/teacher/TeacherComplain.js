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
    <Container component="main" maxWidth="md">
      <Grid container spacing={4} padding={5}>
        {complaints.map((complaint) => (
          <Grid item xs={12} sm={6} md={4} key={complaint.id}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="body1" component="p" sx={{ mt: 1 }}>
                  {complaint.complaintDetails}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button size="small" color="primary">
                  Resolve
                </Button>
                <Button size="small" color="error">
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TeacherComplain;
