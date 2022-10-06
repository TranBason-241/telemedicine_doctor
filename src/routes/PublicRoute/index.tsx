import { Route, RouteProps, Redirect } from "react-router-dom";

import LocalStorageUtil from "src/utils/LocalStorageUtil";

const PublicRoute: React.FC<RouteProps> = (props: RouteProps) => {
    const user = LocalStorageUtil.getUser();
    if (!user?.email) {
        return <Route {...props} />;
    }

    if (typeof user === "string") {
        return <Redirect to="/account-form" />;
    }

    return <Redirect to="/" />;
};
export default PublicRoute;
