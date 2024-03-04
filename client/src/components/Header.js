import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/auth/authApiSlice";
import { logOutUser } from "../slices/auth/authSlice";
import { useNavigationHelper } from "../utils/commonHelper";
// addPaper
const Header = () => {
  //misc
  const { userInfo } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigateTo = useNavigationHelper();

  //queries n mutation
  const [logout, { isLoading }] = useLogoutMutation();

  //func
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logOutUser());
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "50%",
        margin: "30px auto",
      }}
    >
      <strong onClick={() => navigateTo("/")}>
        {userInfo ? userInfo?.username : ""}
      </strong>
      <button onClick={() => navigateTo("addPaper")} disabled={isLoading}>
        Add Paper
      </button>
      <button onClick={handleLogout} disabled={isLoading}>
        Logout
      </button>
    </div>
  );
};

export default Header;
