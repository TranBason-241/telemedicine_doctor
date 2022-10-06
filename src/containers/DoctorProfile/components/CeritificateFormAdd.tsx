import * as React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import logo from "../../../assets/logo.png";
import { CetificationAdd } from "../models/Doctor.model";
import CustomizeAutocompleteActive from "./CustomizeAutocompleteActive";

import { PhotoCamera } from "@mui/icons-material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
    Card,
    Grid,
    IconButton,
    Modal,
    TextField,
    TextFieldProps,
    Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

export interface ICertificationForm {
    open: boolean;
    dataCetificationAdd: CetificationAdd;
    handleClose: (
        type: "SAVE" | "CANCEL",
        dataCetificationAdd?: CetificationAdd,
        file?: Blob,
        callback?: Function
    ) => void;
}

const Input = styled("input")({
    display: "none",
});
const CertificationFormAdd: React.FC<ICertificationForm> = (props: ICertificationForm) => {
    const { dataCetificationAdd } = props;
    const [date, setDate] = React.useState<Date | null>(new Date("2000-01-01T21:11:54"));
    const [imgLink, setImgLink] = React.useState<string>(logo);
    const [file, setFile] = React.useState<Blob>();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<CetificationAdd>({});

    React.useEffect(() => {
        // setValue("email", dataHospital.email);
        setValue("certificationId", dataCetificationAdd.certificationId);
        setValue("dateOfIssue", dataCetificationAdd.dateOfIssue);
        setValue("evidence", dataCetificationAdd.evidence);
    }, [dataCetificationAdd, setValue]);

    const handleChange = (newDate: Date | null) => {
        setDate(newDate);
    };

    const submitHandler: SubmitHandler<CetificationAdd> = (
        dataCetificationAdd: CetificationAdd
    ) => {
        if (dataCetificationAdd && file) {
            props.handleClose("SAVE", dataCetificationAdd, file, clearErrors);
        }
    };

    const uploadedFile = (event?: React.ChangeEvent<HTMLInputElement>) => {
        setImgLink(URL.createObjectURL(event?.target.files![0]));
        setFile(event?.target.files![0] as Blob);
    };

    const { ref: certificationIdRef, ...certificationIdRefProps } = register("certificationId", {
        min: {
            value: 1,
            message: "Mã dịch bệnh không được để trống",
        },
    });
    const changeValue = (value: number | number[]) => {
        if (!Array.isArray(value)) {
            setValue("certificationId", value);
            clearErrors("certificationId");
        }
    };

    return (
        <Modal
            open={props.open}
            aria-labelledby="certificate-dialog"
            aria-describedby="alert-certificate-description"
        >
            <form onSubmit={handleSubmit(submitHandler)}>
                <Card
                    sx={{
                        position: "absolute" as "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "50%",
                        minWidth: 275,
                        mx: "auto",
                        p: 1,
                        m: 2,
                        borderRadius: 1,
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "center", m: 3 }}>
                        <Typography variant="h6" component="h2">
                            Thông tin chứng chỉ
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            "& > :not(style)": {
                                m: 2,
                                display: "flex",
                                // justifyContent: "center"
                            },
                        }}
                    >
                        <CustomizeAutocompleteActive
                            query="/certifications"
                            field="name"
                            label="Nhóm chứng chỉ"
                            searchField="name"
                            limit={10}
                            errors={errors.certificationId}
                            errorMessage={"Nhóm bệnh dịch là bắt buộc"}
                            inputRef={certificationIdRef}
                            {...certificationIdRefProps}
                            changeValue={changeValue}
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                inputFormat="dd/MM/yyyy"
                                value={date}
                                onChange={handleChange}
                                renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
                                    <TextField
                                        {...params}
                                        error={!!errors.dateOfIssue}
                                        helperText={errors.dateOfIssue && "Vui lòng nhập ngày cấp"}
                                        {...register("dateOfIssue", { required: true })}
                                        sx={{ width: "90%" }}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                        <Grid item xs={4}>
                            <label htmlFor="icon-button-file">
                                <Input
                                    accept="/*"
                                    id="icon-button-file"
                                    type="file"
                                    {...register("evidence")}
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
                            <img src={imgLink} alt="Certificate Image" width="100" height="100" />
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
                            <Button variant="contained" type="submit" autoFocus>
                                Lưu
                            </Button>
                        </Box>
                    </Box>
                </Card>
            </form>
        </Modal>
    );
};

export default CertificationFormAdd;
