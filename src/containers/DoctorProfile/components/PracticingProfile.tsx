import React, { useState } from "react";

import moment from "moment";

import useGetDoctor from "../hooks/useGetDoctor";
import { Account } from "../models/Account.model";
import { Doctor, DoctorFromAdd, DoctorPraticing } from "../models/Doctor.model";
import DoctorService from "../services/Doctor.service";
import PracticingForm from "./PracticingForm";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
    Card,
    Chip,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Icon,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Box, BoxProps } from "@mui/system";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

function Item(props: BoxProps) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                bgcolor: "#fafafa",
                color: "black",
                p: 1,
                m: 1,
                borderRadius: 5,
                textAlign: "left",
                fontSize: 19,
                fontWeight: "700",
                boxShadow: 5,
                ...sx,
            }}
            {...other}
        />
    );
}

const PracticingProfile: React.FC = () => {
    const user = LocalStorageUtil.getItem("user") as Account;
    const { data, isLoading, isError } = useGetDoctor(user.email);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [doctorPracticing, setDoctorPracticing] = useState<DoctorPraticing>();
    if (isError) {
        return <div> Error</div>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }

    const createPraticing = async (data: DoctorFromAdd, file: Blob) => {
        try {
            let formData = new FormData();
            formData.append("Id", JSON.stringify(data?.id));
            formData.append("Email", data.email);
            formData.append("Name", data.name);
            formData.append("Avatar", data.avatar);
            formData.append("PractisingCertificate", file);
            formData.append("CertificateCode", data.certificateCode);
            formData.append("PlaceOfCertificate", data.placeOfCertificate);
            formData.append("DateOfCertificate", data.dateOfCertificate);
            formData.append("ScopeOfPractice", data.scopeOfPractice);
            formData.append("description", data.description);
            formData.append("NumberOfConsultants", JSON.stringify(data.numberOfConsultants));
            formData.append("NumberOfCancels", JSON.stringify(data.numberOfCancels));
            formData.append("Rating", JSON.stringify(data.rating));
            formData.append("IsVerify", JSON.stringify(data.isVerify));
            formData.append("IsActive", JSON.stringify(data.isActive));
            formData.append("CertificationDoctors", JSON.stringify(data.certificationDoctors));
            formData.append("HospitalDoctors", JSON.stringify(data.hospitalDoctors));
            formData.append("MajorDoctors", JSON.stringify(data.majorDoctors));
            const service = new DoctorService<Doctor>();
            const response = await service.updateFormData(formData);
            if (response.status === 200) {
                // eslint-disable-next-line no-console
                console.log(response.data);
                refreshPage();
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickCloseView = () => {
        setOpen(false);
    };
    const handleOpenModal = () => {
        setOpenModal(true);
        data && setDoctorPracticing(data);
    };

    const refreshPage = () => {
        window.location.reload();
    };

    const handleClose = (
        type: "SAVE" | "CANCEL",
        dataPracticing?: DoctorFromAdd,
        file?: Blob,
        clearErrors?: Function
    ) => {
        if (type === "SAVE") {
            if (dataPracticing && file) {
                if (dataPracticing.id) {
                    createPraticing(dataPracticing, file);
                }
            }
        }
        if (clearErrors) {
            clearErrors();
        }

        setOpenModal(false);
    };
    return (
        <React.Fragment>
            {data && doctorPracticing && (
                <PracticingForm dataPracticing={data} open={openModal} handleClose={handleClose} />
            )}
            <Card sx={{ borderRadius: 5, minHeight: "100%" }}>
                <Box sx={{ ml: 2, display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        <Typography sx={{ mt: 3 }} variant="h6" component="div">
                            Hồ sơ hành nghề
                            {data?.isActive ? (
                                <Tooltip title="Còn hoạt động">
                                    <IconButton>
                                        <CheckCircleOutlineIcon color="success" />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Tooltip title="Không hoạt động">
                                    <IconButton>
                                        <CheckCircleOutlineIcon color="error" />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h6" component="h5">
                            <IconButton onClick={() => handleOpenModal()}>
                                <Icon>edit</Icon>
                            </IconButton>
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "block", gridTemplateColumns: "repeat(3, 1fr)" }}>
                    <Item>
                        <Box sx={{ display: "block", p: 2 }}>
                            <Box sx={{ display: "flex" }}>
                                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                    <Typography
                                        variant="body2"
                                        component="div"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        Chứng chỉ hành nghề:
                                    </Typography>

                                    <Typography variant="body2" component="h5">
                                        <Link
                                            variant="body2"
                                            underline="none"
                                            onClick={handleClickOpen}
                                        >
                                            {" "}
                                            View
                                        </Link>
                                    </Typography>
                                </Stack>
                                <Dialog open={open} onClose={handleClickCloseView}>
                                    <DialogTitle>Chứng chỉ</DialogTitle>
                                    <DialogContent>
                                        <img
                                            width="100%"
                                            height="100%"
                                            src={data?.practisingCertificate}
                                            loading="lazy"
                                        />
                                    </DialogContent>
                                </Dialog>
                            </Box>
                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Mã chứng nhận:
                                </Typography>
                                <Typography variant="body2" component="h5">
                                    {data?.certificateCode}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Nơi cấp chứng nhận:
                                </Typography>

                                <Typography variant="body2" component="h5">
                                    {data?.placeOfCertificate}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Cấp ngày:
                                </Typography>

                                <Typography variant="body2" component="h5">
                                    {moment(data?.dateOfCertificate).format("DD/MM/YYYY")}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Phạm vi:
                                </Typography>

                                <Typography variant="body2" component="h5">
                                    {data?.scopeOfPractice}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Mô tả:
                                </Typography>

                                <Typography variant="body2" component="h5">
                                    {data?.description}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Số bệnh nhân đã tư vấn:
                                </Typography>

                                <Typography variant="body2" component="h5">
                                    {data?.numberOfConsultants}
                                </Typography>
                            </Stack>

                            <Box sx={{ mt: 1 }} />

                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                <Typography variant="body2" component="h5">
                                    {data?.isVerify ? (
                                        <Chip
                                            label="Đã xác thực"
                                            variant="outlined"
                                            color="success"
                                        />
                                    ) : (
                                        <Chip
                                            label="Chưa xác thực"
                                            variant="outlined"
                                            color="error"
                                        />
                                    )}
                                </Typography>
                            </Stack>
                        </Box>
                    </Item>
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default PracticingProfile;
