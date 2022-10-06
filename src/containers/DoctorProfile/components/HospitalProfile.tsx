import React, { useState } from "react";

import useGetDoctor from "../hooks/useGetDoctor";
import usePutHospital from "../hooks/usePutHospital";
import { Account } from "../models/Account.model";
import { Doctor, DoctorFromAdd } from "../models/Doctor.model";
import { Hospital } from "../models/Hospital.model";
import DoctorService from "../services/Doctor.service";
import HospitalForm from "./HospitalForm";
import HospitalFormAdd from "./HospitalFormAdd";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
    Button,
    Card,
    CircularProgress,
    IconButton,
    List,
    ListItem,
    Tooltip,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

const HospitalProfile: React.FC = () => {
    const initHospital: Hospital = {
        hospitalCode: "",
        name: "",
        address: "",
        description: "",
        lat: 0,
        long: 0,
        isActive: true,
    };
    const user = LocalStorageUtil.getItem("user") as Account;
    const { data, isLoading, isError } = useGetDoctor(user.email);
    const { mutate } = usePutHospital();
    const [open, setOpen] = useState<boolean>(false);
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [hospital] = useState<Hospital>(initHospital);
    if (isError) {
        return <div> Error</div>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }

    const refreshPage = () => {
        window.location.reload();
    };
    const handleClose = (
        type: "SAVE" | "CANCEL",
        dataHospital?: Hospital,
        clearErrors?: Function
    ) => {
        if (type === "SAVE") {
            if (dataHospital) {
                if (dataHospital.id) {
                    mutate({
                        id: dataHospital?.id,
                        hospitalCode: dataHospital?.hospitalCode,
                        name: dataHospital?.name,
                        address: dataHospital?.address,
                        lat: dataHospital?.lat,
                        long: dataHospital?.long,
                        description: dataHospital?.description,
                        isActive: dataHospital?.isActive,
                    });
                }
            }
        }
        if (clearErrors) {
            clearErrors();
        }
        if (type === "SAVE") {
            refreshPage();
        }
        setOpen(false);
    };
    const createHospital = async (data: DoctorFromAdd) => {
        try {
            let formData = new FormData();
            formData.append("Id", JSON.stringify(data?.id));
            formData.append("PractisingCertificate", data.practisingCertificate);
            formData.append("CertificateCode", data.certificateCode);
            formData.append("PlaceOfCertificate", data.placeOfCertificate);
            formData.append("DateOfCertificate", data.dateOfCertificate);
            formData.append("ScopeOfPractice", data.scopeOfPractice);
            formData.append("Description", data.description);
            formData.append("IsActive", JSON.stringify(data.isActive));
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
    const handleCloseHospitalAdd = (
        type: "SAVE" | "CANCEL",
        dataHospital?: DoctorFromAdd,
        clearErrors?: Function
    ) => {
        if (type === "SAVE") {
            if (dataHospital) {
                createHospital(dataHospital);
            }
        }
        if (clearErrors) {
            clearErrors();
        }
        setOpenAdd(false);
    };
    // const handleOpen = async (hos: Hospital) => {
    //     setOpen(true);
    //     setHospital(hos);
    // };
    const handleCreate = () => {
        setOpenAdd(true);
    };

    return (
        <React.Fragment>
            {data && (
                <HospitalFormAdd
                    dataHospital={data}
                    opened={openAdd}
                    handleClose={handleCloseHospitalAdd}
                />
            )}

            <HospitalForm dataHospital={hospital} opened={open} handleClose={handleClose} />
            <Card sx={{ minHeight: "100%", borderRadius: 5 }}>
                <Box sx={{ ml: 2 }}>
                    <Typography sx={{ mt: 3 }} variant="h6" component="div">
                        Bệnh viện
                    </Typography>
                </Box>
                <Box sx={{ display: "block", gridTemplateColumns: "repeat(3, 1fr)" }}>
                    <List
                        sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper",
                            position: "relative",
                            overflow: "auto",
                            maxHeight: 350,
                            "& ul": { padding: 0 },
                        }}
                    >
                        {data?.hospitalDoctors.length === 0 ? (
                            <Typography component="div" align="center">
                                <Box sx={{ p: 1, fontSize: 18 }}>Chưa có dữ liệu</Box>
                            </Typography>
                        ) : (
                            <React.Fragment>
                                {data?.hospitalDoctors?.map((item) => (
                                    <ListItem key={item?.id}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                borderRadius: 5,
                                                bgcolor: "#fafafa",
                                                p: 2,
                                            }}
                                        >
                                            <Box sx={{ display: "block" }}>
                                                <Typography variant="h6" component="h5">
                                                    {item?.hospital?.name}
                                                    {item?.hospital?.name ? (
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
                                                <Typography variant="body2" component="h5">
                                                    Địa chỉ: {item?.hospital?.address}
                                                </Typography>
                                                <Typography variant="body2" component="h5">
                                                    Mô tả: {item?.hospital?.description}
                                                </Typography>

                                                <Box sx={{ mt: 1 }} />
                                                {/* <Typography variant="body2" component="h5">
                                                    Tình trạng:{" "}
                                                    {item?.isWorking ? (
                                                        <Chip
                                                            label="Đang công tác"
                                                            variant="outlined"
                                                            color="success"
                                                        />
                                                    ) : (
                                                        <Chip
                                                            label="Nghỉ công tác"
                                                            variant="outlined"
                                                            color="error"
                                                        />
                                                    )}
                                                </Typography> */}
                                            </Box>
                                            {/* <Box sx={{ display: "flex" }}>
                                                <Typography variant="h6" component="h5">

                                                    <IconButton
                                                        onClick={() => handleOpen(item?.hospital)}
                                                    >
                                                        <Icon>edit</Icon>
                                                    </IconButton>
                                                </Typography>
                                            </Box> */}
                                        </Box>
                                    </ListItem>
                                ))}
                            </React.Fragment>
                        )}
                    </List>
                    <Box sx={{ mb: 2 }} />
                    <Box sx={{ textAlign: "center" }}>
                        <Button variant="outlined" onClick={() => handleCreate()}>
                            + Thêm bệnh viện
                        </Button>
                    </Box>
                    <Box sx={{ mb: 2 }} />
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default HospitalProfile;
