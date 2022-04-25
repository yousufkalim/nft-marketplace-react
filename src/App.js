import React, { useState,useEffect } from "react";
import MainLayout from "./components/Layout/Layout";
import AuthRouter from "./HOC/AuthRouter";
import PrivateRouter from "./HOC/PrivateRouter";
import AuthRoutes from "./Routes/AuthRoutes";
import { Switch } from "react-router-dom";
import "antd/dist/antd.css";
import { useDispatch } from "react-redux";
import { VerifyUser } from "./services/authServices";
import {
  LoginSuccess,
  setProfile,
  LoginFail,
  removeProfile,
} from "./store/auth/authActions";
import "./App.scss";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const fetchUserData = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      const user = await VerifyUser();
      if (user) {
        dispatch(LoginSuccess());
        dispatch(setProfile(user));
      } else {
        localStorage.removeItem("token");
        dispatch(LoginFail());
        dispatch(removeProfile());
      }
    } else {
      dispatch(LoginFail());
      dispatch(removeProfile());
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
     {!isLoading ? <Switch>
        <AuthRouter path="/auth" component={AuthRoutes} />
        <PrivateRouter path="/" component={MainLayout} />
      </Switch> 
    : ""  
    }
    </>
  );
}

export default App;
