import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Hospital } from "../models/Hospital.model";

import { Button, Card, Modal, Stack, Switch, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface IHospitalForm {
    dataHospital: Hospital;
    opened: boolean;
    handleClose: (type: "SAVE" | "CANCEL", dataHospital?: Hospital, callback?: Function) => void;
}

const HospitalForm: React.FC<IHospitalForm> = (props: IHospitalForm) => {
    const { dataHospital } = props;
    const [checked, setChecked] = React.useState<boolean>(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        // eslint-disable-next-line no-console
        console.log(event.target.checked); //true
        if (event.target.checked === true) {
            setValue("isActive", true);
        } else if (event.target.checked === false) {
            setValue("isActive", false);
        } else {
            // eslint-disable-next-line no-console
            console.log(event.target.checked);
        }
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<Hospital>({});

    React.useEffect(() => {
        setValue("id", dataHospital.id);
        setValue("hospitalCode", dataHospital.hospitalCode);
        setValue("name", dataHospital.name);
        setValue("address", dataHospital.address);
        setValue("description", dataHospital.description);
        setValue("isActive", dataHospital.isActive);
        setChecked(dataHospital.isActive);
    }, [dataHospital, setValue, setChecked]);
    const submitHandler: SubmitHandler<Hospital> = (dataHospital: Hospital) => {
        // eslint-disable-next-line no-console
        console.log(dataHospital);
        if (dataHospital) {
            props.handleClose("SAVE", dataHospital, clearErrors);
        }
    };

    return (
        <Modal open={props.opened}>
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
                        Thông tin Bệnh viện
                    </Typography>
                </Box>
                <Box
                    component="form"
                    sx={{
                        "& > :not(style)": {
                            m: 2,
                            display: "flex",
                            // justifyContent: "center",
                        },
                    }}
                >
                    <TextField
                        id="hospital-code"
                        label="Mã bệnh viện *"
                        variant="outlined"
                        defaultValue={props.dataHospital.hospitalCode}
                        error={!!errors.hospitalCode}
                        helperText={errors.hospitalCode && "Mã bệnh viện là bắt buộc"}
                        {...register("hospitalCode", { required: true })}
                    />
                    <TextField
                        id="hospital-name"
                        label="Tên bệnh viện *"
                        variant="outlined"
                        defaultValue={props.dataHospital.name}
                        error={!!errors.name}
                        helperText={errors.name && "Tên bệnh viện là bắt buộc"}
                        {...register("name", { required: true })}
                    />
                    <TextField
                        id="hospital-address"
                        label="Địa chỉ"
                        variant="outlined"
                        defaultValue={props.dataHospital.address}
                        {...register("address")}
                    />
                    {/* <CustomizeAutocomplete
                        query="/hospitals"
                        field="groupName"
                        label="Chuyên ngành"
                        searchField="group-name"
                        limit={10}
                        errors={errors.id}
                        errorMessage={"Nhóm ngành nghề là bắt buộc"}
                        inputRef={idRef}
                        {...idRefProps}
                        changeValue={changeValue}
                    /> */}
                    <TextField
                        id="description"
                        label="Mô tả"
                        variant="outlined"
                        defaultValue={props.dataHospital.description}
                        {...register("description")}
                        multiline
                        rows={5}
                    />
                    <Stack direction="row" spacing={0}>
                        <Typography
                            sx={{
                                // mx: "auto",
                                p: 1,
                                //
                                // "& > :not(style)": { m: 1 },
                            }}
                        >
                            Trạng thái:
                        </Typography>
                        <Switch
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </Stack>

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

export default HospitalForm;
