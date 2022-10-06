import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import axios from "src/axios";

export interface IChangeStatus {
    id: number;
    reasonCancel: string;
    status: string;
}
const useChangeStatusHealthCheck = (leaveChannel: () => void) => {
    const result = useMutation<unknown, Error, IChangeStatus, unknown>(
        ["useChangeStatusHealthCheck"],
        async (variable) => {
            let result = await axios.patch<unknown, AxiosResponse<unknown>, IChangeStatus>(
                "/health-checks/" + variable.id,
                variable
            );
            return result.data;
        },
        {
            onSuccess: () => {
                leaveChannel();
            },
        }
    );
    return result;
};

export default useChangeStatusHealthCheck;
