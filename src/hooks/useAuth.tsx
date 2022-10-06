import { useHistory } from "react-router";
import axios from "src/axios";
import { API_ROOT_URL } from "src/configurations";
import { auth } from "src/configurations/firebase";

import useSnackbar from "src/components/Snackbar/useSnackbar";

import {
    AuthProvider,
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from "@firebase/auth";
import { Account } from "src/common/models/Account.model";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

const useAuth = () => {
    const showSnackBar = useSnackbar();
    const history = useHistory();

    const login = async (provider: AuthProvider) => {
        try {
            let response = await signInWithPopup(auth, provider);
            if (response) {
                let tokenId = await response.user.getIdToken();
                let responseLogin = await axios.post<{
                    account: Account;
                    accessToken: string;
                    refenrenceId: string;
                }>(`${API_ROOT_URL}/login`, {
                    tokenId: tokenId,
                    loginType: 1,
                });
                if (responseLogin.status === 200) {
                    if (responseLogin.data.account) {
                        LocalStorageUtil.setItem("user", responseLogin?.data?.account);
                        LocalStorageUtil.setItem("token", responseLogin?.data.accessToken);
                        LocalStorageUtil.setItem("refenrenceId", responseLogin?.data.refenrenceId);
                        LocalStorageUtil.setItem(
                            "id_app",
                            responseLogin?.data.account.id
                                ? responseLogin?.data.account.id.toString()
                                : "0"
                        );
                        window.location.reload();
                    } else {
                        if (Object.values(responseLogin.data)[0] === "The account is not verify!") {
                            history.push("/waiting-screen");
                        } else {
                            LocalStorageUtil.setItem("email", Object.values(responseLogin.data)[0]);
                            history.push("/account-form");
                        }
                    }
                }
            }
        } catch (exception) {
            // eslint-disable-next-line no-console
            console.log(exception);
            // if ((exception as any).response.data.message === "LoginType is incorrect!")
            //     showSnackBar({
            //         severity: "error",
            //         children: "Tài khoản này đã được đăng nhập với một vai trò khác",
            //     });
            // else {
            //     showSnackBar({
            //         severity: "error",
            //         children: "Tài khoản này đã bị khóa",
            //     });
            // }
        }
    };

    return { login };
};

export default useAuth;
