import React, { useCallback, useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router";

import useSnackbar from "src/components/Snackbar/useSnackbar";

import { Account } from "./models/Account.model";
import AccountService from "./services/Account.service";
import AddressService from "./services/Address.service";

import { PhotoCamera } from "@mui/icons-material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
    Autocomplete,
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    FormControlLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

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

const Input = styled("input")({
    display: "none",
});

const AccountForm: React.FC = () => {
    const [inputDob, setInputDob] = useState<Date>(new Date("1990-01-01T00:00:00"));
    const [maxDate, setMaxDate] = useState<Date>(new Date());
    const [imgLink, setImgLink] = useState<string>();
    const [file, setFile] = useState<string | Blob>("");
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [disableDistrict, setDisableDistrict] = useState<boolean>(true);
    const [disableWard, setDisableWard] = useState<boolean>(true);
    const [errMsg, setErrMsg] = useState<string>("");
    const history = useHistory();
    const showSnackBar = useSnackbar();

    const handleChange = (newValue: Date | null) => {
        if (!newValue) {
            setInputDob(new Date("1990-01-01T00:00:00"));
        } else {
            setInputDob(newValue);
        }
    };

    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm<Account>();

    const createAccount = async (data: Account) => {
        try {
            let formData = new FormData();
            formData.append("Email", data.email);
            formData.append("FirstName", data.firstName);
            formData.append("LastName", data.lastName);
            formData.append("Image", file);
            formData.append("Ward", data.ward);
            formData.append("StreetAddress", data.streetAddress);
            formData.append("Locality", data.locality);
            formData.append("City", data.city);
            formData.append("PostalCode", data.postalCode);
            formData.append("Phone", data.phone);
            formData.append("Dob", data.dob);
            formData.append("IsMale", data.isMale.toString());
            formData.append("RoleId", data.roleId.toString());
            const service = new AccountService<Account>();
            const response = await service.create(formData);
            if (response.status === 201) {
                // console.log(response.data);
                history.push("/doctor-form");
            }
            if (response.status === 400) {
                setErrMsg("Vui lòng chọn ảnh đại diện");
            }
            if (response.status === 500) {
                setErrMsg("Hệ thống xảy ra lỗi. Vui lòng thử lại sau ít phút");
            }
        } catch (_) {
            // console.log(e);
            showSnackBar({
                children: errMsg,
                variant: "filled",
                severity: "error",
            });
        }
    };

    const onSubmit: SubmitHandler<Account> = (data: Account) => {
        if (data.isMale === "true") {
            data.isMale = true;
        } else {
            data.isMale = false;
        }
        const res: Account = { ...data, postalCode: "0", roleId: 1, dob: inputDob.toDateString() };
        createAccount(res);
    };

    const uploadedFile = (event?: React.ChangeEvent<HTMLInputElement>) => {
        setImgLink(URL.createObjectURL(event?.target.files![0]));
        setFile(event?.target.files![0] as Blob);
    };

    const onChangeProvince = (newProvince: Province | null) => {
        if (newProvince) {
            setValue("city", newProvince.name);
            clearErrors("city");
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
            setValue("ward", newDistrict.name);
            clearErrors("ward");
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

    useEffect(() => {
        let date = new Date();
        date.setDate(date.getDate() - 1);
        setMaxDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    }, []);

    useEffect(() => {
        setValue("email", LocalStorageUtil.getItem("email"));
        fetchProvinces();
    }, [fetchProvinces, setValue]);

    return (
        <Card
            sx={{
                width: "50%",
                minWidth: 400,
                p: 1,
                m: "0 auto",
                mt: 3,
                mb: 3,
                borderRadius: 1,
            }}
        >
            <CardHeader title="Thông tin tài khoản" sx={{ textAlign: "center" }} />
            <CardContent
                component="form"
                encType="multipart/form-data"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    "& > :not(style)": {
                        m: 2,
                        display: "flex",
                        alignItems: "center",
                    },
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
                    <Avatar src={imgLink} alt="avatar" sx={{ width: 130, height: 130 }} />
                    <label htmlFor="icon-button-file">
                        <Input
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                            {...register("avatar")}
                            onChange={uploadedFile}
                        />
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </Box>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <Typography sx={{ fontSize: 20 }}>Họ *</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            id="last-name"
                            placeholder="Họ"
                            variant="outlined"
                            error={!!errors.lastName}
                            helperText={errors.lastName && "Họ không được trống"}
                            {...register("lastName", { required: true })}
                            sx={{ width: "80%" }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography sx={{ fontSize: 20 }}>Tên *</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            id="first-name"
                            placeholder="Tên"
                            variant="outlined"
                            error={!!errors.firstName}
                            helperText={errors.firstName && "Vui lòng nhập tên"}
                            {...register("firstName", { required: true })}
                            sx={{ width: "80%" }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography sx={{ fontSize: 20 }}>Giới tính *</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <RadioGroup
                            aria-label="isMale"
                            defaultValue="true"
                            name="radio-buttons-group"
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: "80%",
                            }}
                        >
                            <FormControlLabel
                                {...register("isMale", { required: true })}
                                value="true"
                                control={<Radio />}
                                label="Nam"
                            />
                            <FormControlLabel
                                {...register("isMale", { required: true })}
                                value="false"
                                control={<Radio />}
                                label="Nữ"
                            />
                            <FormControlLabel
                                {...register("isMale", { required: true })}
                                value="null"
                                control={<Radio />}
                                label="Khác"
                            />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography sx={{ fontSize: 20 }}>Ngày sinh *</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                inputFormat="dd/MM/yyyy"
                                value={inputDob}
                                maxDate={maxDate}
                                onChange={(newValue) => handleChange(newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={!!errors.dob}
                                        helperText={errors.dob && "Vui lòng nhập ngày sinh"}
                                        {...register("dob", { required: true })}
                                        sx={{ width: "80%" }}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography sx={{ fontSize: 20 }}>Email *</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            id="email"
                            variant="outlined"
                            disabled
                            {...register("email")}
                            sx={{ width: "80%" }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography sx={{ fontSize: 20 }}>Số điện thoại *</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            id="phone"
                            variant="outlined"
                            placeholder="0123456789"
                            error={!!errors.phone}
                            helperText={errors.phone && "Vui lòng nhập số điện thoại"}
                            {...register("phone", { required: true })}
                            sx={{ width: "80%" }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography sx={{ fontSize: 20 }}>Địa chỉ *</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            id="streetAddress"
                            variant="outlined"
                            placeholder="Số nhà/tên đường"
                            error={!!errors.streetAddress}
                            helperText={errors.streetAddress && "Vui lòng nhập địa chỉ cụ thể"}
                            {...register("streetAddress", { required: true })}
                            sx={{ width: "80%" }}
                        />
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={9}>
                        <Autocomplete
                            options={provinces}
                            getOptionLabel={(province: Province) => province.name}
                            isOptionEqualToValue={(option, value) => option.name === value.name}
                            onChange={(_, newProvince) => onChangeProvince(newProvince)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    id="city"
                                    variant="outlined"
                                    placeholder="Tỉnh/Thành phố"
                                    error={!!errors.city}
                                    helperText={errors.city && "Vui lòng chọn Tỉnh/Thành phố"}
                                    {...register("city", { required: true })}
                                    sx={{ width: "80%" }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={9}>
                        <Autocomplete
                            disabled={disableDistrict}
                            options={districts}
                            getOptionLabel={(district: District) => district.name}
                            isOptionEqualToValue={(option, value) => option.name === value.name}
                            onChange={(_, newDistrict) => onChangeDistrict(newDistrict)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    id="ward"
                                    variant="outlined"
                                    placeholder="Quận/Huyện"
                                    error={!!errors.ward}
                                    helperText={errors.ward && "Vui lòng chọn Quận/Huyện"}
                                    {...register("ward", { required: true })}
                                    sx={{ width: "80%" }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={9}>
                        <Autocomplete
                            disabled={disableWard}
                            options={wards}
                            getOptionLabel={(ward: Ward) => ward.name}
                            isOptionEqualToValue={(option, value) => option.name === value.name}
                            onChange={(_, newWard) => {
                                if (newWard) {
                                    setValue("locality", newWard.name);
                                    clearErrors("locality");
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    id="locality"
                                    variant="outlined"
                                    placeholder="Phường/Xã"
                                    error={!!errors.locality}
                                    helperText={errors.locality && "Vui lòng chọn Phường/Xã"}
                                    {...register("locality", { required: true })}
                                    sx={{ width: "80%" }}
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                <Box
                    sx={{
                        justifyContent: "center",
                        "& > :not(style)": { m: 1 },
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={() => {
                            history.push("/login");
                        }}
                    >
                        Hủy bỏ
                    </Button>
                    <Button variant="contained" type="submit">
                        Lưu
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AccountForm;
