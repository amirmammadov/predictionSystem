import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const PublicRoutes = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};
export default PublicRoutes;
