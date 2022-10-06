import React from "react";
import { useCallback, useEffect, useState } from "react";

import moment from "moment";
import { useHistory } from "react-router";

import { Account } from "../AccountForm/models/Account.model";
import useGetDoctor from "../DoctorProfile/hooks/useGetDoctor";
import { HealthCheck } from "./models/HealthCheck.model";
import HealthCheckService from "./services/HealthCheck.service";

import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

const HealthCheckPatient: React.FC = () => {
    const history = useHistory();
    const user = LocalStorageUtil.getItem("user") as Account;
    const [dataHealth, setDataHealth] = useState<HealthCheck[]>([]);
    const { data } = useGetDoctor(user.email);

    const getHealthCheck = useCallback(async (limit: number, offset: number, doctorId: number) => {
        let healthCheckService = new HealthCheckService<HealthCheck>();
        const response = await healthCheckService.getBy(limit, offset, doctorId);
        if (response.status === 200) {
            setDataHealth(response.data.content);
        }
    }, []);

    useEffect(() => {
        if (data?.id) {
            getHealthCheck(20, 1, data?.id);
        }
    }, [getHealthCheck, data?.id]);
    return (
        <React.Fragment>
            <Card>
                <CardHeader title="Lịch sử khám chữa bệnh" />
                <Divider />
                <CardContent>
                    {dataHealth?.length === 0
                        ? dataHealth
                        : dataHealth?.map((item, index) => (
                              <Card
                                  key={index}
                                  variant="outlined"
                                  sx={{ display: "flex", flexDirection: "row", pr: 3 }}
                              >
                                  <CardContent sx={{ display: "flex", flexWrap: "wrap", p: 2 }}>
                                      <Typography
                                          component="div"
                                          sx={{ mr: 1 }}
                                          color="text.secondary"
                                      >
                                          Bệnh nhân được tư vấn
                                      </Typography>
                                      <Typography component="div" sx={{ mr: 3, width: 200 }}>
                                          {/* {item.slots[0].doctor.name} */}
                                          {item.patient.name}
                                      </Typography>
                                      <Typography
                                          component="div"
                                          sx={{ mr: 1 }}
                                          color="text.secondary"
                                      >
                                          Ngày đăng kí
                                      </Typography>
                                      <Typography component="div" sx={{ mr: 3 }}>
                                          {moment(item.createdTime).format("DD/MM/yyyy")}
                                      </Typography>
                                      <Box sx={{ display: "flex", alignItems: "center" }}>
                                          <Chip
                                              sx={{ width: 100 }}
                                              label={
                                                  item.status === "BOOKED"
                                                      ? "Đã đặt hẹn"
                                                      : item.status === "COMPLETED"
                                                      ? "Hoàn thành"
                                                      : item.status === "CANCELED"
                                                      ? "Đã hủy"
                                                      : "ALL"
                                              }
                                              color={
                                                  item.status === "BOOKED"
                                                      ? "primary"
                                                      : item.status === "COMPLETED"
                                                      ? "success"
                                                      : item.status === "CANCELED"
                                                      ? "error"
                                                      : "default"
                                              }
                                              size="small"
                                          />
                                      </Box>
                                  </CardContent>
                                  <CardActions>
                                      <Button
                                          size="medium"
                                          onClick={() => history.push("/health-checks/" + item.id)}
                                      >
                                          Chi tiết
                                      </Button>
                                  </CardActions>
                              </Card>
                          ))}
                </CardContent>
                {/* <Divider /> */}
                <CardActions>
                    <Button
                        fullWidth
                        variant="text"
                        size="small"
                        disabled={dataHealth?.length === 0}
                        // onClick={viewMoreHandler}
                    >
                        Xem thêm
                    </Button>
                </CardActions>
                {/* <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
                <Button size="small" disabled={props.healthChecks?.length === 0}>
                    Xem thêm...
                </Button>
            </Box> */}
            </Card>
        </React.Fragment>
    );
};

export default HealthCheckPatient;
