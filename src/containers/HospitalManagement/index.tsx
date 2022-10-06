import React from "react";

import useGetListHospital from "./hooks/useGetListHospital";
import usePostHospital from "./hooks/usePostHospital";

import { Button, CircularProgress, Typography } from "@mui/material";

const HospitalManagement: React.FC = () => {
    const { data, isLoading, isError } = useGetListHospital();
    const { mutate } = usePostHospital();
    if (isError) {
        return <div>error</div>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }
    return (
        <React.Fragment>
            {data?.content?.map((x) => (
                <Typography variant="h4" key={x.id}>
                    {x.name}
                </Typography>
            ))}
            <Button
                onClick={() =>
                    mutate({
                        address: "admin",
                        hospitalCode: "admin",
                        isActive: true,
                        name: "admin",
                    })
                }
            >
                ADD HOSPITAL
            </Button>
        </React.Fragment>
    );
};

export default HospitalManagement;
