import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface ITotalAppointments {
    title: string;
    value: number;
}

const TotalAppointments: React.FC<ITotalAppointments> = (props: ITotalAppointments) => {
    return (
        <Card>
            <CardHeader title={props.title} titleTypographyProps={{ variant: "h6" }} />
            <CardContent>
                <Typography component="div" align="center">
                    <Box
                        sx={{
                            fontWeight: "medium",
                            fontSize: 32,
                        }}
                    >
                        {props.value}
                    </Box>
                    {" lịch hẹn"}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default TotalAppointments;
