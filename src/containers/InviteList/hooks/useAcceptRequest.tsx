import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import axios from "src/axios";
import { IBasicError } from "src/common/types";

export interface IAcceptRequest {
    slot: number;
    healthCheckId: string;
    displayName: string;
    token: string;
    email: string;
}
const useAcceptRequest = () => {
    const result = useMutation<unknown, IBasicError, IAcceptRequest, unknown>(
        ["useAcceptRequest"],
        async (variable) => {
            let result = await axios.post<unknown, AxiosResponse<unknown>, IAcceptRequest>(
                "/health-checks/accept-request",
                variable
            );
            return result.data;
        },
        {
            onSuccess: () => {},
        }
    );
    return result;
};

export default useAcceptRequest;
