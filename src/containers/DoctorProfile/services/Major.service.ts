import axios from "../../../axios";
import { Major } from "../models/Major.model";

class MajorService<T> {
    getAll(limit: number, pageOffset: number) {
        return axios.get<T>(`/majors?limit=${limit}&page-offset=${pageOffset}`);
    }

    getId(id: number) {
        return axios.get<T>(`/majors/${id}`);
    }

    create(data: Major) {
        return axios.post<T>("/majors", data);
    }

    update(data: Major) {
        return axios.put<T>("/majors", data);
    }

    delete(id: number) {
        return axios.delete<{ message: "string" }>(`/majors/${id}`);
    }
}

export default MajorService;
