import { Outlet, Navigate } from "react-router-dom";

import { AuthActions } from "../services/auth";

const PublicRoutes = () => {
  const { getToken } = AuthActions();

  const token = getToken("access");

  return token ? <Navigate to="/" /> : <Outlet />;
};
export default PublicRoutes;
