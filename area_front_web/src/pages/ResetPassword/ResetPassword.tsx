import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import './ResetPassword.css';
import logo from '../../assets/logo.png';

export function ResetPassword() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const [errorEmail, setErrorEmail] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    };

    const LoginRedirection = () => {
        navigate('/login');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (email === '') {
            setSuccessMessage('');
            setErrorMessage('');
            setErrorEmail('Please enter an email');
        } else {
            setErrorEmail('');
        }

        if (email != '') {
            setErrorMessage('');
            setSuccessMessage('');

            try {
                const requestData = {
                    email: email,
                };
                const response = await axios.post(`${BASE_URL}/user/reset-password`, requestData);

                console.log('"Server response:', response.data);
                setSuccessMessage('An email to reset your password has been sent.');
                setEmail('');
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError;
                    console.error('Error during POST request:', axiosError);

                    if (axiosError.response) {
                        setErrorMessage('An error occurred. Please try again later');
                    } else {
                        setErrorMessage('An error occurred. Please try again later');
                    }
                }
            }
        }
    };

    return (
        <div className='reset-password-background'>
            <div className='reset-password-square'>
                <img src={logo} alt="Logo" className="logo" />
                <span className="success-message">{successMessage}</span>
                <span className="error-message">{errorMessage}</span>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Address Email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <span className="error">{errorEmail}</span>
                    <button className="password-button" type="submit">Reset Password</button>
                </form>
                <div className="text-already-account">
                    Password Reset?
                    <span className="blue-text-link" onClick={LoginRedirection}>Login Here</span>
                </div>
            </div>
        </div>
    )
}
