import appointment from "../../assets/appointment.png";
import dashboard from "../../assets/dashboard.png";
import healthCheck from "../../assets/health-check.png";
import user from "../../assets/user.png";

export const routes = [
    {
        id: 1,
        name: "Bảng điều khiển",
        path: "/",
        icon: dashboard,
    },
    {
        id: 3,
        name: "Cuộc hẹn",
        path: "/schedule",
        icon: appointment,
    },
    // {
    //     id: 4,
    //     name: "Lịch khám",
    //     path: "/health-checks",
    //     icon: healthCheck,
    // },
    {
        id: 4,
        name: "Lịch khám",
        path: "/health",
        icon: healthCheck,
    },
    // {
    //     id: 4,
    //     name: "Bệnh nhân",
    //     path: "/patients",
    //     icon: patient,
    // },
    {
        id: 5,
        name: "Thông tin cá nhân",
        path: "/doctors",
        icon: user,
    },
    // {
    //     id: 5,
    //     name: "Cấu hình chung",
    //     icon: <Settings />,
    //     children: [
    //         {
    //             id: 6,
    //             name: "Bệnh viện",
    //             path: "/hospitals",
    //             icon: <LocalHospitalIcon />,
    //         },
    //     ],
    // },
];

// export const routesControlApp = [
//     {
//         id: 15,
//         name: "About us",
//         path: "/about-us",
//         children: null,
//         icon: <Info />,
//     },
// ];
