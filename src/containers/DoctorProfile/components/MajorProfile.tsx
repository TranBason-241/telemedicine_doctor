import React, { useState } from "react";

import useSnackbar from "src/components/Snackbar/useSnackbar";

import useGetDoctor from "../hooks/useGetDoctor";
import usePutMajor from "../hooks/usePutMajor";
import { Account } from "../models/Account.model";
import { Doctor, DoctorFromAdd } from "../models/Doctor.model";
import { Major } from "../models/Major.model";
import DoctorService from "../services/Doctor.service";
import MajorForm from "./MajorForm";
import MajorFormAdd from "./MajorFormAdd";

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

const MajorProfile: React.FC = () => {
    const initCetification: Major = {
        name: "",
        description: "",
        isActive: true,
    };
    const user = LocalStorageUtil.getItem("user") as Account;
    const { data, isLoading, isError } = useGetDoctor(user.email);
    const { mutate } = usePutMajor();
    const [open, setOpen] = useState<boolean>(false);
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [major] = useState<Major>(initCetification);
    const showSnackbar = useSnackbar();
    if (isError) {
        return <div> Error</div>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }
    const createMajor = async (data: DoctorFromAdd) => {
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
                console.log("formdata", response.data);
                showSnackbar({
                    children: "Bạn đã đăng kí thành công, chờ xét duyệt",
                    severity: "success",
                    color: "success",
                });
                // refreshPage();
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
        }
    };

    // Edit major
    const handleClose = (type: "SAVE" | "CANCEL", dataMajor?: Major, clearErrors?: Function) => {
        // setLoading(isLoading);
        if (type === "SAVE") {
            if (dataMajor) {
                if (dataMajor.id) {
                    mutate({
                        id: dataMajor.id,
                        name: dataMajor?.name,
                        description: dataMajor?.description,
                        isActive: dataMajor?.isActive,
                    });
                } else {
                }
            }
            // editMajor(dataMajor);
        }
        if (clearErrors) {
            clearErrors();
        }
        if (type === "SAVE") {
            refreshPage();
        }

        setOpen(false);
    };

    // const handleOpen = async (maj: Major) => {
    //     setOpen(true);
    //     setMajor(maj);
    // };
    // Edit major
    //Add major
    const handleCreate = () => {
        setOpenAdd(true);
    };
    const refreshPage = () => {
        window.location.reload();
    };

    const handleCloseMajorAdd = (
        type: "SAVE" | "CANCEL",
        dataMajorAdd?: DoctorFromAdd,
        clearErrors?: Function
    ) => {
        // setLoading(isLoading);
        if (type === "SAVE") {
            if (dataMajorAdd) {
                createMajor(dataMajorAdd);
            }
        }
        if (clearErrors) {
            clearErrors();
        }

        setOpenAdd(false);
    };

    return (
        <React.Fragment>
            {data && (
                <MajorFormAdd
                    dataMajorAdd={data}
                    opened={openAdd}
                    handleClose={handleCloseMajorAdd}
                />
            )}
            <MajorForm dataMajor={major} opened={open} handleClose={handleClose} />
            <Card sx={{ borderRadius: 5, minHeight: "100%" }}>
                <Box sx={{ ml: 2 }}>
                    <Typography sx={{ mt: 3 }} variant="h6" component="div">
                        Chuyên khoa
                    </Typography>
                </Box>
                <Box sx={{ display: "block", gridTemplateColumns: "repeat(3, 1fr)" }}>
                    <List
                        sx={{
                            width: "100%",
                            // maxWidth: 360,
                            alignItems: "center",
                            bgcolor: "background.paper",
                            position: "relative",
                            overflow: "auto",
                            maxHeight: 350,
                            "& ul": { padding: 0 },
                        }}
                    >
                        {data?.majorDoctors.length === 0 ? (
                            <Typography component="div" align="center">
                                <Box sx={{ p: 1, fontSize: 18 }}>Chưa có dữ liệu</Box>
                            </Typography>
                        ) : (
                            <>
                                {data?.majorDoctors?.map((item) => (
                                    <ListItem key={item?.id}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                borderRadius: 5,
                                                bgcolor: "#fafafa",
                                                p: 1,
                                            }}
                                        >
                                            <Box sx={{ display: "block" }}>
                                                <Typography variant="h6" component="h5">
                                                    {item?.major?.name}
                                                    {item?.major?.name ? (
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
                                                    Mô tả: Chuyên chữa trị các bệnh nội ngoại tiết{" "}
                                                    {item?.major?.description}
                                                </Typography>
                                            </Box>
                                            {/* <Box sx={{ display: "flex", ml: 4 }}>
                                                <Typography variant="h6" component="div">
                                                    <IconButton
                                                        onClick={() => handleOpen(item?.major)}
                                                    >
                                                        <Icon>edit</Icon>
                                                    </IconButton>
                                                </Typography>
                                            </Box> */}
                                        </Box>
                                    </ListItem>
                                ))}
                            </>
                        )}
                    </List>
                    <Box sx={{ mb: 2 }} />
                    <Box sx={{ textAlign: "center" }}>
                        <Button variant="outlined" onClick={() => handleCreate()}>
                            + Thêm chuyên khoa
                        </Button>
                    </Box>
                    <Box sx={{ mb: 2 }} />
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default MajorProfile;
