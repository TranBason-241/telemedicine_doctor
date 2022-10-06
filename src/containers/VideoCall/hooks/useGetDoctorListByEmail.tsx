import { useQuery } from "react-query";
import { IPagingSupport } from "src/common/types";

import { Doctor } from "../models/VideoCall.model";
import DoctorService from "../service/Doctor.service";

export enum ServerStateKeysEnum {
    useGetDoctorListByEmail = "useGetDoctorListByEmail",
}
const useGetDoctorListByEmail = (email: string) => {
    let doctorService = new DoctorService();
    const result = useQuery<IPagingSupport<Doctor>, Error>(
        [ServerStateKeysEnum.useGetDoctorListByEmail, email],
        async () => {
            let result = await doctorService.getDoctorByEmail(email);
            return result.data;
        }
    );
    return result;
};

export default useGetDoctorListByEmail;
