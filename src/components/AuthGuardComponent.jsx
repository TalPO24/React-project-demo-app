import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";

const AuthGuardRoute = ({ component: Page, ...rest }) => {
  // protect the route // ...rest = rest return us the rest of the data that we need like path and other stuff
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  return (
    <Route
      {...rest}
      render={
        (props) =>
          loggedIn ? (
            <Page {...props}></Page>
          ) : (
            <Redirect to="/login"></Redirect>
          ) //if loggedIn direct to panel if not redirect to login
      }
    ></Route>
  );
};

export default AuthGuardRoute;
