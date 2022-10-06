import React, { useEffect, useState } from "react";

import moment from "moment";

import { Doctor } from "../../DoctorProfile/models/Doctor.model";
import useGetAccount from "../hooks/useGetAccount";
import { Account, AccountUpdate } from "../models/Account.model";
import AccountService from "../services/Account.service";
import DoctorService from "../services/Doctor.service";
import ProfileForm from "./ProfileForm";

import { Avatar, Card, Icon, IconButton, Rating, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

const Profile: React.FC = () => {
    const user = LocalStorageUtil.getItem("user") as Account;
    const { data } = useGetAccount(user.email);
    const [value, setValue] = React.useState<number | null>(4);
    const [open, setOpen] = useState<boolean>(false);
    const [account, setAccount] = useState<Account>();

    const fetchDoctor = async () => {
        try {
            let doctorService = new DoctorService<Doctor>();
            const response = await doctorService.getDoctorByEmail(user.email);
            if (response.status === 200) {
                // setDoctor(response.data);
                const doctorRating: Doctor = response.data;
                setValue(doctorRating.rating);
            }
        } catch (error) {}
    };

    const handleOpenModal = () => {
        setOpen(true);
        data && setAccount(data);
    };

    const refreshPage = () => {
        window.location.reload();
    };

    const updateAccount = async (data: AccountUpdate) => {
        try {
            let formData = new FormData();
            formData.append("Id", JSON.stringify(data?.id));
            formData.append("FirstName", data.firstName);
            formData.append("LastName", data.lastName);
            // formData.append("Avatar", file);
            formData.append("Ward", data.ward);
            formData.append("StreetAddress", data.streetAddress);
            formData.append("Locality", data.locality);
            formData.append("City", data.city);
            formData.append("PostalCode", data.postalCode);
            formData.append("Phone", data.phone);
            formData.append("Dob", data.dob);
            formData.append("IsMale", JSON.stringify(data.isMale));
            const service = new AccountService<AccountUpdate>();
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

    useEffect(() => {
        fetchDoctor();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClose = (
        type: "SAVE" | "CANCEL",
        dataProfile?: AccountUpdate,
        clearErrors?: Function
    ) => {
        if (type === "SAVE") {
            if (dataProfile) {
                updateAccount(dataProfile);
            }
        }
        if (clearErrors) {
            clearErrors();
        }
        setOpen(false);
    };

    return (
        <React.Fragment>
            {account && <ProfileForm dataProfile={account} open={open} handleClose={handleClose} />}
            <Card sx={{ minHeight: "100%", maxWidth: 400, borderRadius: 5, pl: 5 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ mt: 3 }} variant="h6" component="div">
                        Thông tin bác sĩ
                    </Typography>
                    <Box>
                        <Typography sx={{ mt: 3, mr: 3 }} variant="h6" component="h5">
                            <IconButton onClick={() => handleOpenModal()}>
                                <Icon>edit</Icon>
                            </IconButton>
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ mt: 2 }} />
                <Box sx={{ px: 3, mx: 5 }}>
                    <Box sx={{ mb: 1 }}>
                        <Avatar
                            sx={{ borderRadius: 10, width: 150, height: 150 }}
                            variant="square"
                            alt="Remy Sharp"
                            src={data?.avatar}
                        />
                    </Box>
                    <Box sx={{ ml: 2 }}>
                        <Rating name="simple-controlled" disabled value={value} />
                    </Box>
                </Box>

                <Box
                    sx={{
                        alignItems: "left",
                        display: "flex",
                        flexDirection: "column",
                        p: 2,
                    }}
                >
                    <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1" component="div">
                            {data?.isMale ? "Ông" : "Bà"}{" "}
                            {`${data?.firstName}
                        ${data?.lastName}`}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1" component="div">
                            Email:
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ fontWeight: "normal" }}
                        >
                            {data?.email}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1" component="div">
                            Số điện thoại:
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                            sx={{ fontWeight: "normal" }}
                        >
                            {data?.phone}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1" component="div">
                            Ngày sinh:
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                            sx={{ fontWeight: "normal" }}
                        >
                            {moment(data?.dob).format("DD/MM/YYYY")}
                        </Typography>
                    </Stack>
                    <Box sx={{ display: "inline" }}>
                        <Typography variant="subtitle1" component="div" marginRight={5}>
                            Địa chỉ:{" "}
                            {`${data?.streetAddress}, ${data?.locality}, ${data?.ward}, ${data?.city} `}
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default Profile;
