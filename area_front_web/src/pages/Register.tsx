import React, { useState } from 'react';
import './styles/Register.css';
import logo from '../assets/logo.png';

export function Register() {

    return (
        <div className='body'>
            <div className='square'>
                <img src={logo} alt="Logo" className="logo" />
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Address Email" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
                <button className="register-button">Register</button>
                <div className="text-already-account">
                    Have an account?
                    <span className="blue-text-link">Login</span>
                </div>
            </div>
        </div>
    );
}
