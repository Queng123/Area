import React, { useState } from 'react';

import './styles/Login.css';
import logo from '../assets/logo.png';
import googleLogo from '../assets/googleLogo.png';

export function Login() {
    return (
        <div className='body'>
            <div className='square'>
                <img src={logo} alt="Logo" className="logo" />
                <form className="form">
                    <input
                        type="email"
                        placeholder="Address Email"
                        name="email"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                    <span className="forgot-password">Forgot Password?</span>

                    <button className="login-button" type="submit">Login</button>
                </form>
                <div className="separator-text">Or continue with</div>
                <img src={googleLogo} alt="Google Logo" className="google-logo" />
                <div className="text-already-account">
                    Not a member?
                    <span className="blue-text-link" >Register here</span>
                </div>
            </div>
        </div>
    );
};
