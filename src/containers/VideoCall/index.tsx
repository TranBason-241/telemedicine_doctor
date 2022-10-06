import "react";
import { useEffect, useState } from "react";
import React from "react";

import { doc, onSnapshot, DocumentData } from "firebase/firestore";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useHistory, useParams } from "react-router";
import { db, onMessageListener } from "src/configurations/firebase";

import VideoCallMainScreen from "./components/VideoCallMainScreen";

import useAcceptRequest from "../InviteList/hooks/useAcceptRequest";
import useGetCallByID from "./hooks/useGetCallById";
import useJoinCall from "./hooks/useJoinCall";
import "./index.scss";

import { Cancel, Check } from "@mui/icons-material";
import {
    Box,
    Typography,
    Button,
    TextField,
    CircularProgress,
    Grid,
    IconButton,
    Divider,
    Card,
    CssBaseline,
} from "@mui/material";
import { Account } from "src/common/models/Account.model";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

const VideoCallApp: React.FC<{ uid: number | undefined }> = (props) => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useGetCallByID(id);
    const [users, setUsers] = useState<DocumentData | undefined>(undefined);
    useEffect(() => {
        onSnapshot(doc(db, "healthcheck", id), (doc) => {
            if (doc.exists()) {
                // eslint-disable-next-line no-console
                console.log("Current data: ", doc.data());
                setUsers(doc.data());
            } else {
                history.push("/");
                window.location.reload();
            }
        });
    }, [id, history]);
    if (isLoading) {
        return (
            <Box
                minHeight={600}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <img
                    alt="loading"
                    width={200}
                    height={200}
                    src="https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg"
                />
                <Typography variant="h5" align="center" sx={{ marginBottom: 1, marginTop: 1 }}>
                    Chờ chút
                </Typography>
                <Typography variant="subtitle1" align="center" sx={{ marginBottom: 1 }}>
                    Hệ thống đang kết nối bạn tới phòng khám online!
                </Typography>
            </Box>
        );
    } else if (isError) {
        return (
            <Box
                minHeight={600}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <img
                    alt="sorry"
                    width={200}
                    height={200}
                    src="https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg"
                />
                <Typography variant="h5" align="center" sx={{ marginBottom: 1, marginTop: 1 }}>
                    Xin lỗi
                </Typography>
                <Typography variant="subtitle1" align="center" sx={{ marginBottom: 1 }}>
                    Hiện tại bạn không thể tham gia vào cuộc gọi này!
                </Typography>
                <Box>
                    <Button onClick={() => history.goBack()} variant="contained">
                        Trở lại
                    </Button>
                </Box>
            </Box>
        );
    } else {
        if (data && data.token && data.slots && data.slots.length > 0) {
            return (
                <VideoCallMainScreen
                    channel={data.slots && `SLOT_${data.slots[0].id}`}
                    token={data.token}
                    appId={"834dec7fc5144086a2fe803cb3e51fff"}
                    healthCheck={data}
                    uid={props.uid}
                    users={users}
                />
            );
        } else {
            return (
                <Box
                    minHeight={600}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <img
                        alt="sorry"
                        width={200}
                        height={200}
                        src="https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg"
                    />
                    <Typography variant="h5" align="center" sx={{ marginBottom: 1, marginTop: 1 }}>
                        Xin lỗi
                    </Typography>
                    <Typography variant="subtitle1" align="center" sx={{ marginBottom: 1 }}>
                        Hiện tại bạn không thể tham gia vào cuộc gọi này!
                    </Typography>
                    <Box>
                        <Button onClick={() => history.goBack()} variant="contained">
                            Trở lại
                        </Button>
                    </Box>
                </Box>
            );
        }
    }
};

const RenderTime: React.FC<{ remainingTime: number }> = ({ remainingTime }) => {
    const history = useHistory();

    if (remainingTime === 0) {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Button variant="contained" onClick={() => history.goBack()}>
                    Quay về
                </Button>
            </Box>
        );
    }

    return (
        <div className="timer">
            <div className="text">Remaining</div>
            <div className="value">
                {pad(Math.floor(remainingTime / 60), 2)}:
                {pad(remainingTime - Math.floor(remainingTime / 60) * 60, 2)}
            </div>
        </div>
    );
};

