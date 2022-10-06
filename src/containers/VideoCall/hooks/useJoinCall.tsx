import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import axios from "src/axios";
import { IBasicError } from "src/common/types";

export interface IJoinCall {
    healthCheckId: number;
    displayName: string;
    email: string;
    isInvited: boolean;
}
const useJoinCall = () => {
    const result = useMutation<{ uid: number; token: string }, IBasicError, IJoinCall, unknown>(
        ["useJoinCall"],
        async (variable) => {
            let result = await axios.post<
                { uid: string; token: string },
                AxiosResponse<{ uid: number; token: string }>,
                IJoinCall
            >("/health-checks/join-call", variable);
            return result.data;
        },
        {
            onSuccess: () => {},
        }
    );
    return result;
};

export default useJoinCall;
