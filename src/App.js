import React, { useState, useEffect } from 'react'
import Login from './Screen/Login';
import Signup from "./Screen/SignUp"
import ForgetPassword from "./Screen/ForgetPassword"
import Dashboard from "./Screen/Dashboard"
import {
  Switch,
  Route,
  useLocation,
  useHistory
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyledEngineProvider } from "@mui/material";
const App = () => {
  const history=useHistory()
  const location=useLocation()
  const data=window.localStorage.getItem("sessionToken")
  return (
    <StyledEngineProvider injectFirst>
        <Switch location={location} key={location.pathname} >
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/Signup">
            <Signup />
          </Route>
          <Route path="/ForgetPassword">
            <ForgetPassword />
          </Route>
          <Route path="/Dashboard">
            <Dashboard />
          </Route>
        </Switch>
      <ToastContainer />
    </StyledEngineProvider>
  );
}

export default App;