function pad(num: number, size: number) {
    let numString = num.toString();
    while (numString.length < size) numString = "0" + num;
    return numString;
}

const VideoCall = () => {
    const { id } = useParams<{ id: string }>();
    const user = LocalStorageUtil.getItem("user") as Account;
    const [canJoin, setCanJoin] = useState(false);
    const { mutate, isSuccess, isLoading, isError, data, error } = useJoinCall();
    const { mutate: mutateAccept } = useAcceptRequest();
    const [name, setName] = useState<string>(user.firstName + " " + user.lastName);
    const [uid, setUid] = useState<number>(0);
    const [request, setRequest] = useState<
        Array<{
            name?: string;
            email?: string;
            token?: string;
            slot?: number;
            healthCheckId?: string;
        }>
    >([]);
    onMessageListener()
        .then((payload) => {
            // eslint-disable-next-line no-console
            console.log(payload);
            if (payload.notification?.title === "Yêu cầu tham gia của bạn đã được đồng ý") {
                setUid(payload.data ? Number(payload.data["uid"]) : 0);
                setCanJoin(true);
            }
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
    const apply = () => {
        mutate({
            displayName: name,
            email: user.email,
            healthCheckId: Number(id),
            isInvited: false,
        });
        setCanJoin(false);
    };
    const accept = (
        name: string,
        email: string,
        token: string,
        healthCheckId: string,
        slot: number
    ) => {
        mutateAccept({
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
    if (uid !== 0) {
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
                <VideoCallApp uid={uid} />
            </Box>
        );
    }
    if (isSuccess) {
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
                <VideoCallApp uid={data?.uid} />
            </Box>
        );
    }
    if (isError && error?.response.data.message === "Waiting!") {
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
                <Box
                    minHeight={600}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <img
                        alt="sorry"
                        width={200}
                        height={200}
                        src="https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg"
                    />
                    <Typography variant="h5" align="center" sx={{ marginBottom: 1, marginTop: 1 }}>
                        Đang chờ yêu cầu của bạn được xét duyệt!
                    </Typography>
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        sx={{ marginBottom: 3 }}
                    >
                        <CountdownCircleTimer
                            isPlaying={!canJoin}
                            duration={120}
                            colors={[
                                ["#004777", 0.33],
                                ["#F7B801", 0.33],
                                ["#A30000", 0],
                            ]}
                            // onComplete={() => }
                        >
                            {({ remainingTime }) => (
                                <RenderTime remainingTime={remainingTime || 0} />
                            )}
                        </CountdownCircleTimer>
                    </Grid>

                    <Box>
                        <Button
                            sx={{ minWidth: 40 }}
                            size="large"
                            onClick={() => apply()}
                            variant="contained"
                            disabled={!canJoin}
                        >
                            {!isLoading ? (
                                "Bắt đầu tham gia"
                            ) : (
                                <Box
                                    sx={{
                                        minWidth: 160,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <CircularProgress size={20} color="warning" />
                                </Box>
                            )}
                        </Button>
                    </Box>
                </Box>
            </Box>
        );
    }
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
            <Box
                minHeight={600}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <img
                    alt="sorry"
                    width={200}
                    height={200}
                    src="https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg"
                />
                <Typography variant="h5" align="center" sx={{ marginBottom: 1, marginTop: 1 }}>
                    Chọn tên để tham gia vào phòng!
                </Typography>
                <Typography align="right" sx={{ marginBottom: 1 }}>
                    Tên của bạn:
                </Typography>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{ marginBottom: 3 }}
                >
                    <TextField
                        size="small"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>

                <Box>
                    <Button
                        sx={{ minWidth: 40 }}
                        size="large"
                        onClick={() => apply()}
                        variant="contained"
                    >
                        {!isLoading ? (
                            "Bắt đầu tham gia"
                        ) : (
                            <Box
                                sx={{
                                    minWidth: 160,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <CircularProgress size={20} color="warning" />
                            </Box>
                        )}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default VideoCall;
