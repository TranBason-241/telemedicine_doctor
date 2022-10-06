import { useMutation, useQueryClient } from "react-query";

import useSnackbar from "src/components/Snackbar/useSnackbar";

import { SlotCM } from "../models/schedule.model";
import ScheduleService from "../services/shedule.service";
import { ServerStateKeysEnum } from "./useGetSlotByDoctorID";

const useSaveSlots = () => {
    const showSnackbar = useSnackbar();
    let scheduleService = new ScheduleService();
    const cache = useQueryClient();
    const result = useMutation<{ message: string }, Error, SlotCM[]>(
        [ServerStateKeysEnum.CreateSlot],
        async (variable) => {
            const result = await scheduleService.saveSlot(variable);
            return result.data;
        },
        {
            onSuccess: () => {
                cache.invalidateQueries(ServerStateKeysEnum.Slots);
                showSnackbar({
                    variant: "filled",
                    severity: "success",
                    children: "Cập nhật slot thành công",
                });
            },
            onError: () => {
                // eslint-disable-next-line no-console
                console.log("error");
            },
        }
    );
    return result;
};

export default useSaveSlots;
