import React, { useEffect, useState } from "react";

import { IAgoraRTCRemoteUser } from "agora-rtc-react";
import { DocumentData } from "firebase/firestore";

import { HealthCheck } from "../../models/VideoCall.model";
import { useClient, useMicrophoneAndCameraTracks } from "../../setting";
import VideoCall from "../VideoCall";

export interface VideoCallMainScreenProps {
    appId: string;
    token: string;
    channel: string;
    healthCheck?: HealthCheck;
    uid?: number;
    users?: DocumentData;
}

const VideoCallMainScreen: React.FC<VideoCallMainScreenProps> = (
    props: VideoCallMainScreenProps
) => {
    const { appId, channel, token, healthCheck, uid } = props;

    const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
    const [start, setStart] = useState(false);
    const client = useClient();
    const { ready, tracks } = useMicrophoneAndCameraTracks();

    const [anotherTrackAudios, setAnotherTrackAudios] = useState<Record<string, boolean>>({});

    const [anotherTrackVideos, setAnotherTrackVideos] = useState<Record<string, boolean>>({});

    useEffect(() => {
        let init = async (name: string) => {
            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                if (mediaType === "video") {
                    // eslint-disable-next-line no-console
                    console.log("dmmmm");
                    // eslint-disable-next-line no-console
                    console.log(user);
                    setUsers((prevUsers) => {
                        if (prevUsers.findIndex((x) => x.uid === user.uid) === -1) {
                            return [...prevUsers, user];
                        }
                        return [...prevUsers];
                    });
                    setAnotherTrackAudios((prev) => {
                        return { ...prev, [`${user.uid}`]: true };
                    });
                    setAnotherTrackVideos((prev) => {
                        return { ...prev, [`${user.uid}`]: true };
                    });
                }
                if (mediaType === "audio") {
                    if (user.audioTrack) {
                        user.audioTrack.play();
                    }
                }
            });

            client.on("user-unpublished", (user, mediaType) => {
                if (mediaType === "audio") {
                    if (user.audioTrack) user.audioTrack.stop();
                }
                if (mediaType === "video") {
                    // setUsers((prevUsers) => {
                    //     return prevUsers.filter((User) => User.uid !== user.uid);
                    // });
                }
            });

            client.on("user-left", (user) => {
                setUsers((prevUsers) => {
                    return prevUsers.filter((User) => User.uid !== user.uid);
                });
                setAnotherTrackAudios((prev) => {
                    delete prev[`${user.uid}`];
                    return { ...prev };
                });
                setAnotherTrackVideos((prev) => {
                    delete prev[`${user.uid}`];
                    return { ...prev };
                });
            });

            client.on("user-info-updated", (uid, msg) => {
                if (msg === "mute-video") {
                    setAnotherTrackVideos((prev) => {
                        return { ...prev, [`${uid}`]: false };
                    });
                } else if (msg === "unmute-video") {
                    setAnotherTrackVideos((prev) => {
                        return { ...prev, [`${uid}`]: true };
                    });
                } else if (msg === "mute-audio") {
                    setAnotherTrackAudios((prev) => {
                        return { ...prev, [`${uid}`]: false };
                    });
                } else if (msg === "unmute-audio") {
                    setAnotherTrackAudios((prev) => {
                        return { ...prev, [`${uid}`]: true };
                    });
                }
            });

            try {
                await client.join(appId, name, token, uid || null);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log("error");
            }

            if (tracks) await client.publish([tracks[0], tracks[1]]);
            setStart(true);
        };

        if (ready && tracks) {
            try {
                init(channel);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error);
            }
        }
    }, [channel, appId, token, client, ready, tracks, uid]);

    useEffect(() => {
        // eslint-disable-next-line no-console
        console.log("user:");
        // eslint-disable-next-line no-console
        console.log(users);
    }, [users]);

    useEffect(() => {
        // eslint-disable-next-line no-console
        console.log("audio track:");
        // eslint-disable-next-line no-console
        console.log(anotherTrackAudios);
    }, [anotherTrackAudios]);

    useEffect(() => {
        // eslint-disable-next-line no-console
        console.log("audio video:");
        // eslint-disable-next-line no-console
        console.log(anotherTrackVideos);
    }, [anotherTrackVideos]);
    return (
        <React.Fragment>
            <VideoCall
                ready={ready}
                tracks={tracks}
                start={start}
                setStart={setStart}
                users={users}
                healthCheck={healthCheck}
                anotherTrackVideos={anotherTrackVideos}
                anotherTrackAudios={anotherTrackAudios}
                uid={uid}
                userNames={props.users}
            />
        </React.Fragment>
    );
};

export default VideoCallMainScreen;
