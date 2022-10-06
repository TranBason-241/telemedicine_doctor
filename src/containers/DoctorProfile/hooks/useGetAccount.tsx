import { useQuery } from "react-query";

import { Account } from "../models/Account.model";
import AccountService from "../services/Account.service";

export enum AccountStateKeysEnum {
    Accounts = "accounts",
    UpdateAccounts = "updateAccounts",
    CreateAccounts = "creatAccount",
}

const useGetAccount = (email: string) => {
    let accountService = new AccountService<Account>();

    const result = useQuery<Account, Error>([AccountStateKeysEnum.Accounts, email], async () => {
        const result = await accountService.getAccountByEmail(email);
        return result.data;
    });

    return result;
};

export default useGetAccount;
