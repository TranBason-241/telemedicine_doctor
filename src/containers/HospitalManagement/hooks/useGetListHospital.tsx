import { useQuery } from "react-query";
import { IPagingSupport } from "src/common/types";

import { Hospital } from "../models/Hospital.model";
import HospitalService from "../services/Hospital.service";

export enum ServerStateKeysEnum {
    Hospitals = "hospitals",
    CreateHospital = "createHospital",
    UpdateHospital = "updateHospital",
}
const useGetListHospital = (limit: number = 5, offset: number = 1) => {
    let hospitalService = new HospitalService<Hospital>();
    const result = useQuery<IPagingSupport<Hospital>, Error>(
        [ServerStateKeysEnum.Hospitals, limit, offset],
        async () => {
            const result = await hospitalService.getAll(limit, offset);
            return result.data;
        }
    );
    return result;
};

export default useGetListHospital;
