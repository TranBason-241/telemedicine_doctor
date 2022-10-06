import axios from "../../../axios";

import { Doctor } from "src/containers/VideoCall/models/VideoCall.model";

class DoctorService {
    getDoctorByEmail(email: string) {
        return axios.get<Doctor>(`/doctors/${email}?search-type=Email`);
    }
}

export default DoctorService;
