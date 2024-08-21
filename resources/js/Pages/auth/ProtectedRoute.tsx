import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  isAllowed: boolean;
  redircetPath: string;
  children: ReactNode;
  data?: unknown;
}

const ProtectedRoute = ({
  isAllowed,
  redircetPath,
  children,
  data,
}: IProps) => {
  if (!isAllowed) return <Navigate to={redircetPath} state={data} replace />;

  return children;
};

export default ProtectedRoute;
