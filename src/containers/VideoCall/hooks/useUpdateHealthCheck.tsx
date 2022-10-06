import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import axios from "src/axios";

import { IUpdateHealthCheck } from "../../Popup/IUpdateHealthCheck.model";

const useUpdateHealthCheck = (endCall: () => void) => {
    const result = useMutation<unknown, Error, IUpdateHealthCheck, unknown>(
        ["useAcceptRequest"],
        async (variable) => {
            let result = await axios.put<unknown, AxiosResponse<unknown>, IUpdateHealthCheck>(
                "/health-checks?mode=DOCTORS",
                variable
            );
            return result.data;
        },
        {
            onSuccess: () => {
                endCall();
            },
        }
    );
    return result;
};

export default useUpdateHealthCheck;
