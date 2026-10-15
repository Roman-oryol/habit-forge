import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthToken } from "@/hooks/use-auth-token";

function getRedirectTarget(state: unknown): string {
  if (typeof state === "object" && state !== null && "from" in state) {
    const from = (state as { from?: { pathname?: unknown } }).from;
    if (typeof from?.pathname === "string") return from.pathname;
  }
  return "/dashboard";
}

const PublicOnly = () => {
  const token = useAuthToken();
  const location = useLocation();

  if (token) {
    return <Navigate to={getRedirectTarget(location.state)} replace />;
  }

  return <Outlet />;
};
export default PublicOnly;
