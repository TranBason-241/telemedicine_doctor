import { useQuery } from "react-query";

import HealthCheckService from "../services/HealthCheck.service";

import { HealthCheck } from "src/containers/VideoCall/models/VideoCall.model";

export enum ServerStateKeysEnum {
    NearestHealthCheck = "NearestHealthCheck",
}
const useGetNearestHealthCheck = (id: string, mode: "NORMAL" | "NEAREST" = "NORMAL") => {
    let healthcheckService = new HealthCheckService();
    const result = useQuery<HealthCheck, Error>(
        [ServerStateKeysEnum.NearestHealthCheck, id, mode],
        async () => {
            const result = await healthcheckService.getHealthCheckByDoctorIdAndMode(id, mode);
            return result.data;
        }
    );
    return result;
};

export default useGetNearestHealthCheck;
