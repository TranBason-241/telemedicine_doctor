import React from "react";

import moment from "moment";
import { SubmitHandler, useForm } from "react-hook-form";

import logo from "../../../assets/logo.png";
import { Doctor } from "../models/Doctor.model";

import { PhotoCamera } from "@mui/icons-material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Button, Card, Grid, IconButton, Modal, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

export interface IPracticingForm {
    dataPracticing: Doctor;
    open: boolean;
    handleClose: (
        type: "SAVE" | "CANCEL",
        dataPracticing?: Doctor,
        file?: Blob,
        callback?: Function
    ) => void;
}

const Input = styled("input")({
    display: "none",
});
const PracticingForm: React.FC<IPracticingForm> = (props: IPracticingForm) => {
    const { dataPracticing } = props;
    // const [checked, setChecked] = useState<boolean>(dataPracticing.isActive);
    const [date, setDate] = React.useState<string | null>();
    const [maxDate] = React.useState<Date>(new Date());
    const [imgLink, setImgLink] = React.useState<string>(logo);
    const [file, setFile] = React.useState<Blob>();

    const uploadedFile = (event?: React.ChangeEvent<HTMLInputElement>) => {
        setImgLink(URL.createObjectURL(event?.target.files![0]));
        setFile(event?.target.files![0] as Blob);
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<Doctor>({});

    React.useEffect(() => {
        setValue("id", dataPracticing.id);
        setValue("name", dataPracticing.name);
        setValue("avatar", dataPracticing.avatar);
        setValue("practisingCertificate", "");
        setValue("certificateCode", dataPracticing.certificateCode);
        setValue("placeOfCertificate", dataPracticing.placeOfCertificate);
        setValue("dateOfCertificate", dataPracticing.dateOfCertificate);
        setValue("scopeOfPractice", dataPracticing.scopeOfPractice);
        setValue("description", dataPracticing.description);
        setValue("isActive", dataPracticing.isActive);
        setImgLink(dataPracticing.practisingCertificate);
    }, [dataPracticing, setValue]);
    const submitHandler: SubmitHandler<Doctor> = (dataPracticing: Doctor) => {
        if (dataPracticing && file) {
            props.handleClose("SAVE", dataPracticing, file, clearErrors);
        }
    };

    const handleChange = (newDate: Date | null) => {
        setDate(moment(newDate).format("YYYY/MM/DD"));
        setValue("dateOfCertificate", moment(newDate).format("YYYY/MM/DD"));
    };

    return (
        <Modal open={props.open}>
            <Card
                sx={{
                    position: "absolute" as "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "50%",
                    minWidth: 300,
                    mx: "auto",
                    p: 1,
                    m: 1,
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
                    sx={{
                        "& > :not(style)": {
                            m: 1,
                            display: "flex",
                            // justifyContent: "center",
                        },
                    }}
                >
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <TextField
                                id="placeOfCertificate"
                                label="Nơi cấp chứng chỉ*"
                                variant="outlined"
                                error={!!errors.placeOfCertificate}
                                helperText={
                                    errors.placeOfCertificate && "Nơi cấp chứng chỉ là bắt buộc"
                                }
                                {...register("placeOfCertificate", { required: true })}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                id="scopeOfPractice"
                                label="Phạm vi*"
                                variant="outlined"
                                error={!!errors.dateOfCertificate}
                                helperText={errors.scopeOfPractice && "Phạm vi là bắt buộc"}
                                {...register("scopeOfPractice", { required: true })}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    inputFormat="dd/MM/yyyy"
                                    value={date && Date.parse(date)}
                                    maxDate={maxDate}
                                    onChange={handleChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={!!errors.dateOfCertificate}
                                            helperText={
                                                errors.dateOfCertificate && "Vui lòng nhập ngày cấp"
                                            }
                                            {...register("dateOfCertificate", { required: true })}
                                            sx={{ width: "90%" }}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>

                    <TextField
                        id="description"
                        label="Mô tả*"
                        variant="outlined"
                        error={!!errors.description}
                        rows={5}
                        multiline
                        helperText={errors.description && "Mô tả là bắt buộc"}
                        {...register("description", { required: true })}
                    />

                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <img
                                src={imgLink}
                                alt="Practising certificate"
                                width="100"
                                height="100"
                            />
                            <label htmlFor="icon-button-file">
                                <Input
                                    accept="/*"
                                    id="icon-button-file"
                                    type="file"
                                    {...register("practisingCertificate")}
                                    onChange={uploadedFile}
                                />

                                <IconButton
                                    color="primary"
                                    aria-label="upload picture"
                                    component="span"
                                >
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </Grid>
                    </Grid>

                    <Box
                        sx={{
                            justifyContent: "center",
                            mx: "auto",
                            p: 1,
                            m: 1,
                            "& > :not(style)": { m: 1 },
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() =>
                                props.handleClose("CANCEL", undefined, file, clearErrors)
                            }
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

export default PracticingForm;
