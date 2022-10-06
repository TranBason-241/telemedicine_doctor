import { useHistory } from "react-router";

import { Button, Grid, Typography } from "@mui/material";
import img from "src/assets/waiting-screen.png";

const AfterCallScreen: React.FC = () => {
    const history = useHistory();
    return (
        <Grid container spacing={1}>
            <Grid
                item
                sm={6}
                xs={12}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    flexWrap: "wrap",
                    p: 5,
                }}
            >
                <Typography variant="h5" mb={3}>
                    Bạn đã hoàn thành cuộc gọi
                </Typography>
                <Button variant="contained" onClick={() => history.push("/")}>
                    Trở lại màn hình chính
                </Button>
            </Grid>
            <Grid item sm={6} xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <img src={img} alt="picture on waiting page" width="110%" height="110%" />
            </Grid>
        </Grid>
    );
};

export default AfterCallScreen;
