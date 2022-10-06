import React, { createContext, useState } from "react";

import SnackbarBase, {
    AlertBase,
    AlertBaseProps,
    SnackbarBaseProps,
} from "src/components/Snackbar/SnackbarBase";

export type showSnackbar = (
    newAlert: AlertBaseProps,
    snackbarBase?: SnackbarBaseProps,
    time?: number
) => void;
export const SnackbarContext = createContext<showSnackbar>(({}) => {});

const SnackbarProvider: React.FC = ({ children }) => {
    const [alert, setAlert] = useState<AlertBaseProps>({});
    const [snackbar, setSnackbar] = useState<SnackbarBaseProps>({});
    const [time, setTime] = useState<number | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    const showSnackbar = (
        newAlert: AlertBaseProps,
        snackbarBase?: SnackbarBaseProps,
        time: number | undefined = 5000
    ) => {
        setAlert({
            variant: "filled",
            severity: "success",
            ...newAlert,
        });
        if (snackbarBase) {
            setSnackbar(snackbarBase);
        }
        if (time) {
            setTime(time);
        } else {
            setTime(null);
        }
        setOpen(true);
    };

    const handleClose = (e?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
        // eslint-disable-next-line no-console
        console.log(time);
        if (!open) {
            setAlert({});
        }
    };

    return (
        <SnackbarContext.Provider value={showSnackbar}>
            {children}
            <SnackbarBase
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                open={open}
                onClose={handleClose}
                autoHideDuration={30000}
                {...snackbar}
            >
                <AlertBase
                    sx={{ alignItems: "center" }}
                    variant="filled"
                    {...alert}
                    onClose={handleClose}
                />
            </SnackbarBase>
        </SnackbarContext.Provider>
    );
};

export default SnackbarProvider;
