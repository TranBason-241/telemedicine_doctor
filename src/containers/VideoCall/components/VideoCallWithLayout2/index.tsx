import React from "react";

import {
    IMicrophoneAudioTrack,
    ICameraVideoTrack,
    AgoraVideoPlayer,
    IAgoraRTCRemoteUser,
} from "agora-rtc-react";
import { DocumentData } from "firebase/firestore";

import { HealthCheck } from "../../models/VideoCall.model";
import "./index.scss";

import { MicOffOutlined } from "@mui/icons-material";
import MicNoneIcon from "@mui/icons-material/MicNoneRounded";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

export interface VideoCallWithLayout2 {
    users: IAgoraRTCRemoteUser[];
    tracks: [IMicrophoneAudioTrack, ICameraVideoTrack] | null;
    trackState: {
        video: boolean;
        audio: boolean;
    };
    anotherTrackVideos: Record<string, boolean>;
    anotherTrackAudios: Record<string, boolean>;
    healthCheck?: HealthCheck;
    uid?: number;
    userNames?: DocumentData;
}
const VideoCallWithLayout2: React.FC<VideoCallWithLayout2> = (props: VideoCallWithLayout2) => {
    const { users, tracks, trackState, anotherTrackVideos, anotherTrackAudios } = props;

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                position: "relative",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    width: 350,
                    height: 200,
                    bottom: 20,
                    right: 20,
                    zIndex: 1000,
                    cursor: "pointer",
                }}
            >
                {tracks && (
                    <React.Fragment>
                        <Box
                            sx={{ height: "100%", width: "100%", cursor: "pointer" }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Box
                                sx={{
                                    height: "100%",
                                    width: "80%",
                                    position: "relative",
                                    cursor: "pointer",
                                }}
                            >
                                {trackState.video ? (
                                    <React.Fragment>
                                        <AgoraVideoPlayer
                                            className="boder-radius"
                                            videoTrack={tracks[1]}
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                                position: "absolute",
                                                borderRadius: "20px",
                                                cursor: "pointer",
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                height: "100%",
                                                width: "100%",
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                backgroundColor: "transparent",
                                                zIndex: 2000,
                                                cursor: "pointer",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    bottom: 6,
                                                    left: 10,
                                                    display: "flex",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {trackState.audio ? (
                                                    <MicNoneIcon sx={{ color: "white" }} />
                                                ) : (
                                                    <MicOffOutlined sx={{ color: "white" }} />
                                                )}
                                                <Typography color="white" variant="subtitle1">
                                                    {props.userNames &&
                                                        props.userNames[`${props.uid}` || "0"]}
                                                </Typography>
                                                {/* <Typography color="white" variant="subtitle1">
                                                    Bs.{" "}
                                                    {healthCheck?.slots &&
                                                        healthCheck?.slots[0].doctor?.name}
                                                </Typography> */}
                                            </Box>
                                        </Box>
                                    </React.Fragment>
                                ) : (
                                    <Box
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            border: "2px solid grey",
                                            borderRadius: "10px",
                                            position: "relative",
                                            backgroundColor: "black",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                bgcolor: deepOrange[500],
                                                width: 100,
                                                height: 100,
                                                cursor: "pointer",
                                            }}
                                            src={
                                                "https://e7.pngegg.com/pngimages/340/946/png-clipart-avatar-user-computer-icons-software-developer-avatar-child-face-thumbnail.png"
                                            }
                                        >
                                            {/* <Typography fontSize={100}>B</Typography> */}
                                        </Avatar>
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                bottom: 6,
                                                left: 10,
                                                display: "flex",
                                                cursor: "pointer",
                                            }}
                                        >
                                            {trackState.audio ? (
                                                <MicNoneIcon sx={{ color: "white" }} />
                                            ) : (
                                                <MicOffOutlined sx={{ color: "white" }} />
                                            )}
                                            <Typography color="white" variant="subtitle1">
                                                {props.userNames &&
                                                    props.userNames[`${props.uid}` || "0"]}
                                            </Typography>
                                            {/* <Typography color="white" variant="subtitle1">
                                                Bs.{" "}
                                                {healthCheck?.slots &&
                                                    healthCheck?.slots[0].doctor?.name}
                                            </Typography> */}
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
            <Grid container sx={{ height: "100%" }}>
                {users?.length > 0 &&
                    users.map((user) => {
                        if (user.videoTrack) {
                            return (
                                <Grid item key={user.uid} xs={12} sx={{ height: "100%" }}>
                                    <Box
                                        sx={{ height: "100%", width: "100%" }}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Box
                                            sx={{
                                                height: "100%",
                                                width: "80%",
                                                position: "relative",
                                            }}
                                        >
                                            {anotherTrackVideos[`${user.uid}`] ? (
                                                <React.Fragment>
                                                    <AgoraVideoPlayer
                                                        id="video-call"
                                                        className="boder-radius"
                                                        videoTrack={user.videoTrack}
                                                        style={{ height: "100%", width: "100%" }}
                                                    />
                                                    <Box
                                                        sx={{
                                                            height: "100%",
                                                            width: "100%",
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            backgroundColor: "transparent",
                                                            zIndex: 2000,
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                position: "absolute",
                                                                bottom: 6,
                                                                left: 10,
                                                                display: "flex",
                                                            }}
                                                        >
                                                            {anotherTrackAudios[`${user.uid}`] ? (
                                                                <MicNoneIcon
                                                                    sx={{ color: "white" }}
                                                                />
                                                            ) : (
                                                                <MicOffOutlined
                                                                    sx={{ color: "white" }}
                                                                />
                                                            )}
                                                            <Typography
                                                                color="white"
                                                                variant="subtitle1"
                                                            >
                                                                {props.userNames &&
                                                                    props.userNames[
                                                                        `${user.uid}` || "0"
                                                                    ]}
                                                            </Typography>
                                                            {/* <Typography
                                                                color="white"
                                                                variant="subtitle1"
                                                            >
                                                                {healthCheck?.patient?.name}
                                                            </Typography> */}
                                                        </Box>
                                                    </Box>
                                                </React.Fragment>
                                            ) : (
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        height: "100%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        border: "2px solid grey",
                                                        borderRadius: "10px",
                                                        position: "relative",
                                                    }}
                                                >
                                                    <Avatar
                                                        sx={{
                                                            bgcolor: deepOrange[500],
                                                            width: 200,
                                                            height: 200,
                                                        }}
                                                        src={
                                                            "https://e7.pngegg.com/pngimages/340/946/png-clipart-avatar-user-computer-icons-software-developer-avatar-child-face-thumbnail.png"
                                                        }
                                                    ></Avatar>
                                                    <Box
                                                        sx={{
                                                            position: "absolute",
                                                            bottom: 6,
                                                            left: 10,
                                                            display: "flex",
                                                        }}
                                                    >
                                                        {anotherTrackAudios[`${user.uid}`] ? (
                                                            <MicNoneIcon sx={{ color: "white" }} />
                                                        ) : (
                                                            <MicOffOutlined
                                                                sx={{ color: "white" }}
                                                            />
                                                        )}
                                                        <Typography
                                                            color="white"
                                                            variant="subtitle1"
                                                        >
                                                            {props.userNames &&
                                                                props.userNames[
                                                                    `${user.uid}` || "0"
                                                                ]}
                                                        </Typography>
                                                        {/* <Typography
                                                            color="white"
                                                            variant="subtitle1"
                                                        >
                                                            {healthCheck?.patient?.name}
                                                        </Typography> */}
                                                    </Box>
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>
                                </Grid>
                            );
                        } else
                            return (
                                <Grid item key={user.uid} xs={12} sx={{ height: "100%" }}>
                                    <Box
                                        sx={{ height: "100%", width: "100%" }}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Box
                                            sx={{
                                                height: "100%",
                                                width: "80%",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    border: "2px solid grey",
                                                    borderRadius: "10px",
                                                    position: "relative",
                                                }}
                                            >
                                                <Avatar
                                                    sx={{
                                                        bgcolor: deepOrange[500],
                                                        width: 200,
                                                        height: 200,
                                                    }}
                                                    src={
                                                        "https://e7.pngegg.com/pngimages/340/946/png-clipart-avatar-user-computer-icons-software-developer-avatar-child-face-thumbnail.png"
                                                    }
                                                ></Avatar>
                                                <Box
                                                    sx={{
                                                        position: "absolute",
                                                        bottom: 6,
                                                        left: 10,
                                                        display: "flex",
                                                    }}
                                                >
                                                    {anotherTrackAudios[`${user.uid}`] ? (
                                                        <MicNoneIcon sx={{ color: "white" }} />
                                                    ) : (
                                                        <MicOffOutlined sx={{ color: "white" }} />
                                                    )}
                                                    <Typography color="white" variant="subtitle1">
                                                        {props.userNames &&
                                                            props.userNames[`${user.uid}` || "0"]}
                                                    </Typography>
                                                    {/* <Typography color="white" variant="subtitle1">
                                                        {healthCheck?.patient?.name}
                                                    </Typography> */}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                            );
                    })}
            </Grid>
        </Box>
    );
};

export default VideoCallWithLayout2;
