import { useMutation, useQueryClient } from "react-query";

import { Cetification } from "../models/Cetification.model";
import CertificateService from "../services/Certificate.service";

export enum CeritificateStateKeysEnum {
    Ceritifcates = "ceritifcates",
}

const usePutCeritificate = () => {
    // let majorService = new MajorService<Major>();
    let certificateService = new CertificateService<Cetification>();
    const cache = useQueryClient();
    const result = useMutation<Cetification, Error, Cetification>(
        [CeritificateStateKeysEnum.Ceritifcates],
        async (variable) => {
            const result = await certificateService.update(variable);
            return result.data;
        },
        {
            onSuccess: () => {
                cache.invalidateQueries(CeritificateStateKeysEnum.Ceritifcates);
            },
            onError: () => {
                // eslint-disable-next-line no-console
                console.log("error");
            },
        }
    );
    return result;
};

export default usePutCeritificate;
