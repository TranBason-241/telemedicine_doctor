import { useMutation, useQueryClient } from "react-query";

import { Hospital } from "../models/Hospital.model";
import HospitalService from "../services/Hospital.service";

import { ServerStateKeysEnum } from "src/containers/HospitalManagement/hooks/useGetListHospital";

const usePutHospital = () => {
    let hospitalService = new HospitalService<Hospital>();
    const cache = useQueryClient();
    const result = useMutation<Hospital, Error, Hospital>(
        [ServerStateKeysEnum.UpdateHospital],
        async (variable) => {
            const result = await hospitalService.update(variable);
            return result.data;
        },
        {
            onSuccess: () => {
                cache.invalidateQueries(ServerStateKeysEnum.UpdateHospital);
            },
            onError: () => {
                // eslint-disable-next-line no-console
                console.log("error");
            },
        }
    );
    return result;
};

export default usePutHospital;
