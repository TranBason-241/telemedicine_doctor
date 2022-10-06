import { useMutation, useQueryClient } from "react-query";

import { Hospital } from "../models/Hospital.model";
import HospitalService from "../services/Hospital.service";
import { ServerStateKeysEnum } from "./useGetListHospital";

const usePostHospital = () => {
    let hospitalService = new HospitalService<Hospital>();
    const cache = useQueryClient();
    const result = useMutation<Hospital, Error, Hospital>(
        [ServerStateKeysEnum.CreateHospital],
        async (variable) => {
            const result = await hospitalService.create(variable);
            return result.data;
        },
        {
            onSuccess: () => {
                cache.invalidateQueries(ServerStateKeysEnum.Hospitals);
            },
            onError: () => {
                // eslint-disable-next-line no-console
                console.log("error");
            },
        }
    );
    return result;
};

export default usePostHospital;
