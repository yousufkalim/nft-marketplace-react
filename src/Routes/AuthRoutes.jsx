import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignUp from "../pages/AuthPages/SignUp";
const AuthRoutes = () => {
  return (
    <>
     <Switch>
      {/* <Route path="/auth/login" exact component={LoginPage} /> */}
      <Route path="/auth/signup" exact component={SignUp} />
      <Redirect from="/auth" to="/auth/signup" />
    </Switch>
    </>
  );
};
export default AuthRoutes;
