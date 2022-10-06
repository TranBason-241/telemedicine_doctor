import { useQuery } from "react-query";

import DoctorService from "../services/Doctor.service";

import { Doctor } from "src/containers/VideoCall/models/VideoCall.model";

export enum ServerStateKeysEnum {
    NearestHealthCheck = "NearestHealthCheck",
}
const useGetDoctorByEmail = (email: string) => {
    let doctorService = new DoctorService();
    const result = useQuery<Doctor, Error>(["doctor", email], async () => {
        const result = await doctorService.getDoctorByEmail(email);
        return result.data;
    });
    return result;
};

export default useGetDoctorByEmail;
