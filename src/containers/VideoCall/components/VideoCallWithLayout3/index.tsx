// import React from "react";

// import {
//     IMicrophoneAudioTrack,
//     ICameraVideoTrack,
//     AgoraVideoPlayer,
//     IAgoraRTCRemoteUser,
// } from "agora-rtc-react";

// import { HealthCheck } from "../../models/VideoCall.model";
// import "./index.scss";

// import { MicOffOutlined } from "@mui/icons-material";
// import MicNoneIcon from "@mui/icons-material/MicNoneRounded";
// import { Avatar, Box, Typography } from "@mui/material";
// import { deepOrange } from "@mui/material/colors";

// export interface VideoCallWithLayout3Props {
//     users: IAgoraRTCRemoteUser[];
//     tracks: [IMicrophoneAudioTrack, ICameraVideoTrack] | null;
//     trackState: {
//         video: boolean;
//         audio: boolean;
//     };
//     anotherTrackVideos: Record<string, boolean>[];
//     anotherTrackAudios: Record<string, boolean>[];
//     healthCheck: HealthCheck;
// }
// const VideoCallWithLayout3: React.FC<VideoCallWithLayout3Props> = (
//     props: VideoCallWithLayout3Props
// ) => {
//     const { users, tracks, trackState, anotherTrackVideos, anotherTrackAudios, healthCheck } = props;

