import React from "react";

import moment from "moment";

import CallRoundedIcon from "@mui/icons-material/CallRounded";
import {
    Card,
    CardHeader,
    Divider,
    CardContent,
    Avatar,
    Typography,
    List,
    ListItemAvatar,
    ListItemText,
    ListItem,
    IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import { HealthCheck } from "src/containers/HealthCheckList/models/HealthCheck.model";

export interface IUpcomingAppointments {
    healthChecks?: HealthCheck[];
}

const UpcomingAppointments: React.FC<IUpcomingAppointments> = (props: IUpcomingAppointments) => {
    const { healthChecks } = props;

    const nonHealthCheck = (
        <Typography component="div" align="center">
            <Box sx={{ p: 1, fontSize: 18 }}>Chưa có thêm lịch hẹn nào sắp tới</Box>
        </Typography>
    );

    return (
        <Card sx={{ width: "100%", overflow: "auto" }}>
            <CardHeader title="Lịch tư vấn sắp tới" titleTypographyProps={{ variant: "h6" }} />
            <Divider />
            <CardContent>
                {healthChecks?.length === 0 ? (
                    nonHealthCheck
                ) : (
                    <List>
                        {healthChecks?.map((item, index) => (
                            <ListItem
                                key={index}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="call">
                                        <CallRoundedIcon color="success" />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar src={item.patient.avatar} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.patient.name}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: "inline" }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Triệu chứng:{" "}
                                            </Typography>
                                            {item.symptomHealthChecks
                                                .map((item) => item.symptom.name)
                                                .join(", ") || "Không có"}
                                            <Typography
                                                sx={{ display: "block" }}
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {`${item.slots[0].startTime} - ${moment(
                                                    item.slots[0].assignedDate
                                                ).format("DD/MM/YYYY")}`}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </CardContent>
        </Card>
    );
};

export default UpcomingAppointments;
