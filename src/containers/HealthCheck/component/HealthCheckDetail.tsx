import React, { useCallback, useEffect, useState } from "react";

import moment from "moment";
import { useHistory, useParams } from "react-router";

import DrugDialog from "../component/DrugDialog";
import {
    HealthCheck,
    HealthCheckDiseases,
    Prescriptions,
    Slots, // Slots,
    SymptomHealthChecks,
} from "../models/HealthCheckDetail.model";
import { Patient } from "../models/Patient.model";
import HealthCheckService from "../services/HealthCheck.service";

import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Container,
    Divider,
    Grid,
    Rating,
    Typography,
} from "@mui/material";
import { red, yellow } from "@mui/material/colors";
import { Box } from "@mui/system";

const HealthCheckDetailPatient: React.FC = () => {
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(false);
    const [patient, setPatient] = useState<Patient>();
    const [healthCheckDiseases, setHealthCheckDiseases] = useState<HealthCheckDiseases[]>([]);
    const [prescription, setPrescription] = useState<Prescriptions[]>([]);
    const [slot, setSlot] = useState<Slots[]>([]);
    const [symptomHealthCheck, setSymptomHealthChecks] = useState<SymptomHealthChecks[]>([]);
    const [healthcheck, setHealthcheck] = useState<HealthCheck>();
    const params = useParams<{ id: string }>();
    const id = params.id;
    const [open, setOpen] = useState<boolean>(false);

    const onHandleClose = () => {
        setOpen(false);
    };

    const getHealthCheckById = useCallback(
        async (id) => {
            try {
                setLoading(true);
                let healthCheckService = new HealthCheckService<HealthCheck>();
                const response = await healthCheckService.getId(id);
                if (response.status === 200) {
                    setHealthcheck(response.data);
                    setPatient(response.data?.patient);
                    setHealthCheckDiseases(response.data?.healthCheckDiseases);
                    // eslint-disable-next-line no-console
                    console.log(response.data);
                    setPrescription(response.data?.prescriptions);
                    setSlot(response.data?.slots);
                    setSymptomHealthChecks(response.data?.symptomHealthChecks);
                }
            } catch (_error) {
                setLoading(false);
                history.push("/not-found");
            } finally {
                setLoading(false);
            }
        },
        [history]
    );

    useEffect(() => {
        getHealthCheckById(id);
    }, [id, getHealthCheckById]);

    const renderStatus = (status?: string) => {
        switch (status) {
            case "COMPLETED":
                return (
                    <Box display="flex" width={1} justifyContent="center" alignItems="center">
                        <Box>
                            <Box sx={{ textAlign: "center", m: 1 }}>
                                <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
                            </Box>
                            <Typography variant="h6" gutterBottom component="div">
                                <Box sx={{ textAlign: "center", m: 1 }}>
                                    Bu???i t?? v???n ???? di???n ra th??nh c??ng
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                );
            case "CANCELED":
                return (
                    <Box display="flex" width={1} justifyContent="center" alignItems="center">
                        <Box>
                            <Box sx={{ textAlign: "center", m: 1 }}>
                                <CancelIcon sx={{ fontSize: 60, color: red[500] }} />
                            </Box>
                            <Typography variant="h6" gutterBottom component="div">
                                <Box sx={{ textAlign: "center", m: 1 }}>Bu???i t?? v???n ???? b??? h???y</Box>
                            </Typography>
                        </Box>
                    </Box>
                );
            case "BOOKED":
                return (
                    <Box display="flex" width={1} justifyContent="center" alignItems="center">
                        <Box>
                            <Box sx={{ textAlign: "center", m: 1 }}>
                                <WatchLaterIcon sx={{ fontSize: 60, color: yellow[700] }} />
                            </Box>
                            <Typography variant="h6" gutterBottom component="div">
                                <Box sx={{ textAlign: "center", m: 1 }}>
                                    Bu???i t?? v???n s???p di???n ra
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                );
            default:
                break;
        }
    };

    if (loading) {
        return (
            <Box width={1} minHeight="500px" alignItems="center" justifyContent="center">
                <CircularProgress />
            </Box>
        );
    }
    return (
        <React.Fragment>
            <Box sx={{ backgroundColor: "background.default", minHeight: "100%" }}>
                <Typography variant="h4" gutterBottom component="div">
                    <Box sx={{ textAlign: "center" }}>Th??ng tin ki???m tra s???c kh???e</Box>
                </Typography>
                {renderStatus(healthcheck?.status)}
                <Container maxWidth="lg">
                    {healthcheck?.status === "CANCELED" ? (
                        <React.Fragment>
                            <Card sx={{ height: "100% !important" }}>
                                <CardHeader
                                    title={<Typography variant="h6">Th??ng tin cu???c h???n</Typography>}
                                ></CardHeader>
                                <Divider />
                                <CardContent>
                                    <Grid container minHeight={35}>
                                        <Grid item lg={4} md={4} xs={12}>
                                            Th???i gian t?? v???n:
                                        </Grid>
                                        <Grid item lg={8} md={8} xs={12}>
                                            {slot[0]?.startTime?.slice(0, 5)} {"- "}
                                            {slot[0]?.endTime?.slice(0, 5)}{" "}
                                            {moment(slot[0]?.assignedDate).format(`DD/MM/YYYY`)}
                                        </Grid>
                                    </Grid>
                                    <Grid container minHeight={35}>
                                        <Grid item lg={4} md={4} xs={12}>
                                            B???nh nh??n:
                                        </Grid>
                                        <Grid item lg={4} md={4} xs={12}>
                                            {patient?.name}{" "}
                                        </Grid>
                                        <Grid item lg={4} md={4} xs={12}>
                                            {/* <Button
                                                onClick={() => {
                                                    const win = window.open(
                                                        `/patients/${patient?.email}`,
                                                        "_blank"
                                                    );
                                                    win?.focus();
                                                }}
                                                size="small"
                                            >
                                                CHI TI???T
                                            </Button> */}
                                        </Grid>
                                    </Grid>
                                    <Grid container minHeight={35}>
                                        <Grid item lg={4} md={4} xs={12}>
                                            B??c s??:
                                        </Grid>
                                        <Grid item lg={4} md={4} xs={12}>
                                            {slot[0]?.doctor?.name}{" "}
                                        </Grid>
                                        <Grid item lg={4} md={4} xs={12}>
                                            {/* <Button
                                                onClick={() => {
                                                    const win = window.open(
                                                        `/doctors/${slot[0]?.doctor?.email}`,
                                                        "_blank"
                                                    );
                                                    win?.focus();
                                                }}
                                                size="small"
                                            >
                                                CHI TI???T
                                            </Button> */}
                                        </Grid>
                                    </Grid>
                                    <Grid container minHeight={35}>
                                        <Grid item lg={4} md={4} xs={12}>
                                            L?? do h???y:
                                        </Grid>
                                        <Grid item lg={8} md={8} xs={12}>
                                            {healthcheck.reasonCancel}
                                        </Grid>
                                    </Grid>
                                    <Grid container minHeight={35}>
                                        <Grid item lg={4} md={4} xs={12}>
                                            Th???i gian h???y:
                                        </Grid>
                                        <Grid item lg={8} md={8} xs={12}>
                                            {moment(healthcheck.canceledTime).format(
                                                `h:mm DD/MM/YYYY`
                                            )}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Grid alignItems="stretch" container spacing={2}>
                                <Grid item lg={6} md={6} xs={12}>
                                    <Card sx={{ height: "100% !important" }}>
                                        <CardHeader
                                            title={
                                                <Typography variant="h6">
                                                    Th??ng tin cu???c h???n
                                                </Typography>
                                            }
                                        ></CardHeader>
                                        <Divider />
                                        <CardContent>
                                            <Grid container minHeight={35}>
                                                <Grid item lg={4} md={4} xs={12}>
                                                    Th???i gian t?? v???n:
                                                </Grid>
                                                <Grid item lg={8} md={8} xs={12}>
                                                    {slot[0]?.startTime?.slice(0, 5)} {"- "}
                                                    {slot[0]?.endTime?.slice(0, 5)}{" "}
                                                    {moment(slot[0]?.assignedDate).format(
                                                        `DD/MM/YYYY`
                                                    )}
                                                </Grid>
                                            </Grid>
                                            <Grid container minHeight={35}>
                                                <Grid item lg={4} md={4} xs={12}>
                                                    B???nh nh??n:
                                                </Grid>
                                                <Grid item lg={4} md={4} xs={12}>
                                                    {patient?.name}{" "}
                                                </Grid>
                                                <Grid item lg={4} md={4} xs={12}>
                                                    {/* <Button
                                                        onClick={() => {
                                                            const win = window.open(
                                                                `/patients/${patient?.email}`,
                                                                "_blank"
                                                            );
                                                            win?.focus();
                                                        }}
                                                        size="small"
                                                    >
                                                        CHI TI???T
                                                    </Button> */}
                                                </Grid>
                                            </Grid>
                                            <Grid container minHeight={35}>
                                                <Grid item lg={4} md={4} xs={12}>
                                                    B??c s??:
                                                </Grid>
                                                <Grid item lg={4} md={4} xs={12}>
                                                    {slot[0]?.doctor?.name}{" "}
                                                </Grid>
                                                <Grid item lg={4} md={4} xs={12}>
                                                    {/* <Button
                                                        onClick={() => {
                                                            const win = window.open(
                                                                `/doctors/${slot[0]?.doctor?.email}`,
                                                                "_blank"
                                                            );
                                                            win?.focus();
                                                        }}
                                                        size="small"
                                                    >
                                                        CHI TI???T
                                                    </Button> */}
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item lg={6} md={6} xs={12}>
                                    <Card sx={{ height: "100% !important" }}>
                                        <CardHeader
                                            title={
                                                <Typography variant="h6">
                                                    N???i dung bu???i t?? v???n
                                                </Typography>
                                            }
                                        ></CardHeader>
                                        <Divider />
                                        <CardContent>
                                            {healthcheck?.status !== "COMPLETED" ? (
                                                <Box
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    <Typography
                                                        sx={{ mb: 1.5 }}
                                                        color="text.secondary"
                                                    >
                                                        Bu???i t?? v???n ch??a di???n ra
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                <React.Fragment>
                                                    <Grid container minHeight={35}>
                                                        <Grid item lg={4} md={4} xs={12}>
                                                            Ch???n ??o??n c???a b??c s??:
                                                        </Grid>
                                                        <Grid item lg={8} md={8} xs={12}>
                                                            {!healthCheckDiseases ||
                                                            healthCheckDiseases.length === 0 ? (
                                                                <Typography>
                                                                    Ch??a c?? c???n ??o??n
                                                                </Typography>
                                                            ) : (
                                                                healthCheckDiseases.map(
                                                                    (disease) => {
                                                                        return (
                                                                            <Typography
                                                                                key={disease?.id}
                                                                            >
                                                                                {"-"}{" "}
                                                                                {
                                                                                    disease?.disease
                                                                                        ?.name
                                                                                }
                                                                            </Typography>
                                                                        );
                                                                    }
                                                                )
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container minHeight={35}>
                                                        <Grid item lg={4} md={4} xs={12}>
                                                            Ghi ch?? c???a b??c s??:
                                                        </Grid>
                                                        <Grid item lg={8} md={8} xs={12}>
                                                            {healthcheck?.advice || "Kh??ng c??"}
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container minHeight={35}>
                                                        <Grid item lg={4} md={4} xs={12}>
                                                            Xem ????n thu???c:
                                                        </Grid>
                                                        <Grid item lg={8} md={8} xs={12}>
                                                            <Button
                                                                size="small"
                                                                onClick={() => setOpen(true)}
                                                            >
                                                                Xem
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </React.Fragment>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Box height={10}></Box>
                            <Grid container spacing={2}>
                                <Grid item lg={6} md={6} xs={12}>
                                    <Card sx={{ height: "100% !important" }}>
                                        <CardHeader
                                            title={
                                                <Typography variant="h6">
                                                    T??nh tr???ng b???nh nh??n
                                                </Typography>
                                            }
                                        ></CardHeader>
                                        <Divider />
                                        <CardContent>
                                            <Grid container minHeight={35}>
                                                <Grid item lg={3} md={3} xs={12}>
                                                    Nh??m m??u:
                                                </Grid>
                                                <Grid item lg={9} md={9} xs={12}>
                                                    {patient?.bloodGroup}
                                                </Grid>
                                            </Grid>
                                            <Grid container minHeight={35}>
                                                <Grid item lg={3} md={3} xs={6}>
                                                    Chi???u cao:
                                                </Grid>
                                                <Grid item lg={3} md={3} xs={6}>
                                                    {(healthcheck?.height || 0) / 100}m
                                                </Grid>
                                                <Grid item lg={3} md={3} xs={6}>
                                                    C??n n???ng:
                                                </Grid>
                                                <Grid item lg={3} md={3} xs={6}>
                                                    {healthcheck?.weight}kg
                                                </Grid>
                                            </Grid>
                                            <Grid container minHeight={35}>
                                                <Grid item lg={3} md={3} xs={12}>
                                                    Ti???n s??? d??? ???ng:
                                                </Grid>
                                                <Grid item lg={9} md={9} xs={12}>
                                                    {patient?.allergy || "Kh??ng c??"}
                                                </Grid>
                                            </Grid>
                                            <Grid container minHeight={35}>
                                                <Grid item lg={3} md={9} xs={12}>
                                                    B???nh n???n:
                                                </Grid>
                                                <Grid item lg={3} md={9} xs={12}>
                                                    {patient?.backgroundDisease || "Kh??ng c??"}
                                                </Grid>
                                            </Grid>
                                            <Grid container minHeight={35}>
                                                <Grid item lg={3} md={3} xs={12}>
                                                    C??c tri???u ch???ng:
                                                </Grid>
                                                <Grid item lg={9} md={9} xs={12}>
                                                    {!symptomHealthCheck ||
                                                    symptomHealthCheck.length === 0 ? (
                                                        <Typography>Ch??a c?? tri???u ch???ng</Typography>
                                                    ) : (
                                                        symptomHealthCheck.map((symptom) => {
                                                            return (
                                                                <Typography key={symptom?.id}>
                                                                    {"-"} {symptom?.symptom?.name}
                                                                </Typography>
                                                            );
                                                        })
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item lg={6} md={6} xs={12}>
                                    <Card sx={{ height: "100% !important" }}>
                                        <CardHeader
                                            title={
                                                <Typography variant="h6">
                                                    ????nh gi?? v??? cu???c h???n
                                                </Typography>
                                            }
                                        ></CardHeader>
                                        <Divider />
                                        <CardContent>
                                            {healthcheck?.status !== "COMPLETED" ? (
                                                <Box
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    <Typography
                                                        sx={{ mb: 1.5 }}
                                                        color="text.secondary"
                                                    >
                                                        Bu???i t?? v???n ch??a di???n ra
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                <React.Fragment>
                                                    <Grid container minHeight={35}>
                                                        <Grid item lg={4} md={4} xs={12}>
                                                            ????nh gi??:
                                                        </Grid>
                                                        <Grid item lg={8} md={8} xs={12}>
                                                            <Rating
                                                                name="rating"
                                                                value={healthcheck?.rating || 0}
                                                                readOnly
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container minHeight={35}>
                                                        <Grid item lg={4} md={4} xs={12}>
                                                            Feedback:
                                                        </Grid>
                                                        <Grid item lg={8} md={8} xs={12}>
                                                            {healthcheck?.comment || "Kh??ng c??"}
                                                        </Grid>
                                                    </Grid>
                                                </React.Fragment>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    )}
                </Container>
            </Box>
            <DrugDialog open={open} handleClose={onHandleClose} prescription={prescription} />
        </React.Fragment>
    );
};

export default HealthCheckDetailPatient;
