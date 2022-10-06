import { useCallback, useEffect, useState } from "react";

import { FieldError } from "react-hook-form";
import axios from "src/axios";
import { IPagingSupport } from "src/common/types";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Autocomplete, Checkbox, TextField } from "@mui/material";

export interface ICustomizeAuto<T> {
    query: string;
    limit: number;
    field: keyof T;
    searchField?: string;
    label?: string;
    errors?: FieldError;
    inputRef?: React.Ref<HTMLInputElement>;
    errorMessage?: string;
    changeValue: (newValue: number | number[]) => void;
    changeFullValue?: (newValue: T | T[]) => void;
    multiple?: boolean;
    size?: "medium" | "small";
    required?: boolean;
    fullField?: boolean;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const CustomizeAutocompleteActive = <T extends Record<string, string>>(
    props: ICustomizeAuto<T>
) => {
    const {
        query,
        limit,
        field,
        searchField,
        errors,
        inputRef,
        errorMessage,
        changeValue,
        changeFullValue,
        multiple,
        size,
        fullField,
        required,
    } = props;
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<T[]>([]);

    const callbackLoadData = useCallback(
        async (query: string, limit: number, search: string) => {
            setLoading(true);
            try {
                const response = await axios.get<IPagingSupport<T>>(
                    `${query}?${searchField}=${search}&is-active=true&page-offset=1&limit=${limit}`
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
        callbackLoadData(query, limit, search);
    }, [callbackLoadData, query, limit, search]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <Autocomplete
            id="select-customize"
            multiple={multiple}
            options={data}
            // sx={{ width: 300 }}
            getOptionLabel={(option) => option[field]}
            disableCloseOnSelect={multiple}
            renderOption={
                multiple
                    ? (props, option, { selected }) => (
                          <li {...props}>
                              <Checkbox
                                  icon={icon}
                                  checkedIcon={checkedIcon}
                                  style={{ marginRight: 8 }}
                                  checked={selected}
                              />
                              {option[field]}
                          </li>
                      )
                    : undefined
            }
            loading={loading}
            onChange={(_, newValue) => {
                if (fullField) {
                    if (multiple) {
                        if (newValue) {
                            changeFullValue && changeFullValue(newValue as T[]);
                        }
                    } else {
                        if (newValue) {
                            changeFullValue && changeFullValue(newValue as T);
                        }
                    }
                } else {
                    if (multiple) {
                        if (newValue) {
                            changeValue((newValue as T[]).map((x) => Number(x["id"])));
                        }
                    } else {
                        if (newValue) {
                            changeValue(Number((newValue as T)["id"]));
                        }
                    }
                }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    value={data}
                    size={size}
                    label={props.label}
                    onChange={onChange}
                    inputRef={inputRef}
                    helperText={errors && errorMessage}
                    error={!!errors}
                    required={required}
                />
            )}
        />
    );
};

export default CustomizeAutocompleteActive;
