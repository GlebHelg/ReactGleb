import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="burger-builder-link" active={true}>BurgerBuilder</NavigationItem>
        <NavigationItem link="drinks-link">Drinks</NavigationItem>
        <NavigationItem link="checkout-link">Checkout</NavigationItem>
    </ul>
);

export default navigationItems;