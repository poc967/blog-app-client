import React from "react";
import { Redirect, Link } from "react-router-dom";

export const PrivateRoute = ({ isLoggedIn, ...props }) => {
  return isLoggedIn ? (
    <Link to="#" {...props} />
  ) : (
    <Redirect to="/users/login" />
  );
};
