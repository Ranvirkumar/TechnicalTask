import React from "react";
import { Redirect, Route } from "react-router-dom";
import firebase from './../firebase';

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const isAuthenticated = firebase.auth().currentUser?.email

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
}

export default ProtectedRoute