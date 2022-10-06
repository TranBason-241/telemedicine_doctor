import { useQuery } from "react-query";
import { IPagingSupport } from "src/common/types";

import { Doctor } from "../models/Doctor.model";
import DoctorService from "../services/Doctor.service";

export enum ListDoctorStateKeysEnum {
    Doctors = "doctors",
}

const useGetListDoctor = (limit: number = 5, offset: number = 1) => {
    let doctorService = new DoctorService<Doctor>();
    const result = useQuery<IPagingSupport<Doctor>, Error>(
        [ListDoctorStateKeysEnum.Doctors, limit, offset],
        async () => {
            const result = await doctorService.getAll(limit, offset);
            return result.data;
        }
    );

    return result;
};

export default useGetListDoctor;
