import React from "react";

import moment from "moment";

import { Prescriptions } from "../../models/HealthCheckDetail.model";

import CloseIcon from "@mui/icons-material/Close";
import {
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";

export interface IDrugDialog {
    open: boolean;
    handleClose: () => void;
    prescription: Prescriptions[];
}
const DrugDialog: React.FC<IDrugDialog> = (props: IDrugDialog) => {
    const { open, handleClose, prescription } = props;
    return (
        <Modal
            open={open}
            aria-labelledby="drug-list-dialog"
            aria-describedby="drug-list-description"
        >
            <Card
                sx={{
                    position: "absolute" as "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "50%",
                    minWidth: "70%",
                    mx: "auto",
                    p: 1,
                    m: 2,
                    borderRadius: 1,
                }}
            >
                <CardHeader
                    title={
                        <React.Fragment>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Box>
                                    <Typography variant="h6">Đơn thuốc </Typography>{" "}
                                </Box>
                                <Box sx={{ justifyContent: "flex-end" }}>
                                    <IconButton onClick={() => handleClose()}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </React.Fragment>
                    }
                />
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell width={200}>Tên thuốc</TableCell>
                                    <TableCell width={500}>Thời gian</TableCell>
                                    <TableCell width={80}>Sáng</TableCell>
                                    <TableCell width={80}>Trưa</TableCell>
                                    <TableCell width={80}>Chiều</TableCell>
                                    <TableCell width={500}>Hướng dẫn</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {prescription?.map((drug) => {
                                    return (
                                        <>
                                            <TableRow key={drug.id}>
                                                <TableCell width={200}>
                                                    {drug?.drug?.name}
                                                </TableCell>
                                                <TableCell width={400}>
                                                    {moment(drug?.startDate).format(`DD/MM/YYYY`)}
                                                    {" - "}
                                                    {moment(drug?.endDate).format(`DD/MM/YYYY`)}
                                                </TableCell>
                                                <TableCell width={100}>
                                                    {drug?.morningQuantity}
                                                </TableCell>
                                                <TableCell width={100}>
                                                    {drug?.afternoonQuantity}
                                                </TableCell>
                                                <TableCell width={100}>
                                                    {drug?.eveningQuantity}
                                                </TableCell>
                                                <TableCell width={500}>
                                                    {drug?.description}
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
                {/* <CardActions>
                    <Box sx={{ justifyContent: "flex-end" }}>
                        <Button variant="contained" onClick={() => handleClose()}>
                            Thoát
                        </Button>
                    </Box>
                </CardActions> */}
            </Card>
        </Modal>
    );
};

export default DrugDialog;
