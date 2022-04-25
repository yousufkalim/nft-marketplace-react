import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Footer from "../components/Layout/Footer/Footer";
import Header from "../components/Layout/Header/Header";
import Login from "../pages/AuthPages/Login";
import SignUp from "../pages/AuthPages/SignUp";
import ForgotPassword from "../pages/AuthPages/ForgotPassword";
import '../components/Layout/Layout.scss';
const AuthRoutes = () => {
  return (
    <>
      <div className="Layout">
        <Header />
        <div className="auth-main-content">
          <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/signup" exact component={SignUp} />
            <Route path="/auth/forgotPassword" exact component={ForgotPassword}/>
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default AuthRoutes;
