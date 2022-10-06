import * as React from "react";

import { onMessageListener } from "src/configurations/firebase";

import useAcceptRequest from "./hooks/useAcceptRequest";

import { Cancel, Check } from "@mui/icons-material";
import { Box, Card, CssBaseline, Divider, Grid, IconButton, Typography } from "@mui/material";

const InviteList: React.FC<{ children?: React.ReactNode }> = ({
    children,
}: {
    children?: React.ReactNode;
}) => {
    const [request, setRequest] = React.useState<
        Array<{
            name?: string;
            email?: string;
            token?: string;
            slot?: number;
            healthCheckId?: string;
        }>
    >([]);
    const { mutate } = useAcceptRequest();
    onMessageListener()
        .then((payload) => {
            // eslint-disable-next-line no-console
            console.log(payload);
            if (payload.notification?.title === "Có một yêu cầu tham gia cuộc họp!") {
                setRequest((prev) => {
                    if (
                        prev.findIndex((x) => payload.data && x.email === payload.data["email"]) !==
                        -1
                    ) {
                        return [...prev];
                    } else {
                        return [
                            ...prev,
                            {
                                name: payload.data && payload.data["name"],
                                email: payload.data && payload.data["email"],
                                token: payload.data && payload.data["token"],
                                slot: payload.data ? Number(payload.data["slot"]) : 0,
                                healthCheckId: payload.data && payload.data["id"],
                            },
                        ];
                    }
                });
            }
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log("failed: ", err));

    React.useEffect(() => {
        // eslint-disable-next-line no-console
        console.log(request);
    }, [request]);
    const accept = (
        name: string,
        email: string,
        token: string,
        healthCheckId: string,
        slot: number
    ) => {
        mutate({
            healthCheckId: healthCheckId,
            slot: slot,
            displayName: name,
            email: email,
            token: token,
        });
        setRequest((prev) => {
            return prev.filter((x) => x.email !== email);
        });
    };
    const cancel = (email: string) => {
        setRequest((prev) => {
            return prev.filter((x) => x.email !== email);
        });
    };

    return (
        <Box>
            <CssBaseline />
            {request?.length > 0 && (
                <Box
                    sx={{
                        width: "400px",
                        minHeight: "200px",
                        position: "absolute",
                        top: "50px",
                        left: "50%",
                        transform: "translate(-50%, 0)",
                        zIndex: 4000,
                    }}
                >
                    <Card>
                        <Typography align="center">Yêu cầu tham gia</Typography>
                        <Divider></Divider>
                        {request?.map((x, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Grid container width="100%">
                                        <Grid xs={1} item></Grid>
                                        <Grid xs={7} item alignItems="center" container>
                                            {x?.name || ""}
                                        </Grid>
                                        <Grid xs={4} item>
                                            <IconButton
                                                color="success"
                                                onClick={() =>
                                                    accept(
                                                        x?.name || "",
                                                        x?.email || "",
                                                        x?.token || "",
                                                        x?.healthCheckId || "",
                                                        x?.slot || 0
                                                    )
                                                }
                                            >
                                                <Check />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => cancel(x?.email || "")}
                                            >
                                                <Cancel />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Divider></Divider>
                                </React.Fragment>
                            );
                        })}
                    </Card>
                </Box>
            )}
            {children}
        </Box>
    );
};

export default InviteList;
