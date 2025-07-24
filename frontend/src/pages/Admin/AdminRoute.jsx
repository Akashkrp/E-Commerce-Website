
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
export default AdminRoute;


// diff from PrivateRoutes file as that checked if the user is logged in or not and hence redirceted him to login page
// here it checks if it is logged in as an Admin, this is not added as a component for readability 
