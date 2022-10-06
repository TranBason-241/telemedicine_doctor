import { IPagingSupport } from "src/common/types";

import axios from "../../../axios";
import { Doctor } from "../models/VideoCall.model";

class DoctorService {
    getDoctorByEmail(email: string) {
        return axios.get<IPagingSupport<Doctor>>(`/doctors?email=${email}&limit=4`);
    }
}

export default DoctorService;
