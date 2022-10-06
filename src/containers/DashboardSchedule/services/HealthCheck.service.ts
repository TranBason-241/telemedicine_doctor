import axios from "../../../axios";

import { HealthCheck } from "src/containers/VideoCall/models/VideoCall.model";

class HealthCheckService {
    getHealthCheckByDoctorIdAndMode(id: string, mode: "NORMAL" | "NEAREST" = "NORMAL") {
        return axios.get<HealthCheck>(
            `/health-checks?doctor-id=${id}&mode-search=${mode}&type-role=DOCTOR`
        );
    }
}

export default HealthCheckService;
