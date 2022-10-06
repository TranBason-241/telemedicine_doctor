import React, { useEffect, useState } from "react";

import axios from "src/axios";
import { API_ROOT_URL } from "src/configurations";
import { getTokenFirebase } from "src/configurations/firebase";

import { Account } from "src/common/models/Account.model";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

const Notifications = () => {
    const [isMakeConnection, setMakeConnection] = useState<boolean>(false);
    // To load once
    useEffect(() => {
        let data;
        async function tokenFunc() {
            if (!isMakeConnection) {
                data = await getTokenFirebase();
                if (data) {
                    // eslint-disable-next-line no-console
                    console.log("Token is", data);
                    LocalStorageUtil.setItem("token_subcribe", data);
                    try {
                        const user = LocalStorageUtil.getItem("user") as Account;
                        const response = await axios.post(
                            `${API_ROOT_URL}/notifications/connection`,
                            {
                                token: data,
                                email: user.email,
                            }
                        );
                        if (response.status === 200) {
                            // eslint-disable-next-line no-console
                            console.log("OK");
                            setMakeConnection(true);
                        }
                    } catch (ex) {
                        // eslint-disable-next-line no-console
                        console.log(ex);
                    }
                } else {
                    // eslint-disable-next-line no-console
                    console.log("oh no, oh no");
                }
            }
        }

        tokenFunc();
    }, [isMakeConnection]);

    return <></>;
};

export default Notifications;
