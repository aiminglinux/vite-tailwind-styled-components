import { Navigate, Outlet } from "react-router-dom";

import useRequireAuthen from "../../hooks/useRequireAuthen";

const RequireAuthen = () => {
  const { isAuthed, handleAuth } = useRequireAuthen();
  if (!isAuthed) handleAuth();
  return isAuthed ? <Outlet /> : <Navigate to="/" replace="true" />;
};

export default RequireAuthen;
