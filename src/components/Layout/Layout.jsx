import { Switch, Route } from "react-router-dom";
import React from "react";
import "./Layout.scss";
import { userRoutes } from "../../Routes/userRoutes";
import Header from "./Header/Header";

const MainLayout = () => {
  return (
    <div className="Layout">
      <Header/>
      <div className="main-content">
        <Switch>
          {userRoutes.map((route, key) => (
            <Route
              path={route?.path}
              component={route?.component}
              exact
              key={key}
            />
          ))}
        </Switch>
      </div>
    </div>
  );
};

export default MainLayout;
