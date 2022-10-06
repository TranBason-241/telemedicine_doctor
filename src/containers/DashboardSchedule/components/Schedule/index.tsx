import React, { useState } from "react";

import moment from "moment";

import useGetSlotByDoctorId from "./hooks/useGetSlotByDoctorID";
import useSaveSlots from "./hooks/useSaveSlots";
import { Slot, SlotCM } from "./models/schedule.model";

import { ViewState, TodayButton, DateNavigator } from "@devexpress/dx-react-scheduler";
import {
    Scheduler,
    WeekView,
    Appointments,
    Toolbar,
} from "@devexpress/dx-react-scheduler-material-ui";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Grid,
    IconButton,
    Paper,
    TextField,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

const currentDate = new Date().toDateString();

const SlotManagement: React.FC = () => {
    const refenrenceId = LocalStorageUtil.getItem("refenrenceId") as string;
    const { isLoading, data } = useGetSlotByDoctorId(`${refenrenceId || 0}`);
    const { mutate, isSuccess } = useSaveSlots();

    const [open, setOpen] = React.useState(false);
    const [slot, setSlot] = useState<Slot | undefined>(undefined);
    const [openCancelField, setOpenCancelField] = useState(false);
    const [listCreatedSlot, setListCreatedSlot] = useState<SlotCM[]>([]);

    const handleClick = (id: number) => {
        setOpen(true);
        setSlot(data ? data?.find((x) => x.id === id) : undefined);
    };

    const saveSlots = () => {
        // eslint-disable-next-line no-console
        console.log(listCreatedSlot);
        mutate(listCreatedSlot);
        if (isSuccess) {
            setListCreatedSlot([]);
        }
    };

    const TimeTableCell = (props: WeekView.TimeTableCellProps) => {
        const { children, startDate, endDate, ...rest } = props;
        return (
            <WeekView.TimeTableCell style={{ cursor: "pointer", position: "relative" }} {...rest}>
                {endDate && new Date() < endDate && (
                    <Checkbox
                        size="small"
                        sx={{
                            position: "absolute",
                            top: 2,
                            right: 2,
                        }}
                        checked={
                            listCreatedSlot.filter((x) => {
                                return (
                                    x.assignedDate === moment(startDate).format("YYYY-MM-DD") &&
                                    x.startTime === moment(startDate).format("H:mm:ss")
                                );
                            }).length > 0
                        }
                        onChange={(e, checked: boolean) => {
                            if (checked) {
                                const slot: SlotCM = {
                                    doctorId: Number(refenrenceId) || 0,
                                    assignedDate: moment(startDate).format("YYYY-MM-DD"),
                                    startTime: moment(startDate).format("H:mm:ss"),
                                    endTime: moment(endDate).format("H:mm:ss"),
                                };
                                setListCreatedSlot([...listCreatedSlot, slot]);
                            } else {
                                const deletedListCreatedSlot = listCreatedSlot.filter((x) => {
                                    return (
                                        x.assignedDate !== moment(startDate).format("YYYY-MM-DD") ||
                                        x.startTime !== moment(startDate).format("H:mm:ss")
                                    );
                                });
                                setListCreatedSlot(deletedListCreatedSlot);
                            }
                        }}
                    />
                )}
                {children}
            </WeekView.TimeTableCell>
        );
    };

    const handleClose = () => {
        setOpen(false);
        setSlot(undefined);
        setOpenCancelField(false);
    };

    const Appointment: React.FC = (props: any) => {
        const { children, style, data, ...restProps } = props;
        return (
            <Appointments.Appointment
                {...restProps}
                style={{
                    ...style,
                    backgroundColor: data.backgroundColor,
                    color: data.color,
                    fontSize: 12,
                    cursor: "pointer",
                }}
                onDoubleClick={() => handleClick(data.id)}
            >
                {children}
            </Appointments.Appointment>
        );
    };

    const getColor = (status: string) => {
        switch (status) {
            case "CANCELED":
                return "red";
            case "COMPLETED":
                return "green";
            case "BOOKED":
                return "orange";
            default:
                return "blue";
        }
    };

    if (isLoading) {
        return (
            <Box height={450} display="flex" alignItems="center" justifyContent="center">
                <CircularProgress />
            </Box>
        );
    }
    if (data) {
        const dataView =
            data?.map((slot) => {
                const year = new Date(slot.assignedDate).getFullYear();
                const month = new Date(slot.assignedDate).getMonth();
                const day = new Date(slot.assignedDate).getDate();
                return {
                    id: slot.id,
                    startDate: new Date(
                        year,
                        month,
                        day,
                        Number(slot.startTime.slice(0, 2)),
                        Number(slot.startTime.slice(3, 2)),
                        0
                    ),
                    endDate: new Date(
                        year,
                        month,
                        day,
                        Number(slot.endTime.slice(0, 2)),
                        Number(slot.endTime.slice(3, 2)),
                        0
                    ),
                    title: slot.healthCheckId ? `${slot.healthCheck?.patient?.name}` : "Lịch trống",
                    location: "",
                    backgroundColor: slot.healthCheckId
                        ? getColor(slot.healthCheck?.status)
                        : grey[400],
                    color: slot.healthCheckId ? "#fff" : "#fff",
                };
            }) || [];
        return (
            <React.Fragment>
                {/* <Grid container>
                    <Grid item lg={6} md={6} xs={12}>
                        <Typography variant="h5">
                            Lịch khám bệnh của bác sĩ a {data && data[0]?.doctor.name}
                        </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid padding={1} container border="1px solid grey" borderRadius="15px">
                            <Grid display="flex" item xs={6} alignItems="center">
                                <Box
                                    borderRadius="5px"
                                    mr={2}
                                    height={20}
                                    width={20}
                                    bgcolor="grey.400"
                                ></Box>
                                Chưa có lịch
                            </Grid>
                            <Grid display="flex" item xs={6} alignItems="center">
                                <Box
                                    borderRadius="5px"
                                    mr={2}
                                    height={20}
                                    width={20}
                                    bgcolor="orange"
                                ></Box>
                                Đang đợi
                            </Grid>
                            <Grid display="flex" item xs={6} alignItems="center">
                                <Box
                                    borderRadius="5px"
                                    mr={2}
                                    height={20}
                                    width={20}
                                    bgcolor="red"
                                ></Box>
                                Bị hủy
                            </Grid>
                            <Grid display="flex" item xs={6} alignItems="center">
                                <Box
                                    borderRadius="5px"
                                    mr={2}
                                    height={20}
                                    width={20}
                                    bgcolor="green"
                                ></Box>
                                Đã hoàn thành
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> */}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{ minWidth: 600 }}
                >
                    <DialogContent sx={{ minWidth: 600 }}>
                        <DialogContentText id="alert-dialog-description">
                            {slot && (
                                <React.Fragment>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            Thời gian
                                        </Grid>
                                        <Grid item xs={9}>
                                            {slot && slot.startTime?.slice(0, 5)} {"- "}
                                            {slot?.endTime?.slice(0, 5)}{" "}
                                            {moment(slot?.assignedDate).format(`DD/MM/YYYY`)}
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            Trạng thái
                                        </Grid>
                                        <Grid item xs={9}>
                                            {slot.healthCheck
                                                ? slot.healthCheck?.status
                                                : "Chưa được đặt"}
                                        </Grid>
                                    </Grid>
                                    {slot.healthCheck && (
                                        <Grid container>
                                            <Grid item xs={3}>
                                                Bệnh nhân
                                            </Grid>
                                            <Grid item xs={9}>
                                                {slot.healthCheck?.patient?.name}
                                            </Grid>
                                        </Grid>
                                    )}
                                    {openCancelField && (
                                        <Grid container>
                                            <Grid item xs={3}>
                                                Lí do hủy
                                            </Grid>
                                            <Grid item xs={9}>
                                                <TextField multiline minRows={2} maxRows={3} />
                                            </Grid>
                                        </Grid>
                                    )}
                                </React.Fragment>
                            )}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {slot && !slot.healthCheck && !openCancelField && (
                            <Button onClick={handleClose} color="error" autoFocus>
                                Xóa lịch
                            </Button>
                        )}
                        {slot && slot.healthCheck?.status === "BOOKED" && !openCancelField && (
                            <Button
                                onClick={() => setOpenCancelField(true)}
                                color="error"
                                autoFocus
                            >
                                HỦY BUỔI HẸN
                            </Button>
                        )}
                        {openCancelField && (
                            <Grid container alignItems="center" justifyContent="center">
                                <Grid item>
                                    <Button onClick={handleClose} color="error">
                                        XÁC NHẬN
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={handleClose}>HỦY</Button>
                                </Grid>
                            </Grid>
                        )}
                    </DialogActions>
                </Dialog>
                <Box height={5} />
                <Paper>
                    <Scheduler data={dataView} height={450}>
                        <ViewState defaultCurrentDate={currentDate} />
                        <WeekView
                            startDayHour={7}
                            endDayHour={19}
                            cellDuration={60}
                            timeTableCellComponent={TimeTableCell}
                        />
                        <Toolbar />
                        <DateNavigator
                            openButtonComponent={() => {
                                return (
                                    <IconButton>
                                        <NavigateNext></NavigateNext>
                                    </IconButton>
                                );
                            }}
                            navigationButtonComponent={() => {
                                return <div>a</div>;
                            }}
                            overlayComponent={() => {
                                return null;
                            }}
                            rootComponent={(props) => {
                                var next = new Date();
                                next.setDate(next.getDate() + ((1 + 7 - next.getDay()) % 7 || 7));
                                var before = new Date();
                                before.setDate(
                                    before.getDate() - ((1 + 7 - before.getDay()) % 7 || 7)
                                );
                                return (
                                    <Box display="flex">
                                        <IconButton>
                                            <NavigateBefore
                                                onClick={() => props.onNavigate("back", before)}
                                            ></NavigateBefore>
                                        </IconButton>
                                        <IconButton>
                                            <NavigateNext
                                                onClick={() => props.onNavigate("forward", next)}
                                            ></NavigateNext>
                                        </IconButton>
                                        {listCreatedSlot.length > 0 && (
                                            <Button onClick={saveSlots}>LƯU THAY ĐỔI</Button>
                                        )}
                                    </Box>
                                );
                            }}
                        />
                        <TodayButton
                            buttonComponent={(props) => {
                                return (
                                    <Button onClick={() => props.setCurrentDate(new Date())}>
                                        HÔM NAY
                                    </Button>
                                );
                            }}
                        />
                        <Appointments appointmentComponent={Appointment} />
                        {/* <AppointmentForm readOnly /> */}
                    </Scheduler>
                </Paper>
            </React.Fragment>
        );
    }
    return <CircularProgress />;
};

export default SlotManagement;
