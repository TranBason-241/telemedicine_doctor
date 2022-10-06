import { IPagingSupport } from "src/common/types";

import axios from "../../../axios";
import { HealthCheck } from "../models/HealthCheck.model";

class HealthCheckService<T> {
    getAll(limit: number, offset: number) {
        return axios.get<IPagingSupport<T>>(`/health-checks?limit=${limit}&page-offset=${offset}`);
    }

    getAllByDoctorId(doctorId: number, limit: number, offset: number) {
        return axios.get<IPagingSupport<T>>(
            `/health-checks?doctor-id=${doctorId}&limit=${limit}&page-offset=${offset}`
        );
    }

    getBy(limit: number, offset: number, order: string, doctorId: number) {
        return axios.get<IPagingSupport<T>>(`health-checks?doctor-id=${doctorId}&order-type=${order}
        &page-offset=${offset}&limit=${limit}`);
    }

    getId(id: number) {
        return axios.get<T>(`/health-checks/${id}`);
    }

    create(data: HealthCheck) {
        return axios.post<T>("/health-checks", data);
    }

    update(data: HealthCheck) {
        return axios.put<T>(`/health-checks/${data.id}`, data);
    }

    delete(id: number) {
        return axios.delete<{ message: "string" }>(`/health-checks/${id}`);
    }
}

export default HealthCheckService;
