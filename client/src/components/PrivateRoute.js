import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.authReducer);

  return userInfo ? (
    <div>
      <Header />
      <Outlet />
    </div>
  ) : (
    <Navigate to={"/login"} replace />
  );
};

export default PrivateRoute;
