import * as React from "react";

import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import useGetDoctor from "../hooks/useGetDoctor";
import { Account } from "../models/Account.model";
import { CetificationAdd, Doctor } from "../models/Doctor.model";
import DoctorService from "../services/Doctor.service";
import CertificationFormAdd from "./CeritificateFormAdd";

import BlockIcon from "@mui/icons-material/Block";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Card, CircularProgress, Icon, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
// import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const CertificateCarousel: React.FC = () => {
    const initCetificationAdd: CetificationAdd = {
        certificationId: 0,
        evidence: "",
        dateOfIssue: "2021-10-20T15:58:02.973Z",
    };
    const user = LocalStorageUtil.getItem("user") as Account;
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const { data, isLoading, isError } = useGetDoctor(user.email);
    const [openAdd, setOpenAdd] = React.useState<boolean>(false);
    const [cetificationAdd] = React.useState<CetificationAdd>(initCetificationAdd);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };
    const createCetificate = async (dataCeti: CetificationAdd, file: Blob, id: number) => {
        try {
            let formData = new FormData();
            formData.append("CertificationId", JSON.stringify(dataCeti.certificationId));
            formData.append("Evidence", file);
            formData.append("DateOfIssue ", dataCeti.dateOfIssue);
            const service = new DoctorService<Doctor>();
            const response = await service.createFormData(id, formData);
            if (response.status === 200) {
                // eslint-disable-next-line no-console
                console.log(response.data);
                refreshPage();
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    };
    const handleCloseFormAdd = (
        type: "SAVE" | "CANCEL",
        dataCetificationAdd?: CetificationAdd,
        file?: Blob,
        clearErrors?: Function
    ) => {
        if (type === "SAVE") {
            if (dataCetificationAdd && file) {
                if (data?.id) {
                    createCetificate(dataCetificationAdd, file, data?.id);
                }
            }
        }
        if (clearErrors) {
            clearErrors();
        }
        setOpenAdd(false);
    };
    if (isError) {
        return <div> Error</div>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }
    const refreshPage = () => {
        window.location.reload();
    };
    const handleCreate = () => {
        setOpenAdd(true);
    };

    return (
        <React.Fragment>
            {data && (
                <CertificationFormAdd
                    dataCetificationAdd={cetificationAdd}
                    open={openAdd}
                    handleClose={handleCloseFormAdd}
                />
            )}
            <Card sx={{ borderRadius: 5 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        bgcolor: "background.default",
                    }}
                >
                    <Box sx={{ ml: 2, mt: 1 }}>
                        <Typography variant="h6" component="div">
                            Chứng chỉ
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 1 }}>
                        <IconButton onClick={() => handleCreate()}>
                            <Icon>add_circle</Icon>
                        </IconButton>
                    </Box>
                </Box>

                {data?.certificationDoctors.length === 0 ? (
                    <Box sx={{ minHeight: 350, bgcolor: "#fafafa" }}>
                        <Typography component="div" align="center">
                            <Box sx={{ p: 1, fontSize: 18 }}>Chưa chứng chỉ</Box>
                        </Typography>
                    </Box>
                ) : (
                    <div>
                        <AutoPlaySwipeableViews
                            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            enableMouseEvents
                        >
                            {data?.certificationDoctors?.map((step, index) => (
                                <div key={step?.certification?.name}>
                                    <Box sx={{ display: "flex" }}>
                                        <Box sx={{ ml: "3rem", display: "flex" }}>
                                            <Typography variant="h6" component="div">
                                                {step?.certification?.name}
                                            </Typography>
                                            {step?.isActive ? (
                                                <IconButton>
                                                    <VerifiedIcon color="success" />
                                                </IconButton>
                                            ) : (
                                                <IconButton>
                                                    <BlockIcon color="error" />
                                                </IconButton>
                                            )}
                                        </Box>
                                    </Box>
                                    {Math.abs(activeStep - index) <= 2 ? (
                                        <Box
                                            component="img"
                                            sx={{
                                                height: 400,
                                                display: "block",
                                                overflow: "hidden",
                                                width: "100%",
                                            }}
                                            src={step?.evidence}
                                            alt={step?.certification?.name}
                                        />
                                    ) : null}
                                </div>
                            ))}
                        </AutoPlaySwipeableViews>
                    </div>
                )}

                <MobileStepper
                    steps={data?.certificationDoctors.length || 0}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={
                                activeStep ===
                                (data?.certificationDoctors.length != 0 &&
                                data?.certificationDoctors.length != undefined
                                    ? data?.certificationDoctors.length
                                    : 1) -
                                    1
                            }
                        >
                            Next
                            {theme.direction === "rtl" ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === "rtl" ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />
            </Card>
        </React.Fragment>
    );
};

export default CertificateCarousel;
