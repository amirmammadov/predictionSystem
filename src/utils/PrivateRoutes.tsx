import { Outlet, Navigate } from "react-router-dom";

import { AuthActions } from "../services/auth";

const PrivateRoutes = () => {
  const { getToken } = AuthActions();

  const token = getToken("access");

  return token ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
