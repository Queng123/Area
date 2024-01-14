import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

import './Register.css';
import logo from '../../assets/logo.png';

export function Register() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();

    const initialFormData = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`${BASE_URL}/user/register/email`);
        const newErrors = { ...errors };

        if (formData.username === '') {
            newErrors.username = 'Please enter a username';
        } else {
            newErrors.username = '';
        }

        if (formData.email === '') {
            newErrors.email = 'Please enter an email address';
        } else {
            newErrors.email = '';
        }

        if (formData.password === '') {
            newErrors.password = 'Please enter an password';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must have at least 6 characters';
        } else {
            newErrors.password = '';
        }

        if (formData.confirmPassword === '') {
            newErrors.confirmPassword = 'Please confirm the password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Password do not match';
        } else {
            newErrors.confirmPassword = '';
        }

        if (newErrors.username === '' && newErrors.email === '' && newErrors.password === '' && newErrors.confirmPassword === '') {
            setErrorMessage('');
            setSuccessMessage('');
            try {
                const requestData = {
                    email: formData.email,
                    password: formData.password,
                    username: formData.username,
                };
                const response = await axios.post(`${BASE_URL}/user/register/email`, requestData);

                console.log('"Server response:', response.data);
                setSuccessMessage('Your account has been created. An email confirmation has been sent');

                setFormData(initialFormData);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError;
                    console.error('Error during POST request:', axiosError);

                    if (axiosError.response) {
                        if (axiosError.response.status === 404) {
                            setErrorMessage('An error occured with the server, Please try again later');
                        } else if (axiosError.response.status === 409) {
                            setErrorMessage('This email is already used');
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
    };

    const LoginRedirection = () => {
        navigate('/login');
    };

    return (
        <div className='register-background'>
            <div className='register-square'>
                <img src={logo} alt="Logo" className="logo" />
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                    <span className="error">{errors.username}</span>

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

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                    <span className="error">{errors.confirmPassword}</span>

                    <button className="register-button" type="submit">Register</button>
                </form>
                <div className="text-already-account">
                    Have an account?
                    <span className="blue-text-link" onClick={LoginRedirection}>Login Here</span>
                </div>
            </div>
        </div>
    );
}
