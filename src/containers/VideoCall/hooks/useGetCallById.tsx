import { useQuery } from "react-query";

import { HealthCheck } from "../models/VideoCall.model";
import VideoCallService from "../service/VideoCall.service";

export enum ServerStateKeysEnum {
    VideoCall = "VideoCall",
}
const useGetCallByID = (id: string) => {
    let videoCallService = new VideoCallService();
    const result = useQuery<HealthCheck, Error>([ServerStateKeysEnum.VideoCall, id], async () => {
        const result = await videoCallService.getVideoCallByHealthCheckId(id);
        return result.data;
    });
    return result;
};

export default useGetCallByID;
