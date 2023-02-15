import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const Private = ({ children }) => {
  const token = useSelector((state) => state.authReducer.data.token);
  if (!token) {
    return <Navigate to={"/login"} />;
  } else {
    return children;
  }
};
