import React from "react";
import { Route, Redirect, Link } from "react-router-dom";

export const PrivateRoute = ({ isLoggedIn, ...props }) => {
  return isLoggedIn ? <Link {...props} /> : <Redirect to="/users/login" />;
};

export const AuthRoute = ({ isLoggedIn, ...props }) => {
  console.log(props);
  return isLoggedIn ? <Redirect to="/blog" /> : <Link {...props} />;
};
