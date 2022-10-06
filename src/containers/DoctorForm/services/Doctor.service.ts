import { IPagingSupport } from "src/common/types";

import axios from "../../../axios";
import { Doctor } from "../models/Doctor.model";

class DoctorService<T> {
    getAll(limit: number, offset: number) {
        return axios.get<IPagingSupport<T>>(`/doctors?limit=${limit}&page-offset=${offset}`);
    }

    getId(searchValue: string, searchType: string) {
        return axios.get<T>(`/doctors/${searchValue}?searchType=${searchType}`);
    }

    create(data: FormData) {
        return axios.post<FormData>("/doctors", data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    }

    update(data: Doctor) {
        return axios.put<T>("/doctors", data);
    }

    verifyDoctor(id: number) {
        return axios.put<T>(`/doctors/${id}`);
    }

    delete(id: number) {
        return axios.delete<{ message: "string" }>(`/doctors/${id}`);
    }
}

export default DoctorService;
