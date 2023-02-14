import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NavBarLinkPartial from "../partial/NavBarLinkPartial";
import { authActions } from "../store/auth";
import { BsBootstrap } from "react-icons/bs";
import "../components/NavBarComponent.scss";

let links = [
  {
    label: "Home",
    url: "/",
  },

  {
    label: "About Us",
    url: "/aboutus",
  },
];

let authLinks = {
  isLoggedIn: [
    {
      label: "welcome",
      url: "/profile",
    },
    {
      label: "logout",
      url: "/logout",
    },
    {
      label: "Business Registration",
      url: "/businessregistration",
    },
  ],
  isLoggedOut: [
    {
      label: "Login",
      url: "/login",
    },
    {
      label: "Register",
      url: "/register",
    },
    {
      label: "Business ",
      url: "/businessregistration",
    },
  ],
};
let bizLinks = [
  {
    label: "Create card",
    url: "createbizcard",
  },
  {
    label: "My Cards",
    url: "mycards",
  },
];

const NavBarComponent = () => {
  const dispatch = useDispatch(); // useDispatch helps us to update redux
  const history = useHistory(); // useHistory helps us to navigate between pages
  const loggedIn = useSelector((state) => state.auth.loggedIn); // we call useSelector to give us the initial state
  const dataFromToken = useSelector((state) => state.auth.userData);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const handleLogoutBtnClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
    history.push("/login"); // when the user is logout then the function of history.push transfer the user to the login page.
  };
  const handleBizClick = () => {
    history.push("/businessregistration");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg mt-3">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Business Cards <BsBootstrap />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {links.map((item, idx) => (
              <NavBarLinkPartial
                key={"navlinks" + idx}
                label={item.label}
                link={item.url}
              />
            ))}
            {dataFromToken &&
              dataFromToken.biz &&
              bizLinks.map((item, idx) => (
                <NavBarLinkPartial
                  key={"navbarlinks" + idx}
                  label={item.label}
                  link={item.url}
                />
              ))}
          </ul>
          <form className="d-flex" role="search">
            {/* {loggedIn ? "Logout" : "Login/register"} */}
            {loggedIn ? (
              <Fragment>
                <button type="button" className="btn btn-light">
                  {"Welcome " + userInfo?.name}
                </button>
                <button
                  type="button"
                  className="btn btn-light ml-3"
                  onClick={handleLogoutBtnClick}
                >
                  Logout
                </button>
                <button
                  type="button"
                  className="btn btn-light ml-3"
                  onClick={handleBizClick}
                >
                  Business
                </button>
              </Fragment>
            ) : (
              authLinks.isLoggedOut.map((item, idx) => (
                <button
                  type="button"
                  key={"loggedOut" + idx}
                  className="btn btn-light"
                  onClick={() => {
                    history.push(item.url);
                  }}
                >
                  {item.label}
                </button>
              ))
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBarComponent;
