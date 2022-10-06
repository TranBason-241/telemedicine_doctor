import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface IChartLabel {
    height: number | string;
    width: number | string;
    backgroundColor: string;
    border: string;
    lableText: string;
}

const ChartLabel: React.FC<IChartLabel> = (props: IChartLabel) => {
    const { height, width, backgroundColor, border, lableText } = props;
    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    height: height,
                    width: width,
                    backgroundColor: backgroundColor,
                    border: border,
                }}
            />
            <Typography variant="body2">{lableText}</Typography>
        </Stack>
    );
};

export default ChartLabel;
