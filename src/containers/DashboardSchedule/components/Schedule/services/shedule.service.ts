import axios from "src/axios";
import { IPagingSupport } from "src/common/types";

import { Slot, SlotCM } from "../models/schedule.model";

class ScheduleService {
    getScheduleByDoctorId(id: string) {
        return axios.get<IPagingSupport<Slot>>(`/slots?doctor-id=${id}`);
    }

    saveSlot(slots: SlotCM[]) {
        return axios.post<{ message: string }>(`/slots`, slots);
    }
}

export default ScheduleService;
