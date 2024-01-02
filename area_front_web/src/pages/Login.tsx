import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

import './styles/Login.css';
import logo from '../assets/logo.png';
import googleLogo from '../assets/googleLogo.png';

export function Login() {
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const initialFormData = {
        email: '',
        password: '',
    };

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const [formData, setFormData] = useState(initialFormData);

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = { ...errors };

        if (formData.password === '') {
            newErrors.password = 'Please enter an password';
        } else {
            newErrors.password = '';
        }
        if (formData.email === '') {
            newErrors.email = 'Please enter an email';
        } else {
            newErrors.email = '';
        }

        if (newErrors.password === '' && newErrors.email === '') {
            setErrorMessage('');
            setSuccessMessage('');
            console.log(formData);

            try {
                const requestData = {
                    email: formData.email,
                    password: formData.password,
                };
                const response = await axios.post(`${BASE_URL}/user/login/email`, requestData);

                console.log('"Server response:', response.data);
                setSuccessMessage('You are Log In');
                navigate('/home');

                setFormData(initialFormData);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError;

                    if (axiosError.response) {
                        if (axiosError.response.status === 409) {
                            setErrorMessage('Error, user does not exist or already connected');
                        } else {
                            setErrorMessage('An error occurred. Please try again later');
                        }
                    } else {
                        setErrorMessage('An error occurred. Please try again later');
                    }
                }
            }
        }
        setErrors(newErrors);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const RegisterRedirection = () => {
        navigate('/');
    };

    return (
        <div className='body'>
            <div className='square'>
                <img src={logo} alt="Logo" className="logo" />
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Address Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <span className="error">{errors.email}</span>

                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <span className="error">{errors.password}</span>
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
