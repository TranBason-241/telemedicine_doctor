import { Route, Switch } from "react-router";

import WaitingScreen from "src/containers/DoctorForm/components/WaitingScreen";

import { PrivateRoute } from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import AccountForm from "src/containers/AccountForm";
import AfterCallScreen from "src/containers/AfterCallScreen";
import DashboardSchedule from "src/containers/DashboardSchedule";
import DashboardVer2 from "src/containers/DashboardVer2";
import DoctorForm from "src/containers/DoctorForm";
import DoctorProfile from "src/containers/DoctorProfile";
import Guest from "src/containers/Guest";
import HealthCheckPatient from "src/containers/HealthCheck";
import HealthCheckDetailPatient from "src/containers/HealthCheck/component/HealthCheckDetail";
import HealthCheckListing from "src/containers/HealthCheckList";
import Layout from "src/containers/Layout";
import Login from "src/containers/Login";
import VideoCall from "src/containers/VideoCall";

export const publicRoutes = [
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/account-form",
        name: "account-form",
        component: AccountForm,
    },
    {
        path: "/doctor-form",
        name: "doctor-form",
        component: DoctorForm,
    },
    {
        path: "/waiting-screen",
        name: "waiting-screen",
        component: WaitingScreen,
    },
    // {
    //     path: "/guest/:id",
    //     name: "Guest",
    //     component: Guest,
    // },
];
export const privateRoutes = [
    {
        path: "/d",
        name: "home",
        component: DashboardSchedule,
    },
    {
        path: "/schedule",
        name: "schedule",
        component: DashboardSchedule,
    },
    {
        path: "/",
        name: "home",
        component: DashboardVer2,
    },
    {
        path: "/doctors",
        name: "doctor",
        component: DoctorProfile,
    },
    {
        path: "/health-checks",
        name: "health-check",
        component: HealthCheckListing,
    },
    {
        path: "/health",
        name: "health",
        component: HealthCheckPatient,
    },
    {
        path: "/health-checks/:id",
        name: "healthCheckDetail",
        component: HealthCheckDetailPatient,
    },
];

export const privateWithNoLayouts = [
    {
        path: "/call/:id",
        name: "video-call",
        component: VideoCall,
    },
    {
        path: "/after-call",
        name: "after-call",
        component: AfterCallScreen,
    },
];

const RouteComponent = () => {
    return (
        <Switch>
            {publicRoutes.map((route) => (
                <PublicRoute
                    key={route.name}
                    exact={true}
                    path={route.path}
                    component={route.component}
                />
            ))}
            <Route path="/guest/:id?" exact component={Guest}></Route>
            <Route path="/call/:path?" exact>
                {privateWithNoLayouts.map((route) => (
                    <PrivateRoute
                        exact={true}
                        key={route.name}
                        path={route.path}
                        component={route.component}
                    />
                ))}
            </Route>
            <Route>
                <Layout>
                    <Switch>
                        {privateRoutes.map((route) => (
                            <PrivateRoute
                                exact={true}
                                key={route.name}
                                path={route.path}
                                component={route.component}
                            />
                        ))}
                    </Switch>
                </Layout>
            </Route>
        </Switch>
    );
};

export default RouteComponent;
