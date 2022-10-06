import { IPagingSupport } from "src/common/types";

import axios from "../../../axios";
import { Account } from "../models/Account.model";

class AccountService<T> {
    getAll(limit: number, offset: number) {
        return axios.get<IPagingSupport<T>>(`/accounts?limit=${limit}&page-offset=${offset}`);
    }

    getId(searchValue: string, searchType: string) {
        return axios.get<T>(`/accounts/${searchValue}?searchType=${searchType}`);
    }

    create(data: FormData) {
        return axios.post<FormData>("/accounts", data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    }

    update(data: Account) {
        return axios.put<T>("/accounts", data);
    }

    getAccountByEmail(email: string) {
        return axios.get<T>(`/accounts/${email}?search-type=Email`);
    }
    changeStatus(id: number) {
        return axios.put<T>(`/accounts/${id}`);
    }

    delete(id: number) {
        return axios.delete<{ message: "string" }>(`/accounts/${id}`);
    }
}

export default AccountService;
