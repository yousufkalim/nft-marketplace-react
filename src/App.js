import React from "react";
import MainLayout from "./components/Layout/Layout";
import AuthRouter from "./HOC/AuthRouter";
import PrivateRouter from "./HOC/PrivateRouter";
import AuthRoutes from "./Routes/AuthRoutes";
import { Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.scss";

function App() {
  return (
    <>
      <Switch>
        <AuthRouter path="/auth" component={AuthRoutes} />
        <PrivateRouter path="/" component={MainLayout} />
      </Switch>
    </>
  );
}

export default App;
