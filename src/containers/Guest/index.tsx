import { useEffect, useState } from "react";

import { doc } from "firebase/firestore";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Redirect, useHistory, useParams } from "react-router";
import axios from "src/axios";
import { API_ROOT_URL } from "src/configurations";
import { db, getTokenFirebase, onMessageListener } from "src/configurations/firebase";

import VideoCallMainScreen from "../VideoCall/components/VideoCallMainScreen";
import GoogleButton from "src/components/Button/GoogleButton";

import useJoinCall from "../VideoCall/hooks/useJoinCall";
import "./index.scss";

import { DocumentData, onSnapshot } from "@firebase/firestore";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { googleProvider } from "src/hooks/useAuth";
import useVerify from "src/hooks/useVerify";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

const Guest: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [name, setName] = useState<string>("");
    const [uid, setUid] = useState<number>(0);
    const [token, setToken] = useState<string>("");
    const [slot, setSlot] = useState<string>("");
    const changeName = (name: string) => {
        setName(name);
    };
    const { mutate, isError, error } = useJoinCall();
    const { verify, displayName, email } = useVerify(changeName);
    const user = LocalStorageUtil.getUser();
    const [users, setUsers] = useState<DocumentData | undefined>(undefined);
    useEffect(() => {
        onSnapshot(doc(db, "healthcheck", id), (doc) => {
            // eslint-disable-next-line no-console
            console.log("Current data: ", doc.data());
            setUsers(doc.data());
        });
    }, [id]);
    const apply = () => {
        mutate({
            displayName: name,
            email: email,
            healthCheckId: Number(id),
            isInvited: false,
        });
    };

    onMessageListener()
        .then((payload) => {
            // eslint-disable-next-line no-console
            console.log(payload);
            if (payload.notification?.title === "Yêu cầu tham gia của bạn đã được đồng ý") {
                setUid(payload.data ? Number(payload.data["uid"]) : 0);
                setToken(payload.data ? payload.data["token"] : "");
                setSlot(payload.data ? payload.data["slot"] : "");
            }
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log("failed: ", err));

    if (user?.email) return <Redirect to={`/call/${id}`} />;

    if (uid !== 0 && token && slot) {
        return (
            <VideoCallMainScreen
                channel={`SLOT_${slot}`}
                token={token}
                appId={"834dec7fc5144086a2fe803cb3e51fff"}
                uid={uid}
                users={users}
            />
        );
    }
    if (isError && error?.response.data.message === "Waiting!") {
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
                    Đang chờ yêu cầu của bạn được xét duyệt!
                </Typography>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{ marginBottom: 3 }}
                >
                    <CountdownCircleTimer
                        isPlaying
                        duration={120}
                        colors={[
                            ["#004777", 0.33],
                            ["#F7B801", 0.33],
                            ["#A30000", 0],
                        ]}
                        // onComplete={() => }
                    >
                        {({ remainingTime }) => <RenderTime remainingTime={remainingTime || 0} />}
                    </CountdownCircleTimer>
                </Grid>
            </Box>
        );
    }

    if (email && displayName) {
        return (
            <Box
                minHeight={600}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Notifications email={email} />
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
                <Typography align="right" sx={{ marginBottom: 1 }}>
                    Email của bạn:
                </Typography>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{ marginBottom: 3 }}
                >
                    <TextField size="small" value={email} disabled />
                </Grid>
                <Box>
                    <Button
                        sx={{ minWidth: 40 }}
                        size="large"
                        onClick={() => apply()}
                        variant="contained"
                    >
                        Yêu cầu tham gia
                    </Button>
                </Box>
            </Box>
        );
    }
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
                Vui lòng xác thực với Gmail
            </Typography>
            <Box sx={{ width: 200, mt: 5 }}>
                <GoogleButton variant="outlined" fullWidth onClick={() => verify(googleProvider)}>
                    Xác thực
                </GoogleButton>
            </Box>
        </Box>
    );
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

const Notifications: React.FC<{ email: string }> = ({ email }) => {
    const [isMakeConnection, setMakeConnection] = useState<boolean>(false);
    // To load once
    useEffect(() => {
        let data;
        async function tokenFunc() {
            if (!isMakeConnection) {
                data = await getTokenFirebase();
                if (data) {
                    // eslint-disable-next-line no-console
                    console.log("Token is", data);
                    LocalStorageUtil.setItem("token_subcribe", data);
                    try {
                        const response = await axios.post(
                            `${API_ROOT_URL}/notifications/connection`,
                            {
                                token: data,
                                email: email,
                            }
                        );
                        if (response.status === 200) {
                            // eslint-disable-next-line no-console
                            console.log("OK");
                            setMakeConnection(true);
                        }
                    } catch (ex) {
                        // eslint-disable-next-line no-console
                        console.log(ex);
                    }
                } else {
                    // eslint-disable-next-line no-console
                    console.log("oh no, oh no");
                }
            }
        }

        tokenFunc();
    }, [isMakeConnection, email]);

    return <></>;
};

export default Guest;
