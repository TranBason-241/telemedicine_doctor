import React from "react";

import moment from "moment";

import { HealthCheck } from "../../../HealthCheckList/models/HealthCheck.model";

import CallRoundedIcon from "@mui/icons-material/CallRounded";
import {
    Grid,
    Card,
    CardHeader,
    Divider,
    CardContent,
    Avatar,
    Typography,
    CardActions,
    Button,
} from "@mui/material";
import { Box } from "@mui/system";

export interface INextAppointment {
    healthCheck?: HealthCheck;
}

const NextAppointment: React.FC<INextAppointment> = (props: INextAppointment) => {
    const { healthCheck } = props;

    const nonHealthCheck = (
        <CardContent sx={{ height: 230 }}>
            <Typography component="div" align="center">
                <Box sx={{ p: 1, fontSize: 18 }}>Chưa có thêm lịch hẹn nào</Box>
            </Typography>
        </CardContent>
    );

    return (
        <Card sx={{ width: "100%", height: "100%" }}>
            <CardHeader title="Buổi tư vấn tiếp theo" titleTypographyProps={{ variant: "h6" }} />
            <Divider />
            {!healthCheck ? (
                nonHealthCheck
            ) : (
                <React.Fragment>
                    <CardContent sx={{ height: 230 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                                <Avatar
                                    src={healthCheck?.patient.avatar}
                                    variant="rounded"
                                    sx={{ width: 80, height: 80 }}
                                />
                            </Grid>
                            <Grid item xs={9}>
                                <Typography component="div">
                                    <Box
                                        sx={{
                                            fontWeight: "medium",
                                            fontSize: 18,
                                            pb: 1,
                                        }}
                                    >
                                        {healthCheck?.patient.name}
                                    </Box>
                                </Typography>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <Typography color="text.primary">Chiều cao:</Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Typography color="text.secondary">
                                            {healthCheck?.height}cm
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <Typography color="text.primary">Cân nặng:</Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Typography color="text.secondary">
                                            {healthCheck?.weight}49kg
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <Typography color="text.primary">Dị ứng:</Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Typography color="text.secondary">
                                            {healthCheck?.patient.allergy || "Không có"}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <Typography color="text.primary">Bệnh nền:</Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Typography color="text.secondary">
                                            {healthCheck?.patient.backgroundDisease || "Không có"}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <Typography color="text.primary">Triệu chứng:</Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Typography color="text.secondary">
                                            {healthCheck?.symptomHealthChecks
                                                .map((item) => item.symptom.name)
                                                .join(", ") || "Không có"}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            "& > :not(style)": { p: 1 },
                        }}
                    >
                        <Typography component="div">
                            <Box
                                sx={{
                                    fontWeight: "medium",
                                    // fontSize: 16,
                                    // pl: 1,
                                }}
                            >
                                {`Bắt đầu lúc ${healthCheck?.slots[0].startTime} - ${moment(
                                    healthCheck?.slots[0].assignedDate
                                ).format("DD/MM/YYYY")}`}
                            </Box>
                        </Typography>
                        <Box>
                            <Button
                                variant="outlined"
                                color="success"
                                startIcon={<CallRoundedIcon />}
                            >
                                Call
                            </Button>
                        </Box>
                    </CardActions>
                </React.Fragment>
            )}
        </Card>
    );
};

export default NextAppointment;
