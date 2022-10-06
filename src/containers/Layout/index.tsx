import * as React from "react";

import { useHistory } from "react-router";
import axios from "src/axios";
import { onMessageListener } from "src/configurations/firebase";

import AppBarWithDrawer from "src/components/AppBar";
import DrawerBase from "src/components/Drawer";
import useSnackbar from "src/components/Snackbar/useSnackbar";

import { Button, CssBaseline, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/system";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

const drawerWidth = 250;

const Layout: React.FC<{ children?: React.ReactNode }> = ({
    children,
}: {
    children?: React.ReactNode;
}) => {
    const [countOfUnread, setCountOfUnread] = React.useState(0);
    const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
    const userId = LocalStorageUtil.getItem("id_app");
    const history = useHistory();
    React.useEffect(() => {
        const getUnread = async () => {
            const response = await axios.get<{ countOfUnRead: number }>(
                `/notifications/users/${userId}`
            );
            if (response.status === 200) {
                setCountOfUnread(response.data.countOfUnRead);
            }
        };
        getUnread();
    }, [userId]);

    const clearUnread = () => {
        setCountOfUnread(0);
    };
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const showSnackBar = useSnackbar();
    onMessageListener()
        .then((payload) => {
            setCountOfUnread((prev) => {
                return prev + 1;
            });
            // eslint-disable-next-line no-console
            console.log(payload);
            if (payload.notification?.title === "Bạn đã nhận được một lời mời tham gia") {
                showSnackBar(
                    {
                        variant: "standard",
                        severity: "info",
                        children: (
                            <React.Fragment>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Typography>Bạn có một lời mời tham gia cuộc hẹn</Typography>
                                    <Button
                                        color="info"
                                        onClick={() =>
                                            history.push(`/call/${payload.notification?.body}`)
                                        }
                                    >
                                        Đồng ý
                                    </Button>
                                </Box>
                            </React.Fragment>
                        ),
                    },
                    {
                        anchorOrigin: {
                            vertical: "top",
                            horizontal: "center",
                        },
                    },
                    undefined
                );
            } else {
                showSnackBar(
                    {
                        variant: "filled",
                        color: "warning",
                        severity: "warning",
                        children: (
                            <React.Fragment>
                                <Typography variant="h6" align="left">
                                    {payload.notification?.title || ""}
                                </Typography>
                                <Typography align="left">
                                    {payload.notification?.body || ""}
                                </Typography>
                            </React.Fragment>
                        ),
                    },
                    {
                        anchorOrigin: {
                            vertical: "top",
                            horizontal: "right",
                        },
                    }
                );
            }
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log("failed: ", err));

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBarWithDrawer
                countOfUnread={countOfUnread}
                drawerWidth={drawerWidth}
                handleDrawerToggle={handleDrawerToggle}
                clearUnread={clearUnread}
            ></AppBarWithDrawer>
            <DrawerBase
                drawerWidth={drawerWidth}
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
