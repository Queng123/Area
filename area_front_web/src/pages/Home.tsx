import React from 'react';
import '../styles/Home.css';
import logo from '../assets/logo.png';

export function Home() {
    return (
        <div className="image-container">
            <img src={logo} alt="Image à faire tourner" className="rotating-image" />
        </div>
    );
}
