import React, { useState, useEffect } from 'react'
import Login from './Screen/Login';
import Signup from "./Screen/SignUp"
import ForgetPassword from "./Screen/ForgetPassword"
import {
    Switch,
    Route,
    useLocation,
} from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import firebase from './firebase';
const Authenctication = () => {
    const location = useLocation()
    const isAuthenticated = firebase.auth().currentUser?.email
    return (
        <StyledEngineProvider injectFirst>
            <Switch location={location} key={location.pathname} >
                {!isAuthenticated && <Route exact path="/" component={Login} />}
                <Route path="/Signup" component={Signup} />
                <Route path="/ForgetPassword" component={ForgetPassword} />
            </Switch>
        </StyledEngineProvider>
    );
}

export default Authenctication;
