import React, { useCallback, useEffect, useState } from "react";

import ChartLabel from "./components/ChartLabel";
import NextAppointment from "./components/NextAppointment";
import TotalAppointments from "./components/TotalAppointments";
import UpcomingAppointments from "./components/UpcomingAppointments";

import DoctorService from "../../containers/DoctorProfile/services/Doctor.service";
import { Doctor } from "../DoctorProfile/models/Doctor.model";
import { HealthCheck } from "../HealthCheckList/models/HealthCheck.model";
import HealthCheckService from "../HealthCheckList/services/HealthCheck.service";

import { Grid, Card, CardHeader, Divider, CardContent, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

const Dashboard: React.FC = () => {
    const [doctor, setDoctor] = useState<Doctor>();
    const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState<HealthCheck[]>([]);
    const [nextAppointment, setNextAppointment] = useState<HealthCheck>();
    const [completedHealthCheckQuantity, setCompletedHealthCheckQuantity] = useState<number>(0);
    const [bookedHealthCheckQuantity, setBookedHealthCheckQuantity] = useState<number>(0);
    const [cancelledHealthCheckQuantity, setCancelledHealthCheckQuantity] = useState<number>(0);
    const [totalHCInMonth, setTotalHCInMonth] = useState<number>(0);
    const [completedHCInMonth, setCompletedHCInMonth] = useState<number>(0);
    const [totalHCEachMonth, setTotalHCEachMonth] = useState<number[]>([]);
    const [totalHCEachSlot, setTotalHCEachSlot] = useState<number[]>([]);

    const currentMonth = new Date().getMonth();

    const doughnutData = {
        datasets: [
            {
                data: [
                    completedHealthCheckQuantity,
                    bookedHealthCheckQuantity,
                    cancelledHealthCheckQuantity,
                ],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 99, 132, 1)",
                ],
                borderWidth: 1,
            },
        ],
        labels: ["Thành công", "Chưa tiến hành", "Đã hủy"],
    };

    const lineData = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        datasets: [
            {
                label: "buổi tư vấn",
                data: totalHCEachMonth,
                fill: false,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgba(255, 99, 132, 0.2)",
            },
        ],
    };

    const barData = {
        labels: [
            "8:00",
            "9:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
        ],
        datasets: [
            {
                label: "buổi tư vấn",
                data: totalHCEachSlot,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                barThickness: 4,
                fill: true,
            },
        ],
    };

    const doughnutOptions = {
        plugins: {
            legend: {
                display: false,
                // position: "bottom" as "bottom",
            },
        },
    };

    const lineOptions = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const getDoctorByEmail = useCallback(async () => {
        try {
            const user = LocalStorageUtil.getUser();
            const email = user.email;

            const service = new DoctorService<Doctor>();
            const response = await service.getDoctorByEmail(email);

            if (response.status === 200) {
                setDoctor(response.data);
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    }, []);

    const init = useCallback(async (doctorId) => {
        try {
            const service = new HealthCheckService<HealthCheck>();
            const response = await service.getAllByDoctorId(doctorId, 100, 1);

            if (response.status === 200) {
                setHealthChecks(response.data.content);
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    }, []);

    const countHealthCheckByStatus = useCallback(() => {
        let countCompleted = 0;
        let countBooked = 0;
        let countCancelled = 0;
        let upcomingHealthChecks: HealthCheck[] = [];

        healthChecks.forEach((healthCheck) => {
            if (healthCheck.status === "COMPLETED") {
                countCompleted++;
            }
            if (healthCheck.status === "BOOKED") {
                countBooked++;
                upcomingHealthChecks.push(healthCheck);
            }
            if (healthCheck.status === "CANCELED") {
                countCancelled++;
            }
        });

        setCompletedHealthCheckQuantity(countCompleted);
        setBookedHealthCheckQuantity(countBooked);
        setCancelledHealthCheckQuantity(countCancelled);

        setNextAppointment(upcomingHealthChecks.shift());
        setUpcomingAppointments(upcomingHealthChecks);
    }, [healthChecks]);

    const countTotalHealthChecksInCurrentMonth = useCallback(() => {
        let countTotal = 0;
        let countCompleted = 0;

        healthChecks.forEach((item) => {
            const assignedDate = new Date(item.slots[0].assignedDate);

            if (assignedDate.getMonth() === currentMonth) {
                countTotal++;
                if (item.status === "COMPLETED") {
                    countCompleted++;
                }
            }
        });

        setTotalHCInMonth(countTotal);
        setCompletedHCInMonth(countCompleted);
    }, [healthChecks, currentMonth]);

    const calDataForLineAndBarChart = useCallback(() => {
        const lineChartData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const barChartData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        healthChecks.forEach((item) => {
            const assignedDate = new Date(item.slots[0].assignedDate);
            lineChartData[assignedDate.getMonth()]++;

            const startTime = +item.slots[0].startTime.slice(0, 2);
            barChartData[startTime - 8]++;
        });

        setTotalHCEachMonth(lineChartData);
        setTotalHCEachSlot(barChartData);
    }, [healthChecks]);

    useEffect(() => {
        getDoctorByEmail();
    }, [getDoctorByEmail]);

    useEffect(() => {
        // getDoctorByEmail();
        init(doctor?.id);
    }, [init, doctor]);

    useEffect(() => {
        countHealthCheckByStatus();
        countTotalHealthChecksInCurrentMonth();
        calDataForLineAndBarChart();
    }, [countHealthCheckByStatus, countTotalHealthChecksInCurrentMonth, calDataForLineAndBarChart]);

    return (
        <Grid container spacing={2}>
            <Grid container item lg={8} spacing={2}>
                <Grid item lg={6}>
                    <NextAppointment healthCheck={nextAppointment} />
                </Grid>
                {/* Statistic of the number of appointments */}
                <Grid item lg={3}>
                    <Card sx={{ width: "100%", height: "100%" }}>
                        <CardHeader
                            title="Tổng lịch hẹn"
                            titleTypographyProps={{ variant: "h6" }}
                        />
                        <CardContent>
                            {healthChecks.length === 0 ? (
                                <Typography component="div" align="center">
                                    <Box sx={{ p: 1, fontSize: 18 }}>Chưa có dữ liệu</Box>
                                </Typography>
                            ) : (
                                <React.Fragment>
                                    <Doughnut data={doughnutData} options={doughnutOptions} />
                                    <Stack spacing={1} sx={{ pt: 3 }}>
                                        <ChartLabel
                                            height={15}
                                            width={45}
                                            backgroundColor="rgba(75, 192, 192, 0.2)"
                                            border="1px solid rgba(75, 192, 192, 1)"
                                            lableText="Đã thành công"
                                        />
                                        <ChartLabel
                                            height={15}
                                            width={45}
                                            backgroundColor="rgba(54, 162, 235, 0.2)"
                                            border="1px solid rgba(54, 162, 235, 1)"
                                            lableText="Chưa tiến hành"
                                        />
                                        <ChartLabel
                                            height={15}
                                            width={45}
                                            backgroundColor="rgba(255, 99, 132, 0.2)"
                                            border="1px solid rgba(255, 99, 132, 1)"
                                            lableText="Đã hủy"
                                        />
                                    </Stack>
                                </React.Fragment>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid container item lg={3} spacing={2}>
                    <Grid item xs={12}>
                        <TotalAppointments
                            title={`Trong tháng ${currentMonth + 1}`}
                            value={totalHCInMonth}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TotalAppointments title="Đã hoàn thành" value={completedHCInMonth} />
                    </Grid>
                </Grid>
                <Grid item lg={6}>
                    <Card sx={{ width: "100%" }}>
                        <CardHeader
                            title="Thống kê theo tháng"
                            titleTypographyProps={{ variant: "h6" }}
                        />
                        <Divider />
                        <CardContent>
                            <Line data={lineData} options={lineOptions} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={6}>
                    <Card sx={{ width: "100%" }}>
                        <CardHeader
                            title="Thống kê theo khung giờ"
                            titleTypographyProps={{ variant: "h6" }}
                        />
                        <Divider />
                        <CardContent>
                            <Bar data={barData} options={lineOptions} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid item lg={4}>
                <UpcomingAppointments healthChecks={upcomingAppointments} />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
