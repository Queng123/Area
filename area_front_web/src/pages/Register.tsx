import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './styles/Register.css';
import logo from '../assets/logo.png';

export function Register() {
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
            console.log("Is Valid");
            setFormData(initialFormData);
        }
        setErrors(newErrors);
    };

    const LoginRedirection = () => {
        navigate('/login');
    };

    return (
        <div className='body'>
            <div className='square'>
                <img src={logo} alt="Logo" className="logo" />
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
                    <span className="blue-text-link" onClick={LoginRedirection}>Login</span>
                </div>
            </div>
        </div>
    );
}
