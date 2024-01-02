import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './styles/Login.css';
import logo from '../assets/logo.png';
import googleLogo from '../assets/googleLogo.png';

import './styles/Login.css';
import logo from '../assets/logo.png';
import googleLogo from '../assets/googleLogo.png';

export function Login() {
    const navigate = useNavigate();

    const RegisterRedirection = () => {
        navigate('/');
    };

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
                    <span className="blue-text-link" onClick={RegisterRedirection}>Register here</span>
                </div>
            </div>
        </div>
    );
};
