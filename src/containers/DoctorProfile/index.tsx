import React from "react";

import CertificateCarousel from "./components/CertificateCarousel";
import HospitalProfile from "./components/HospitalProfile";
import MajorProfile from "./components/MajorProfile";
import PracticingProfile from "./components/PracticingProfile";
import Profile from "./components/Profile";

import { Container, Divider, Grid } from "@mui/material";
import { Box } from "@mui/system";

const DoctorProfile: React.FC = () => {
    return (
        <React.Fragment>
            <Box
                sx={{
                    minHeight: "100%",
                    py: 3,
                    bgcolor: "#f5f5f5",
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ mt: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={4}>
                            <Profile />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MajorProfile />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <HospitalProfile />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 2 }} />
                    <Divider variant="middle" />
                    <Box sx={{ mt: 2 }} />

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={4}>
                            <PracticingProfile />
                        </Grid>

                        <Grid item xs={12} md={8} lg={8}>
                            <CertificateCarousel />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 2 }} />
                </Container>
            </Box>
        </React.Fragment>
    );
};

export default DoctorProfile;
