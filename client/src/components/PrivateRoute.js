import React from "react";
import { Route, Navigate } from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? <Route {...props} /> : <Navigate to={LOGIN_ROUTE} />;
};

export default PrivateRoute;
