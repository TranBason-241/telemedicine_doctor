import React, { useCallback, useEffect, useState } from "react";

import moment from "moment";

import HealthCheckDetail from "./components/HealthCheckDetail";

import { Account } from "../AccountForm/models/Account.model";
import AccountService from "../AccountForm/services/Account.service";
import useGetDoctor from "../DoctorProfile/hooks/useGetDoctor";
import useGetHealthCheck from "./hooks/useGetHealthCheck";
import { HealthCheck, Order } from "./models/HealthCheck.model";
import HealthCheckService from "./services/HealthCheck.service";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
    Avatar,
    Card,
    Chip,
    CircularProgress,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

const HealthCheckListing: React.FC = () => {
    const { isLoading, isError } = useGetHealthCheck();
    const [searchTerm, setSearchTerm] = useState("");
    const [dataHealth, setDataHealth] = useState<HealthCheck[]>([]);
    const [order, setOrder] = useState<Order>("desc");
    const user = LocalStorageUtil.getItem("user") as Account;
    const { data } = useGetDoctor(user.email);
    const [selectedHealthCheck, setSelectedHealthCheck] = useState<HealthCheck>();
    const [selectedPatientAccount, setSelectedPatientAccount] = useState<Account>();
    const [arrow, setArrow] = useState<boolean>(false);
    const getHealthCheck = useCallback(
        async (limit: number, offset: number, order: string, doctorId: number) => {
            let healthCheckService = new HealthCheckService<HealthCheck>();
            const response = await healthCheckService.getBy(limit, offset, order, doctorId);
            if (response.status === 200) {
                setDataHealth(response.data.content);
            }
        },
        []
    );

    const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    const getPatientAccount = async (email: string) => {
        try {
            const service = new AccountService<Account>();
            const response = await service.getAccountByEmail(email);
            if (response.status === 200) {
                setSelectedPatientAccount(response.data);
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    };

    const selectedHealthCheckHandler = (healthCheck: HealthCheck) => {
        getPatientAccount(healthCheck.patient.email);
        setSelectedHealthCheck(healthCheck);
    };

    useEffect(() => {
        if (data?.id) {
            getHealthCheck(20, 1, order, data?.id);
        }
    }, [getHealthCheck, order, data?.id]);

    if (isError) {
        return <div>error</div>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Card sx={{ overflow: "auto", height: 640 }}>
                    <Box sx={{ display: "flex", mb: 5, mt: 1, justifyContent: "space-between" }}>
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="h6">Danh sách lịch khám</Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <IconButton
                                onClick={() => {
                                    setArrow(!arrow);
                                    if (arrow) {
                                        setOrder("desc");
                                    } else {
                                        setOrder("asc");
                                    }
                                }}
                            >
                                {arrow ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                            </IconButton>
                            <form>
                                <TextField
                                    label="Search input"
                                    type="text"
                                    variant="outlined"
                                    value={searchTerm}
                                    onChange={handleSearchTermChange}
                                />
                            </form>
                        </Box>
                    </Box>

                    {dataHealth.length === 0 ? (
                        <Typography component="div" align="center">
                            <Box sx={{ p: 1, fontSize: 18 }}>Chưa lịch hẹn</Box>
                        </Typography>
                    ) : (
                        <React.Fragment>
                            <List
                                sx={{
                                    width: "100%",
                                    "& ul": { padding: 0 },
                                }}
                            >
                                {dataHealth?.map((item) => (
                                    <>
                                        <ListItem key={item.id}>
                                            <Box
                                                sx={{
                                                    borderRadius: 2,
                                                    bgcolor: "#fafafa",
                                                    width: "100%",
                                                    display: "flex",
                                                }}
                                            >
                                                <ListItemAvatar sx={{ m: 2 }}>
                                                    <Avatar
                                                        alt="alt"
                                                        src={item.patient?.avatar}
                                                        sx={{ width: 56, height: 56 }}
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={item.patient?.name}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                sx={{ display: "block" }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {item.patient?.backgroundDisease}
                                                            </Typography>
                                                            <Typography
                                                                sx={{ display: "block" }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                Ngày{" "}
                                                                {moment(item?.createdTime).format(
                                                                    "DD-MM-YYYY"
                                                                )}
                                                            </Typography>
                                                        </React.Fragment>
                                                    }
                                                />
                                                <Box
                                                    sx={{
                                                        mt: 4,
                                                        mr: 3,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        justifyItems: "center",
                                                    }}
                                                >
                                                    <Chip
                                                        sx={{ width: 100 }}
                                                        label={item?.status}
                                                        size="small"
                                                        color={
                                                            item?.status === "COMPLETED"
                                                                ? "success"
                                                                : "error"
                                                        }
                                                    />
                                                </Box>
                                                <Box sx={{ mt: 3, mr: 3 }}>
                                                    <IconButton
                                                        onClick={() =>
                                                            selectedHealthCheckHandler(item)
                                                        }
                                                    >
                                                        <ArrowForwardIosIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </ListItem>
                                    </>
                                ))}
                            </List>
                        </React.Fragment>
                    )}
                </Card>
            </Grid>
            <Grid item xs={6}>
                <HealthCheckDetail
                    healthCheck={selectedHealthCheck}
                    patientAccount={selectedPatientAccount}
                />
            </Grid>
        </Grid>
    );
};

export default HealthCheckListing;
