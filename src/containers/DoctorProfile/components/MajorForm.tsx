import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Major } from "../models/Major.model";

import { Button, Card, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface IMajorForm {
    opened: boolean;
    dataMajor: Major;
    handleClose: (type: "SAVE" | "CANCEL", dataMajor?: Major, callback?: Function) => void;
}

const MajorForm: React.FC<IMajorForm> = (props: IMajorForm) => {
    const { dataMajor } = props;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<Major>({});

    React.useEffect(() => {
        setValue("id", dataMajor.id);
        setValue("name", dataMajor.name);
        setValue("description", dataMajor.description);
        setValue("isActive", dataMajor.isActive);
    }, [dataMajor, setValue]);

    const submitHandler: SubmitHandler<Major> = (dataMajor: Major) => {
        // eslint-disable-next-line no-console
        console.log(dataMajor);
        if (dataMajor) {
            props.handleClose("SAVE", dataMajor, clearErrors);
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
                        Thông tin Chuyên ngành
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
                        id="major-name"
                        label="Tên chuyên ngành *"
                        variant="outlined"
                        error={!!errors.name}
                        helperText={errors.name && "Tên chuyên ngành là bắt buộc"}
                        {...register("name", { required: true })}
                    />
                    <TextField
                        id="major-description"
                        label="Thông tin mô tả"
                        variant="outlined"
                        multiline
                        rows={5}
                        {...register("description")}
                    />

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

export default MajorForm;
