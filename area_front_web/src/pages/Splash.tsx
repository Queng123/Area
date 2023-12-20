import React from 'react';
import { useRedirectTimer } from '../hooks/useRedirectTimer';
import '../styles/Splash.css';
import logo from '../assets/logo.png';

export function Splash() {
    useRedirectTimer("/register", 2000);

    return (
        <div className="splash-container">
            <img src={logo} alt="Logo" className="logo-splash" />
        </div>
    );
}
