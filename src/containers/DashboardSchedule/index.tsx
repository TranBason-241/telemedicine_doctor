import React from "react";

import NextHealthCheck from "./components/NextHeathCheck";
import SlotManagement from "./components/Schedule";

import { Box, Grid } from "@mui/material";

const DashboardSchedule: React.FC = () => {
    return (
        <React.Fragment>
            <NextHealthCheck />
            <SlotManagement />
            <Grid padding={1} sx={{ width: "90%", mt: 5 }} container>
                <Grid display="flex" item xs={3} alignItems="center">
                    <Box borderRadius="5px" mr={2} height={20} width={20} bgcolor="grey.400"></Box>
                    Chưa có lịch
                </Grid>
                <Grid display="flex" item xs={3} alignItems="center">
                    <Box borderRadius="5px" mr={2} height={20} width={20} bgcolor="orange"></Box>
                    Đang đợi
                </Grid>
                <Grid display="flex" item xs={3} alignItems="center">
                    <Box borderRadius="5px" mr={2} height={20} width={20} bgcolor="red"></Box>
                    Bị hủy
                </Grid>
                <Grid display="flex" item xs={3} alignItems="center">
                    <Box borderRadius="5px" mr={2} height={20} width={20} bgcolor="green"></Box>
                    Đã hoàn thành
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default DashboardSchedule;
