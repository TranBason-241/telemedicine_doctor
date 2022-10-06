import { useQuery } from "react-query";
import { IPagingSupport } from "src/common/types";

import { HealthCheck } from "../models/HealthCheck.model";
import HealthCheckService from "../services/HealthCheck.service";

export enum HealthCheckStateKeyEnum {
    Healthchecks = "healthchecks",
}

const useGetHealthCheck = (limit: number = 50, offset: number = 1) => {
    let healthCheckService = new HealthCheckService<HealthCheck>();
    const result = useQuery<IPagingSupport<HealthCheck>, Error>(
        [HealthCheckStateKeyEnum.Healthchecks, limit, offset],
        async () => {
            const result = await healthCheckService.getAll(limit, offset);
            // console.log("data", result.data.content);
            return result.data;
        }
    );
    return result;
};

export default useGetHealthCheck;
