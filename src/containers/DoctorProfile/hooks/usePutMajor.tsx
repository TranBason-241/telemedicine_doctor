import { useMutation, useQueryClient } from "react-query";

import { Major } from "../models/Major.model";
import MajorService from "../services/Major.service";

export enum MajorStateKeysEnum {
    Majors = "majors",
}
const usePutMajor = () => {
    // let majorService = new MajorService<Major>();
    let majorService = new MajorService<Major>();
    const cache = useQueryClient();
    const result = useMutation<Major, Error, Major>(
        [MajorStateKeysEnum.Majors],
        async (variable) => {
            const result = await majorService.update(variable);
            return result.data;
        },
        {
            onSuccess: () => {
                cache.invalidateQueries(MajorStateKeysEnum.Majors);
            },
            onError: () => {
                // eslint-disable-next-line no-console
                console.log("error");
            },
        }
    );
    return result;
};

export default usePutMajor;
