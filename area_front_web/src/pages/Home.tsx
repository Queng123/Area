import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './styles/Home.css';

export function Home() {
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [password, setPassword] = useState<string>('');

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

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

    const UpdatePassword = async () => {
        const requestData = {
            password: password,
        };
        console.log(requestData);
        const response = await axios.post(`${BASE_URL}/user/update-password`, requestData);
        console.log('Server response:', response.data);
        setPassword('');
    }
    return (
        <div>
            <button className='button-circle' onClick={handleClick}>Log Out</button>
            <button className='button-circle' onClick={DeleteAccount}>Delete account</button>
            <button className='button-circle' onClick={UpdatePassword}>Update Password</button>
            <label>New Password :</label>
            <input
                type='password'
                placeholder='enter new password'
                value={password}
                onChange={handlePasswordChange}
            />
        </div>
    )
}
