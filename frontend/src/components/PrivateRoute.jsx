import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;


// Navigate is used to navigate to a different route, in this case, redirecting to the login page.

// Outlet is a placeholder used by React Router to render nested routes (i.e., the components for protected pages).

//checks if the user is logged in, if yes then redirect them to the page they are asking for, and if not redirect them to the login page

//(state) => state.auth is a function that receives the entire Redux state (state) and then returns the auth slice of that state.
// Then, const { userInfo } destructures userInfo from the auth slice.

// If userInfo exists (i.e., the user is logged in), it renders the <Outlet /> component, which will display the child route that the user is trying to access.

// If userInfo does not exist (i.e., the user is not logged in), it redirects the user to the login page (/login) using the <Navigate /> component. The replace prop ensures that the navigation does not add the redirect route to the browser's history.