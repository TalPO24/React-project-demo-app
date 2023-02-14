import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import RegisterPage from "../pages/Register/RegisterForBusinessPage";
import LoginPage from "../pages/LoginPage";
import CondiotionPage from "../pages/ConditionPage";
import PanelPage from "../pages/MyCardsPage/MyCards";
import HomePage from "../pages/HomePage/HomePage";
import SideEffectPage from "../pages/SideEffectPage";
import BizCardPage from "../pages/BizCardPage";
import NavBarComponent from "../components/NavBarComponent";
import autoLogin from "../service/autoLogin";
import { authActions } from "../store/auth";
import jwt_decode from "jwt-decode";
import { Route, Switch } from "react-router-dom";
import MoreInfoBizCardPage from "../pages/MoreInfoBizCardPage";
import EditBizCardPage from "../pages/EditBizCardPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthGuardRoute from "../components/AuthGuardComponent";
import QParamsPage from "../pages/QParamsPage";
import QParamsPageFilter from "../pages/QParamsPageFilter";
import Footer from "../components/FooterComponent/FooterComponent";
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage";
import RegisterForBusinessPage from "../pages/Register/RegisterForBusinessPage";
import Register from "../pages/Register/Register";
import CreateBusinessCard from "../pages/CreateBusinessCardPage";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        let { data } = await autoLogin();
        let dataFromToken = jwt_decode(localStorage.getItem("token"));
        dispatch(authActions.login(dataFromToken));
        if (data) {
          dispatch(authActions.updateUserInfo(data));
        }
      } catch (err) {
        console.log("you not logged in");
      }
    })();
  }, []);

  return (
    <div className="container">
      <ToastContainer />

      <NavBarComponent />

      <Switch>
        <Route path="/" exact component={HomePage}></Route>
        <Route path="/aboutus" component={AboutUsPage}></Route>
        <Route path="/login" component={LoginPage}></Route>
        {/* <Route path="/panelPage" component={PanelPage}></Route> */}
        <AuthGuardRoute path="/mycards" component={PanelPage}></AuthGuardRoute>
        <Route path="/registration" component={Register}></Route>
        <Route
          path="/businessregistration"
          component={RegisterForBusinessPage}
        ></Route>
        <Route path="/createbizcard" component={CreateBusinessCard}></Route>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/register" component={Register}></Route>
        <AuthGuardRoute
          path="/editbizcard/:id"
          component={EditBizCardPage}
        ></AuthGuardRoute>
        <Route path="/qparams" component={QParamsPage}></Route>
        <Route path="/qparamsfilter" component={QParamsPageFilter}></Route>
        <Route path="/moreinfo/:id" component={MoreInfoBizCardPage}></Route>
        <Route path="*" component={NotFoundPage}></Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
