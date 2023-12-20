import React, { useState } from 'react';
import '../styles/Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';

export const Register: React.FC = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/login');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        if (formData.password !== formData.confirmPassword) {
            return;
        }
        navigate('/home');
        const url = 'http://localhost:3000/user/register/email';
        const headers = {
            'accept': '*/*',
            'Content-Type': 'application/json',
        };
        const data = {
            email: formData.email,
            password: formData.password,
        };
        axios.post(url, data, { headers })
        .then((response) => {
            console.log('Réponse de l\'API:', response.data);
            console.log(response.status);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className='wrapper bg-dark d-flex align-items-center justify-content-center'>
            <div className="login text-center">
                <img src={logo} alt="Logo" className="logo" style={{ width: '60%', height: 'auto' }}/>
                <form className='needs-validation' onSubmit={handleSubmit}>
                    <div className='centered-form-group'>
                        <div className='form-group was-validated w-50 mb-2'>
                            <label htmlFor='email' className='form-label'>Email Address</label>
                            <input type="email" className='form-control' required name="email" onChange={handleInputChange}></input>
                            <div className='invalid-feedback'>
                                Please Enter your email
                            </div>
                        </div>
                        <div className='form-group was-validated w-50 mb-2'>
                            <label htmlFor='password' className='form-label'>Password</label>
                            <input type="password" className='form-control' required name="password" onChange={handleInputChange}></input>
                            <div className='invalid-feedback'>
                                Please Enter your password
                            </div>
                        </div>
                        <div className='form-group was-validated w-50 mb-2'>
                            <label htmlFor='password' className='form-label'>Confirm Password</label>
                            <input type="password" className='form-control' required name="confirmPassword" onChange={handleInputChange}></input>
                            <div className='invalid-feedback'>
                                Please Confirm your password
                            </div>
                        </div>
                    </div>
                    {formData.password !== formData.confirmPassword && (
                        <div className='text-danger'>
                            Password are not the same.
                        </div>
                    )}
                    <button type='submit' className='btn btn-success w-50 mt-2 bg-dark'>Register</button>
                    <div>
                        <button className="already-button" onClick={handleButtonClick}>Already an account ?</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
