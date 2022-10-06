import React from "react";

import moment from "moment";

import { DialogTitle } from "@material-ui/core";

import { HealthCheck } from "../VideoCall/models/VideoCall.model";
import { IUpdateHealthCheck } from "./IUpdateHealthCheck.model";

import {
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";

export interface IPrescriptionForm {
    prescription: IUpdateHealthCheck;
    healthCheck?: HealthCheck;
    open: boolean;
    handleClose: (type: "CONFIRM" | "CANCEL", prescription?: IUpdateHealthCheck) => void;
}

const PrescriptionPopup: React.FC<IPrescriptionForm> = (props: IPrescriptionForm) => {
    // const { prescription, healthCheck } = props;
    return (
        <React.Fragment>
            <Dialog open={props.open} scroll="paper" sx={{ zIndex: 4000 }}>
                <DialogTitle>Đơn thuốc</DialogTitle>
                <DialogContent>
                    <Paper elevation={0} variant="outlined" square />
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="body1">Bệnh nhân: </Typography>
                            <Typography variant="body1" sx={{ color: "text.secondary" }}>
                                {props.healthCheck?.patient.name}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="body1">Nhóm máu: </Typography>
                            <Typography variant="body1" sx={{ color: "text.secondary" }}>
                                {props.healthCheck?.patient.bloodGroup}
                            </Typography>
                        </Stack>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="body1">Bệnh nền: </Typography>
                            <Typography variant="body1" sx={{ color: "text.secondary" }}>
                                {props.healthCheck?.patient.backgroundDisease}
                            </Typography>
                        </Stack>
                    </Box>
                    {/* <Box sx={{ display: "flex" }}>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="body1">Chuẩn đoán: </Typography>
                            <Typography variant="body1" sx={{ color: "text.secondary" }}>
                                {props.prescription.healthCheckDiseases?.map((item) => {
                                    return (
                                        <Typography key={item?.diseaseId}>
                                            {"-"} {item?.diseaseId}
                                        </Typography>
                                    );
                                })}
                            </Typography>
                        </Stack>
                    </Box> */}
                    <Box sx={{ mb: 2 }} />
                    <Divider />
                    <Box sx={{ mb: 2 }} />
                    <Box sx={{ display: "block", mb: "6rem" }}>
                        {props.prescription.prescriptions.map((item, index) => (
                            <Card
                                sx={{ color: "text.secondary", p: 1, mb: 1, width: "95%" }}
                                key={item.healthCheckId}
                            >
                                <Grid container>
                                    {/* Row 1 */}
                                    <Grid item md={1} xs={12}>
                                        <Typography mr={1}>{index + 1}</Typography>
                                    </Grid>
                                    <Grid item md={11} xs={12}>
                                        <Typography mr={1}>{item.drugName}</Typography>
                                    </Grid>
                                    {/* Row 2 */}
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={3}>
                                        <Typography mr={1}>Thời gian:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography mr={1}>{`${moment(item.startDate).format(
                                            "DD/MM/YYYY"
                                        )} - ${moment(item.endDate).format(
                                            "DD/MM/YYYY"
                                        )}`}</Typography>
                                    </Grid>
                                    {/* Row 3 */}
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={3}>
                                        <Typography mr={1}>Liều lượng:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography mr={1}>
                                            {`Sáng-${item.morningQuantity}, Trưa-${item.afternoonQuantity}, Chiều -${item.eveningQuantity}`}
                                        </Typography>
                                    </Grid>
                                    {/* Row 4 */}
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={3}>
                                        <Typography mr={1}>Ghi chú:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography mr={1}>{item.description}</Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        ))}
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box sx={{ display: "block" }}>
                            <Stack direction="row" spacing={1}>
                                <Typography variant="body1">Khám ngày: </Typography>
                                <Typography variant="body1">
                                    {moment(props.healthCheck?.createdTime).format("DD/MM/YYYY")}
                                </Typography>
                            </Stack>

                            <Typography variant="body1">
                                Lời dặn: {props.prescription.advice}
                            </Typography>
                        </Box>
                    </Box>
                    <Paper />
                    <Box sx={{ mb: 4 }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.handleClose("CANCEL")} color="error">
                        Hủy
                    </Button>
                    <Button
                        onClick={() => props.handleClose("CONFIRM", props.prescription)}
                        color="success"
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default PrescriptionPopup;
