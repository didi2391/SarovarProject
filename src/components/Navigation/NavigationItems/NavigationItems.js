import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

import * as ROUTES from "../../../constants/routes";

const navItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link={ROUTES.USER}>User</NavigationItem>
    {!props.isAuthenticated ? (
      <NavigationItem link={ROUTES.SIGN_IN}>SignIn</NavigationItem>
    ) : (
      <NavigationItem link={ROUTES.SIGN_OUT}>Logout</NavigationItem>
    )}
  </ul>
);

export default navItems;
