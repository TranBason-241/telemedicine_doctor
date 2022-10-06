import { IPagingSupport } from "src/common/types";

import axios from "../../../axios";
import { Account } from "../models/Account.model";

class AccountService<T> {
    getAll(limit: number, offset: number) {
        return axios.get<IPagingSupport<T>>(`/accounts?limit=${limit}&page-offset=${offset}`);
    }

    getId(id: number) {
        return axios.get<T>(`/accounts/${id}`);
    }
    getAccountByEmail(email: string) {
        return axios.get<T>(`/accounts/${email}?search-type=Email`);
    }

    create(data: Account) {
        return axios.post<T>("/accounts", data);
    }

    update(data: Account) {
        return axios.put<T>("/accounts", data);
    }

    updateFormData(data: FormData) {
        return axios.put<T>("/accounts", data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    }

    delete(id: number) {
        return axios.delete<{ message: "string" }>(`/accounts/${id}`);
    }
}

export default AccountService;
