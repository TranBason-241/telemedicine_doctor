import { IPagingSupport } from "src/common/types";

import axios from "../../../axios";
import { Hospital } from "../models/Hospital.model";

class HospitalService<T> {
    getAll(limit: number, offset: number) {
        return axios.get<IPagingSupport<T>>(`/hospitals?limit=${limit}&page-offset=${offset}`);
    }

    getId(id: number) {
        return axios.get<T>(`/hospitals/${id}`);
    }

    create(data: Hospital) {
        return axios.post<T>("/hospitals", data);
    }

    update(data: Hospital) {
        return axios.put<T>("/hospitals", data);
    }

    delete(id: number) {
        return axios.delete<{ message: "string" }>(`/hospitals/${id}`);
    }
}

export default HospitalService;
