import axios from "../../../axios";
import { Cetification } from "../models/Cetification.model";

class CertificateService<T> {
    get(limit: number, offset: number) {
        return axios.get<T>(`/certifications?limit=${limit}&page-offset=${offset}`);
    }

    getId(id: number) {
        return axios.get<T>(`/certifications/${id}`);
    }

    create(data: Cetification) {
        return axios.post<T>("/certifications", data);
    }

    update(data: Cetification) {
        return axios.put<T>("/certifications", data);
    }

    delete(id: number) {
        return axios.delete<{ message: "string" }>(`/certifications/${id}`);
    }
}

export default CertificateService;
