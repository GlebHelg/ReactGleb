import React, { useRef } from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';


const webMobile = () => {
    const webMobileOut = document.querySelector('#webMobId');
    webMobileOut.textContent =  window.innerWidth > 500 ?"WEB":"MOBILE";
}

window.onresize = webMobile;

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <p id="webMobId" ></p>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar; 