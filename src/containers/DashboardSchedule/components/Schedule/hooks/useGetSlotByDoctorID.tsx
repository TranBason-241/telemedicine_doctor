import { useQuery } from "react-query";
import { IPagingSupport } from "src/common/types";

import { Slot } from "../models/schedule.model";
import ScheduleService from "../services/shedule.service";

export enum ServerStateKeysEnum {
    Slots = "slots",
    CreateSlot = "createSlot",
}
const useGetSlotByDoctorId = (doctorId: string) => {
    let sheduleService = new ScheduleService();
    const result = useQuery<IPagingSupport<Slot>, Error, Slot[]>(
        [ServerStateKeysEnum.Slots, doctorId],
        async () => {
            const result = await sheduleService.getScheduleByDoctorId(doctorId);
            return result.data;
        },
        {
            select: (data) => data.content || [],
        }
    );
    return result;
};

export default useGetSlotByDoctorId;
