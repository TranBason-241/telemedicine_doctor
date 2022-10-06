import { useCallback, useEffect, useState } from "react";

// import { FieldError } from "react-hook-form";
import axios from "src/axios";
import { IPagingSupport } from "src/common/types";

import { Autocomplete, TextField } from "@mui/material";

export interface IMultipleAutocomplete<T> {
    id: string;
    query: string;
    limit: number;
    field: keyof T;
    searchField: string;
    errors?: boolean;
    inputRef: React.Ref<HTMLInputElement>;
    width: string;
    errorMessage?: string;
    changeValue: (newValues: number[]) => void;
}

const MultipleAutocomplete = <T extends Record<string, string>>(
    props: IMultipleAutocomplete<T>
) => {
    const { query, limit, field, searchField, errors, inputRef, errorMessage, changeValue } = props;
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<T[]>([]);

    const callbackLoadData = useCallback(
        async (query: string, limit: number, searchValue: string) => {
            setLoading(true);
            try {
                const response = await axios.get<IPagingSupport<T>>(
                    `${query}?${searchField}=${searchValue}&page-offset=1&limit=${limit}`
                );
                if (response.status === 200) {
                    setData(response?.data?.content);
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error);
            } finally {
                setLoading(false);
            }
        },
        [searchField]
    );

    useEffect(() => {
        callbackLoadData(query, limit, searchValue);
    }, [callbackLoadData, query, limit, searchValue]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    return (
        <Autocomplete
            multiple
            id={props.id}
            options={data}
            getOptionLabel={(option) => option[field]}
            loading={loading}
            onChange={(_, newValues) => {
                if (newValues) {
                    changeValue(newValues.map((item) => Number(item["id"])));
                }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    // multiline
                    // rows={2}
                    value={data}
                    onChange={onChange}
                    inputRef={inputRef}
                    helperText={errors && errorMessage}
                    error={!!errors}
                    sx={{ width: props.width }}
                />
            )}
        />
    );
};

export default MultipleAutocomplete;
