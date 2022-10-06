import moment from "moment";

import healthCheckDetail from "../../../../assets/health-check-detail.png";
import { HealthCheck } from "../../models/HealthCheck.model";

import BloodtypeOutlinedIcon from "@mui/icons-material/BloodtypeOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import WcRoundedIcon from "@mui/icons-material/WcRounded";
import {
    Avatar,
    Card,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Rating,
    Tooltip,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Account } from "src/containers/AccountForm/models/Account.model";

export interface IHealthCheckDetail {
    healthCheck?: HealthCheck;
    patientAccount?: Account;
}

const HealthCheckDetail: React.FC<IHealthCheckDetail> = (props: IHealthCheckDetail) => {
    const { healthCheck, patientAccount } = props;

    const defaultLayout = (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: 640,
                p: 2,
                "& > :not(style)": { p: 1 },
            }}
        >
            <img alt="Health Check" src={healthCheckDetail} />
            <div>Chọn một lịch hẹn để xem chi tiết</div>
        </Card>
    );

    return !healthCheck ? (
        defaultLayout
    ) : (
        <Card sx={{ height: 640, overflow: "auto" }}>
            {/* Block 1 */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <CardHeader title="Thông tin chi tiết" />
                <Avatar
                    src={healthCheck.patient.avatar}
                    alt={healthCheck.patient.name}
                    sx={{ height: 100, width: 100 }}
                />
                <Typography component="div">
                    <Box sx={{ fontWeight: "medium", fontSize: 24, pb: 1 }}>
                        {healthCheck.patient.name}
                    </Box>
                </Typography>
            </Box>
            <Divider variant="middle" />
            {/* Block 2 */}
            <List>
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
                    <ListItem>
                        <ListItemIcon>
                            <BloodtypeOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={healthCheck.patient.bloodGroup} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <WcRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={patientAccount?.isMale ? "Nam" : "Nữ"} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CakeOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={moment(patientAccount?.dob).format("DD/MM/YYYY")} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <PhoneOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={patientAccount?.phone} />
                    </ListItem>
                </Box>
                <ListItem>
                    <ListItemIcon>
                        <EmailOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={patientAccount?.email} />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <HomeOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={`${patientAccount?.streetAddress}, ${patientAccount?.locality}, ${patientAccount?.city}`}
                    />
                </ListItem>
            </List>
            <Divider variant="middle" />
            {/* Block 3 */}
            <Box>
                <Typography mt={1} mb={1} ml={3} color="textPrimary" variant="h6">
                    Thông tin về sức khỏe
                </Typography>
                <Grid container sx={{ display: "flex", flexDirection: "row", pl: 3, pb: 1 }}>
                    <Grid item xs={6} sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography>Chiều cao:</Typography>
                        <Typography sx={{ color: "text.secondary", ml: 1 }}>
                            {healthCheck.height}cm
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography>Cân nặng:</Typography>
                        <Typography sx={{ color: "text.secondary", ml: 1 }}>
                            {healthCheck.weight}kg
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container sx={{ display: "flex", flexWrap: "wrap", pl: 3, pb: 1 }}>
                    <Grid item xs={3}>
                        <Typography>Dị ứng:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography sx={{ color: "text.secondary" }}>
                            {healthCheck.patient.allergy}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container sx={{ display: "flex", flexWrap: "wrap", pl: 3, pb: 1 }}>
                    <Grid item xs={3}>
                        <Typography>Bệnh nền:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography sx={{ color: "text.secondary" }}>
                            {healthCheck.patient.backgroundDisease}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container sx={{ display: "flex", flexWrap: "wrap", pl: 3, pb: 1 }}>
                    <Grid item xs={3}>
                        <Typography>Triệu chứng:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography sx={{ color: "text.secondary" }}>
                            {healthCheck.symptomHealthChecks
                                .map((item) => item.symptom.name)
                                .join(", ")}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Divider variant="middle" />
            {/* Block 4 */}
            <Box>
                <Box sx={{ display: "flex" }}>
                    <Typography mt={1} mb={1} ml={3} color="textPrimary" variant="h6">
                        Nội dung buổi tư vấn
                    </Typography>
                    <Tooltip title="Chỉnh sửa" placement="right">
                        <IconButton size="small">
                            <CreateOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Grid container sx={{ display: "flex", flexWrap: "wrap", pl: 3, pb: 1 }}>
                    <Grid item xs={3}>
                        <Typography>Chẩn đoán:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography sx={{ color: "text.secondary" }}>Chưa có thông tin</Typography>
                    </Grid>
                </Grid>
                <Grid container sx={{ display: "flex", flexWrap: "wrap", pl: 3, pb: 1 }}>
                    <Grid item xs={3}>
                        <Typography>Ghi chú:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography sx={{ color: "text.secondary" }}>Chưa có thông tin</Typography>
                    </Grid>
                </Grid>
                <Grid container sx={{ display: "flex", flexWrap: "wrap", pl: 3, pb: 1 }}>
                    <Grid item xs={3}>
                        <Typography>Đơn thuốc</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Card sx={{ color: "text.secondary", p: 1, mb: 1, width: "95%" }}>
                            <Grid container>
                                {/* Row 1 */}
                                <Grid item xs={1}>
                                    <Typography mr={1}>1.</Typography>
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography mr={1}>Batigan 300mg</Typography>
                                </Grid>
                                {/* Row 2 */}
                                <Grid item xs={1}></Grid>
                                <Grid item xs={3}>
                                    <Typography mr={1}>Thời gian:</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography mr={1}>21/10/2021 - 22/10/2021</Typography>
                                </Grid>
                                {/* Row 3 */}
                                <Grid item xs={1}></Grid>
                                <Grid item xs={3}>
                                    <Typography mr={1}>Liều lượng:</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography mr={1}>Sáng - 01</Typography>
                                </Grid>
                                {/* Row 4 */}
                                <Grid item xs={1}></Grid>
                                <Grid item xs={3}>
                                    <Typography mr={1}>Ghi chú:</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography mr={1}>Uống sau ăn</Typography>
                                </Grid>
                            </Grid>
                        </Card>
                        <Card sx={{ color: "text.secondary", p: 1, width: "95%" }}>
                            <Grid container>
                                {/* Row 1 */}
                                <Grid item xs={1}>
                                    <Typography mr={1}>2.</Typography>
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography mr={1}>Paracetamon 300mg</Typography>
                                </Grid>
                                {/* Row 2 */}
                                <Grid item xs={1}></Grid>
                                <Grid item xs={3}>
                                    <Typography mr={1}>Thời gian:</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography mr={1}>21/10/2021 - 22/10/2021</Typography>
                                </Grid>
                                {/* Row 3 */}
                                <Grid item xs={1}></Grid>
                                <Grid item xs={3}>
                                    <Typography mr={1}>Liều lượng:</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography mr={1}>Tối - 01</Typography>
                                </Grid>
                                {/* Row 4 */}
                                <Grid item xs={1}></Grid>
                                <Grid item xs={3}>
                                    <Typography mr={1}>Ghi chú:</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography mr={1}>Uống sau ăn</Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Divider variant="middle" />
            {/* Block 5 */}
            <Box>
                <Typography mt={1} mb={1} ml={3} color="textPrimary" variant="h6">
                    Đánh giá của bệnh nhân
                </Typography>
                <Grid container sx={{ display: "flex", flexWrap: "wrap", pl: 3, pb: 1 }}>
                    <Grid item xs={3}>
                        <Typography>Đánh giá</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Rating name="rating" value={4} readOnly />
                    </Grid>
                </Grid>
                <Grid container sx={{ display: "flex", flexWrap: "wrap", pl: 3, pb: 1 }}>
                    <Grid item xs={3}>
                        <Typography>Nội dung:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography sx={{ color: "text.secondary" }}>Chưa có thông tin</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
};

export default HealthCheckDetail;
