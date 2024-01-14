import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Splash.css';
import logo from '../../assets/logo.png';

export function Splash() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 2000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className='splash-background'>
            <div className="splash-position">
                <img src={logo} alt="Logo" className="splash-logo" />
            </div>
        </div>
    );
}
