import img from "../../../../assets/waiting-screen.png";

import { Grid, Typography } from "@mui/material";

const WaitingScreen: React.FC = () => {
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
                    Tài khoản của bạn đang trong quá trình xác thực
                </Typography>
                <Typography variant="body1" mb={1}>
                    Vui lòng kiểm tra email từ hệ thống
                </Typography>
                <Typography variant="body1" mb={1}>
                    Chúng tôi sẽ thông báo cho bạn ngay khi tài khoản của bạn được kích hoạt
                </Typography>
            </Grid>
            <Grid item sm={6} xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <img src={img} alt="picture on waiting page" width="110%" height="110%" />
            </Grid>
        </Grid>
    );
};

export default WaitingScreen;
