import React, { useCallback, useEffect, useState } from "react";

import moment from "moment";
import { SubmitHandler, useForm } from "react-hook-form";

import { Switch } from "@material-ui/core";

import { AccountUpdate } from "../models/Account.model";
import AddressService from "../services/Address.service";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
    Autocomplete,
    Button,
    Card,
    Grid,
    Modal,
    TextField,
    Typography,
    Stack,
} from "@mui/material";
import { Box } from "@mui/system";

interface Area {
    name: string;
    code: number;
    codename: string;
    division_type: string;
}
interface Province extends Area {
    phone_code: number;
    districts: District[];
}

interface District extends Area {
    province_code: number;
    wards: Ward[];
}

interface Ward extends Area {
    district_code: number;
}
export interface IProfileForm {
    dataProfile: AccountUpdate;
    open: boolean;
    handleClose: (
        type: "SAVE" | "CANCEL",
        dataProfile?: AccountUpdate,
        callback?: Function
    ) => void;
}

const ProfileForm: React.FC<IProfileForm> = (props: IProfileForm) => {
    const { dataProfile } = props;
    const [checked, setChecked] = React.useState<boolean>(dataProfile.isMale);
    const [maxDate] = useState<Date>(new Date());
    const [date, setDate] = React.useState<string | null>();
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [disableDistrict, setDisableDistrict] = useState<boolean>(true);
    const [disableWard, setDisableWard] = useState<boolean>(true);
    const [valueProvince, setValueProvince] = useState<Province>();
    const [valueDistrict] = useState<District>();
    const [valueWard] = useState<Ward>();
    // const [file, setFile] = React.useState<Blob | null>();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<AccountUpdate>({});

    React.useEffect(() => {
        setValue("id", dataProfile.id);
        setValue("firstName", dataProfile.firstName);
        setValue("lastName", dataProfile.lastName);
        // setValue("avatar", dataProfile.avatar);
        setValue("ward", dataProfile.ward);
        setValue("streetAddress", dataProfile.streetAddress);
        setValue("locality", dataProfile.locality);
        setValue("city", dataProfile.city);
        setValue("postalCode", dataProfile.postalCode);
        setValue("phone", dataProfile.phone);
        setValue("dob", dataProfile.dob);
        setValue("isMale", dataProfile.isMale);
        setChecked(dataProfile.isMale);
    }, [dataProfile, setValue]);

    const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        // eslint-disable-next-line no-console
        console.log(event.target.checked); //true
        if (event.target.checked === true) {
            setValue("isMale", true);
        } else if (event.target.checked === false) {
            setValue("isMale", false);
        } else {
            // eslint-disable-next-line no-console
            console.log(event.target.checked);
        }
    };
    const submitHandler: SubmitHandler<AccountUpdate> = (dataProfile: AccountUpdate) => {
        if (dataProfile) {
            props.handleClose("SAVE", dataProfile, clearErrors);
        }
    };
    const onChangeProvince = (newProvince: Province | null) => {
        if (newProvince) {
            setValue("city", newProvince.name);
            // console.log("city", newProvince.name);
            fetchDistricts(newProvince.code);
            setDisableDistrict(false);
        } else {
            setDistricts([]);
            setValue("ward", "");
            setDisableDistrict(true);
            setValue("locality", "");
            setDisableWard(true);
        }
    };

    const onChangeDistrict = (newDistrict: District | null) => {
        if (newDistrict) {
            setValue("locality", newDistrict.name);
            fetchWards(newDistrict.code);
            setDisableWard(false);
        } else {
            setWards([]);
            setValue("locality", "");
            setDisableWard(true);
        }
    };

    const fetchProvinces = useCallback(async () => {
        try {
            const service = new AddressService<Province[]>();
            const response = await service.getProvinces();
            if (response.status === 200) {
                setProvinces(response.data);
                // provinces.map((item) => {
                //     if (item.name === dataProfile.city) {
                //         console.log("province", item.code);
                //         let number = item.code;
                //         setValueProvince(item);
                //         fetchDistricts(number);
                //     }
                // });
            }
        } catch (_) {}
    }, []);

    const fetchDistricts = async (provinceCode: number) => {
        try {
            const service = new AddressService<Province>();
            const response = await service.getDistricts(provinceCode);
            if (response.status === 200) {
                setDistricts(response.data.districts);
            }
        } catch (_) {}
    };

    const fetchWards = async (districtCode: number) => {
        try {
            const service = new AddressService<District>();
            const response = await service.getWards(districtCode);
            if (response.status === 200) {
                setWards(response.data.wards);
            }
        } catch (_) {}
    };

    const handleChange = (newDate: Date | null) => {
        setDate(moment(newDate).format("YYYY/MM/DD"));
        setValue("dob", moment(newDate).format("YYYY/MM/DD"));
    };

    useEffect(() => {
        fetchProvinces();
    }, [fetchProvinces]);

    useEffect(() => {
        provinces.map((item) => {
            if (item.name === dataProfile.city) {
                setValueProvince(item);
            }
        });
    }, [
        valueWard,
        valueDistrict,
        dataProfile.city,
        wards,
        dataProfile.ward,
        districts,
        provinces,
        dataProfile.locality,
        valueProvince?.code,
    ]);
    return (
        <Modal open={props.open}>
            <Card
                sx={{
                    position: "absolute" as "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "40%",
                    mx: "auto",
                    p: 1,
                    m: 2,
                    borderRadius: 1,
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "center", m: 3 }}>
                    <Typography variant="h6" component="h2">
                        Chỉnh sửa thông tin
                    </Typography>
                </Box>
                <Box
                    component="form"
                    encType="multipart/form-data"
                    sx={{
                        "& > :not(style)": {
                            m: 2,
                            display: "flex",
                        },
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={5} lg={6}>
                            <TextField
                                id="firstName"
                                fullWidth
                                label="Tên*"
                                variant="outlined"
                                error={!!errors.firstName}
                                helperText={errors.firstName && "Tên là bắt buộc"}
                                {...register("firstName", { required: true })}
                            />
                        </Grid>
                        <Grid item xs={12} md={5} lg={5}>
                            <TextField
                                id="lastName"
                                fullWidth
                                label="Họ*"
                                variant="outlined"
                                {...register("lastName", { required: true })}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={5} lg={6}>
                            <TextField
                                id="phone"
                                fullWidth
                                label="Số điện thoại*"
                                variant="outlined"
                                {...register("phone", { required: true })}
                            />
                        </Grid>
                        <Grid item xs={12} md={5} lg={5}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    inputFormat="dd/MM/yyyy"
                                    value={date && Date.parse(date)}
                                    maxDate={maxDate}
                                    onChange={handleChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={!!errors.dob}
                                            helperText={errors.dob && "Vui lòng nhập ngày cấp"}
                                            {...register("dob", { required: true })}
                                            sx={{ width: "90%" }}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={5} lg={6}>
                            <TextField
                                id="streetAddress"
                                fullWidth
                                label="Địa chỉ đường phố*"
                                variant="outlined"
                                {...register("streetAddress", { required: true })}
                            />
                        </Grid>
                        <Grid item xs={12} md={5} lg={5}>
                            <Autocomplete
                                options={provinces}
                                getOptionLabel={(province: Province) => province.name}
                                defaultValue={valueProvince}
                                isOptionEqualToValue={(option, value) => option.name === value.name}
                                onChange={(_, newProvince) => onChangeProvince(newProvince)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        id="city"
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Tỉnh/Thành phố"
                                        error={!!errors.city}
                                        helperText={errors.city && "Vui lòng chọn Tỉnh/Thành phố"}
                                        {...register("city", { required: true })}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={5} lg={6}>
                            <Autocomplete
                                disabled={disableDistrict}
                                options={districts}
                                defaultValue={valueDistrict}
                                getOptionLabel={(district: District) => district.name}
                                isOptionEqualToValue={(option, value) => option.name === value.name}
                                onChange={(_, newDistrict) => onChangeDistrict(newDistrict)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        id="locality"
                                        variant="outlined"
                                        placeholder="Quận/Huyện"
                                        {...register("locality", { required: true })}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={5} lg={5}>
                            <Autocomplete
                                disabled={disableWard}
                                options={wards}
                                defaultValue={valueWard}
                                getOptionLabel={(ward: Ward) => ward.name}
                                isOptionEqualToValue={(option, value) => option.name === value.name}
                                onChange={(_, newWard) => {
                                    if (newWard) {
                                        setValue("ward", newWard.name);
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        id="ward"
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Phường/Xã"
                                        {...register("ward", { required: true })}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={5} lg={6}>
                            <Stack>
                                <Typography
                                    sx={{
                                        // mx: "auto",
                                        p: 1,
                                        //
                                        // "& > :not(style)": { m: 1 },
                                    }}
                                >
                                    Giới tính
                                    <Switch
                                        color="secondary"
                                        checked={checked}
                                        onChange={handleChangeGender}
                                        inputProps={{ "aria-label": "controlled" }}
                                    />
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={5} lg={5}>
                            <TextField
                                id="postalCode"
                                label="Mã bưu điện*"
                                variant="outlined"
                                fullWidth
                                disabled
                                error={!!errors.postalCode}
                                helperText={errors.postalCode && "Mã bưu điện là bắt buộc"}
                                {...register("postalCode", { required: true })}
                            />
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            justifyContent: "center",
                            mx: "auto",
                            p: 1,
                            m: 1,
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => props.handleClose("CANCEL", undefined, clearErrors)}
                        >
                            Hủy
                        </Button>
                        <Button variant="contained" onClick={handleSubmit(submitHandler)} autoFocus>
                            Lưu
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Modal>
    );
};

export default ProfileForm;