//     return (
//         <Box
//             display="flex"
//             flexDirection="column"
//             justifyContent="center"
//             alignItems="center"
//             sx={{ height: "100%" }}
//         >
//             {tracks && (
//                 <Box sx={{ width: "100%", height: "50%" }}>
//                     <Box
//                         sx={{ height: "100%", width: "100%" }}
//                         display="flex"
//                         alignItems="center"
//                         justifyContent="center"
//                     >
//                         <Box
//                             sx={{
//                                 height: "100%",
//                                 width: "80%",
//                                 position: "relative",
//                             }}
//                         >
//                             {trackState.video ? (
//                                 <React.Fragment>
//                                     <AgoraVideoPlayer
//                                         className="boder-radius"
//                                         videoTrack={tracks[1]}
//                                         style={{
//                                             height: "100%",
//                                             width: "100%",
//                                             position: "absolute",
//                                         }}
//                                     />
//                                     <Box
//                                         sx={{
//                                             height: "100%",
//                                             width: "100%",
//                                             position: "absolute",
//                                             top: 0,
//                                             left: 0,
//                                             backgroundColor: "transparent",
//                                             zIndex: 2000,
//                                         }}
//                                     >
//                                         <Box
//                                             sx={{
//                                                 position: "absolute",
//                                                 bottom: 6,
//                                                 left: 10,
//                                                 display: "flex",
//                                             }}
//                                         >
//                                             {trackState.audio ? (
//                                                 <MicNoneIcon sx={{ color: "white" }} />
//                                             ) : (
//                                                 <MicOffOutlined sx={{ color: "white" }} />
//                                             )}
//                                             <Typography color="white" variant="subtitle1">
//                                                 Bs.{" "}
//                                                 {healthCheck?.slots &&
//                                                     healthCheck?.slots[0].doctor?.name}
//                                             </Typography>
//                                         </Box>
//                                     </Box>
//                                 </React.Fragment>
//                             ) : (
//                                 <Box
//                                     sx={{
//                                         width: "100%",
//                                         height: "100%",
//                                         display: "flex",
//                                         alignItems: "center",
//                                         justifyContent: "center",
//                                         border: "2px solid grey",
//                                         borderRadius: "10px",
//                                         position: "relative",
//                                     }}
//                                 >
//                                     <Avatar
//                                         sx={{
//                                             bgcolor: deepOrange[500],
//                                             width: 200,
//                                             height: 200,
//                                         }}
//                                         src={
//                                             healthCheck?.slots &&
//                                             healthCheck?.slots[0].doctor?.avatar
//                                         }
//                                     >
//                                         {/* <Typography fontSize={100}>B</Typography> */}
//                                     </Avatar>
//                                     <Box
//                                         sx={{
//                                             position: "absolute",
//                                             bottom: 6,
//                                             left: 10,
//                                             display: "flex",
//                                         }}
//                                     >
//                                         {trackState.audio ? (
//                                             <MicNoneIcon sx={{ color: "white" }} />
//                                         ) : (
//                                             <MicOffOutlined sx={{ color: "white" }} />
//                                         )}
//                                         <Typography color="white" variant="subtitle1">
//                                             Bs.{" "}
//                                             {healthCheck?.slots &&
//                                                 healthCheck?.slots[0].doctor?.name}
//                                         </Typography>
//                                     </Box>
//                                 </Box>
//                             )}
//                         </Box>
//                     </Box>
//                 </Box>
//             )}
//             {users?.length > 0 &&
//                 users.map((user) => {
//                     if (user.videoTrack) {
//                         return (
//                             <Box key={user.uid} sx={{ width: "100%", height: "50%" }}>
//                                 <Box
//                                     sx={{ height: "100%", width: "100%" }}
//                                     display="flex"
//                                     alignItems="center"
//                                     justifyContent="center"
//                                 >
//                                     <Box
//                                         sx={{
//                                             height: "100%",
//                                             width: "80%",
//                                             position: "relative",
//                                         }}
//                                     >
//                                         {anotherTrackVideo ? (
//                                             <React.Fragment>
//                                                 <AgoraVideoPlayer
//                                                     id="video-call"
//                                                     className="boder-radius"
//                                                     videoTrack={user.videoTrack}
//                                                     style={{ height: "100%", width: "100%" }}
//                                                 />
//                                                 <Box
//                                                     sx={{
//                                                         height: "100%",
//                                                         width: "100%",
//                                                         position: "absolute",
//                                                         top: 0,
//                                                         left: 0,
//                                                         backgroundColor: "transparent",
//                                                         zIndex: 2000,
//                                                     }}
//                                                 >
//                                                     <Box
//                                                         sx={{
//                                                             position: "absolute",
//                                                             bottom: 6,
//                                                             left: 10,
//                                                             display: "flex",
//                                                         }}
//                                                     >
//                                                         {anotherTrackAudio ? (
//                                                             <MicNoneIcon sx={{ color: "white" }} />
//                                                         ) : (
//                                                             <MicOffOutlined
//                                                                 sx={{ color: "white" }}
//                                                             />
//                                                         )}
//                                                         <Typography
//                                                             color="white"
//                                                             variant="subtitle1"
//                                                         >
//                                                             {healthCheck?.patient?.name}
//                                                         </Typography>
//                                                     </Box>
//                                                 </Box>
//                                             </React.Fragment>
//                                         ) : (
//                                             <Box
//                                                 sx={{
//                                                     width: "100%",
//                                                     height: "100%",
//                                                     display: "flex",
//                                                     alignItems: "center",
//                                                     justifyContent: "center",
//                                                     border: "2px solid grey",
//                                                     borderRadius: "10px",
//                                                     position: "relative",
//                                                 }}
//                                             >
//                                                 <Avatar
//                                                     sx={{
//                                                         bgcolor: deepOrange[500],
//                                                         width: 200,
//                                                         height: 200,
//                                                     }}
//                                                     src={healthCheck?.patient?.avatar}
//                                                 ></Avatar>
//                                                 <Box
//                                                     sx={{
//                                                         position: "absolute",
//                                                         bottom: 6,
//                                                         left: 10,
//                                                         display: "flex",
//                                                     }}
//                                                 >
//                                                     {anotherTrackAudio ? (
//                                                         <MicNoneIcon sx={{ color: "white" }} />
//                                                     ) : (
//                                                         <MicOffOutlined sx={{ color: "white" }} />
//                                                     )}
//                                                     <Typography color="white" variant="subtitle1">
//                                                         {healthCheck?.patient?.name}
//                                                     </Typography>
//                                                 </Box>
//                                             </Box>
//                                         )}
//                                     </Box>
//                                 </Box>
//                             </Box>
//                         );
//                     } else
//                         return (
//                             <Box key={user.uid} sx={{ width: "100%", height: "50%" }}>
//                                 <Box
//                                     sx={{ height: "100%", width: "100%" }}
//                                     display="flex"
//                                     alignItems="center"
//                                     justifyContent="center"
//                                 >
//                                     <Box
//                                         sx={{
//                                             height: "100%",
//                                             width: "80%",
//                                         }}
//                                     >
//                                         <Box
//                                             sx={{
//                                                 width: "100%",
//                                                 height: "100%",
//                                                 display: "flex",
//                                                 alignItems: "center",
//                                                 justifyContent: "center",
//                                                 border: "2px solid grey",
//                                                 borderRadius: "10px",
//                                                 position: "relative",
//                                             }}
//                                         >
//                                             <Avatar
//                                                 sx={{
//                                                     bgcolor: deepOrange[500],
//                                                     width: 200,
//                                                     height: 200,
//                                                 }}
//                                                 src={healthCheck?.patient?.avatar}
//                                             ></Avatar>
//                                             <Box
//                                                 sx={{
//                                                     position: "absolute",
//                                                     bottom: 6,
//                                                     left: 10,
//                                                     display: "flex",
//                                                 }}
//                                             >
//                                                 {anotherTrackAudio ? (
//                                                     <MicNoneIcon sx={{ color: "white" }} />
//                                                 ) : (
//                                                     <MicOffOutlined sx={{ color: "white" }} />
//                                                 )}
//                                                 <Typography color="white" variant="subtitle1">
//                                                     {healthCheck?.patient?.name}
//                                                 </Typography>
//                                             </Box>
//                                         </Box>
//                                     </Box>
//                                 </Box>
//                             </Box>
//                         );
//                 })}
//         </Box>
//     );
// };

// export default VideoCallWithLayout3;

const VideoCallWithLayout3 = () => {
    return <div>A</div>;
};
export default VideoCallWithLayout3;
