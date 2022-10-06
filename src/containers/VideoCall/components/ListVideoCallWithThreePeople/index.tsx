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

export interface ListVideoCallProps {
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

const ListVideoCallWithThreePeople: React.FC<ListVideoCallProps> = (props: ListVideoCallProps) => {
    const { users, tracks, trackState, anotherTrackVideos, anotherTrackAudios } = props;

    return (
        <React.Fragment>
            <Grid container sx={{ height: "48%" }} justifyContent="center">
                {tracks && (
                    <Grid item xs={6} sx={{ height: "100%" }}>
                        <Box
                            sx={{ height: "100%", width: "100%" }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Box
                                sx={{
                                    height: "100%",
                                    width: users?.length > 0 ? "90%" : "80%",
                                    position: "relative",
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
                                                    {user.email === healthCheck?.patient?.email
                                                        ? healthCheck?.patient?.name
                                                        : healthCheck?.slots &&
                                                          healthCheck?.slots.length > 0 &&
                                                          healthCheck?.slots[0].doctor?.email ===
                                                              user.email
                                                        ? healthCheck?.slots[0].doctor?.name
                                                        : user.email}
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
                                                width: 200,
                                                height: 200,
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
                                                {user.email === healthCheck?.patient?.email
                                                    ? healthCheck?.patient?.name
                                                    : healthCheck?.slots &&
                                                      healthCheck?.slots.length > 0 &&
                                                      healthCheck?.slots[0].doctor?.email ===
                                                          user.email
                                                    ? healthCheck?.slots[0].doctor?.name
                                                    : user.email}
                                            </Typography> */}
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Grid>
                )}
                {users?.length > 0 &&
                    users
                        .filter((_, index) => index === 0)
                        .map((user) => {
                            if (user.videoTrack) {
                                return (
                                    <Grid item key={user.uid} xs={6} sx={{ height: "100%" }}>
                                        <Box
                                            sx={{ height: "100%", width: "100%" }}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Box
                                                sx={{
                                                    height: "100%",
                                                    width: users?.length > 0 ? "90%" : "80%",
                                                    position: "relative",
                                                }}
                                            >
                                                {anotherTrackVideos[`${user.uid}`] ? (
                                                    <React.Fragment>
                                                        <AgoraVideoPlayer
                                                            id="video-call"
                                                            className="boder-radius"
                                                            videoTrack={user.videoTrack}
                                                            style={{
                                                                height: "100%",
                                                                width: "100%",
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
                                                                {anotherTrackAudios[
                                                                    `${user.uid}`
                                                                ] ? (
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
                                                                    {user.uid ===
                                                                    healthCheck?.patient?.email
                                                                        ? healthCheck?.patient?.name
                                                                        : healthCheck?.slots &&
                                                                          healthCheck?.slots
                                                                              .length > 0 &&
                                                                          healthCheck?.slots[0]
                                                                              .doctor?.email ===
                                                                              user.uid
                                                                        ? healthCheck?.slots[0]
                                                                              .doctor?.name
                                                                        : user.uid}
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
                                                                {user.uid ===
                                                                healthCheck?.patient?.email
                                                                    ? healthCheck?.patient?.name
                                                                    : healthCheck?.slots &&
                                                                      healthCheck?.slots.length >
                                                                          0 &&
                                                                      healthCheck?.slots[0].doctor
                                                                          ?.email === user.uid
                                                                    ? healthCheck?.slots[0].doctor
                                                                          ?.name
                                                                    : user.uid}
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
                                    <Grid item key={user.uid} xs={6} sx={{ height: "100%" }}>
                                        <Box
                                            sx={{ height: "100%", width: "100%" }}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Box
                                                sx={{
                                                    height: "100%",
                                                    width: users?.length > 0 ? "90%" : "80%",
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
                                                            {user.uid ===
                                                            healthCheck?.patient?.email
                                                                ? healthCheck?.patient?.name
                                                                : healthCheck?.slots &&
                                                                  healthCheck?.slots.length > 0 &&
                                                                  healthCheck?.slots[0].doctor
                                                                      ?.email === user.uid
                                                                ? healthCheck?.slots[0].doctor?.name
                                                                : user.uid}
                                                        </Typography> */}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                );
                        })}
            </Grid>
            <Box height="4%" />
            <Grid container sx={{ height: "48%" }} justifyContent="center">
                {users?.length > 0 &&
                    users
                        .filter((_, index) => index !== 0)
                        .map((user) => {
                            if (user.videoTrack) {
                                return (
                                    <Grid item key={user.uid} xs={6} sx={{ height: "100%" }}>
                                        <Box
                                            sx={{ height: "100%", width: "100%" }}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Box
                                                sx={{
                                                    height: "100%",
                                                    width: users?.length > 0 ? "90%" : "80%",
                                                    position: "relative",
                                                }}
                                            >
                                                {anotherTrackVideos[`${user.uid}`] ? (
                                                    <React.Fragment>
                                                        <AgoraVideoPlayer
                                                            id="video-call"
                                                            className="boder-radius"
                                                            videoTrack={user.videoTrack}
                                                            style={{
                                                                height: "100%",
                                                                width: "100%",
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
                                                                {anotherTrackAudios[
                                                                    `${user.uid}`
                                                                ] ? (
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
                                                                    {user.uid ===
                                                                    healthCheck?.patient?.email
                                                                        ? healthCheck?.patient?.name
                                                                        : healthCheck?.slots &&
                                                                          healthCheck?.slots
                                                                              .length > 0 &&
                                                                          healthCheck?.slots[0]
                                                                              .doctor?.email ===
                                                                              user.uid
                                                                        ? healthCheck?.slots[0]
                                                                              .doctor?.name
                                                                        : user.uid}
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
                                                                {user.uid ===
                                                                healthCheck?.patient?.email
                                                                    ? healthCheck?.patient?.name
                                                                    : healthCheck?.slots &&
                                                                      healthCheck?.slots.length >
                                                                          0 &&
                                                                      healthCheck?.slots[0].doctor
                                                                          ?.email === user.uid
                                                                    ? healthCheck?.slots[0].doctor
                                                                          ?.name
                                                                    : user.uid}
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
                                    <Grid item key={user.uid} xs={6} sx={{ height: "100%" }}>
                                        <Box
                                            sx={{ height: "100%", width: "100%" }}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Box
                                                sx={{
                                                    height: "100%",
                                                    width: users?.length > 0 ? "90%" : "80%",
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
                                                            {user.uid ===
                                                            healthCheck?.patient?.email
                                                                ? healthCheck?.patient?.name
                                                                : healthCheck?.slots &&
                                                                  healthCheck?.slots.length > 0 &&
                                                                  healthCheck?.slots[0].doctor
                                                                      ?.email === user.uid
                                                                ? healthCheck?.slots[0].doctor?.name
                                                                : user.uid}
                                                        </Typography> */}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                );
                        })}
            </Grid>
        </React.Fragment>
    );
};

export default ListVideoCallWithThreePeople;
