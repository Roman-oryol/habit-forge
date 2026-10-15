import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthToken } from "@/hooks/use-auth-token";

const RequireAuth = () => {
  const token = useAuthToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
export default RequireAuth;
