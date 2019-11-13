import React, { Component } from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

import * as ROUTES from "../../../constants/routes";

class NavItems extends Component {
  render() {
    let navItems = (
      <ul className={classes.NavigationItems}>
        <NavigationItem link={ROUTES.FLAT}>Flat</NavigationItem>
        <NavigationItem link={ROUTES.PARKING}>Parking</NavigationItem>
        <NavigationItem link={ROUTES.MAINTENANCE}>Maintenance</NavigationItem>
        <NavigationItem link={ROUTES.SIGN_IN}>SignIn</NavigationItem>
      </ul>
    );

    if (this.props.isAuthenticated) {
      navItems = (
        <ul className={classes.NavigationItems}>
          <NavigationItem link={ROUTES.FLAT}>Flat</NavigationItem>
          <NavigationItem link={ROUTES.PARKING}>Parking</NavigationItem>
          <NavigationItem link={ROUTES.MAINTENANCE}>Maintenance</NavigationItem>
          <NavigationItem link={ROUTES.SIGN_OUT}>Logout</NavigationItem>
        </ul>
      );
    }

    return navItems;
  }
}

export default NavItems;
