import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './styles/Home.css';

export function Home() {
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const handleClick = async () => {
        const response = await axios.get(`${BASE_URL}/user/logout`);

        console.log('Server response:', response.data);
        console.log(`${BASE_URL}/user/logout`);
        navigate('/login');
    }

    const DeleteAccount = async () => {
        const response = await axios.delete(`${BASE_URL}/user`);

        console.log('Server response:', response.data);
        navigate('/login');
    }

    return (
        <div>
            <button className='button-circle' onClick={handleClick}>Log Out</button>
            <button className='button-circle' onClick={DeleteAccount}>Delete account</button>
        </div>
    )
}
