import React, { useState } from 'react';
import '../styles/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';

export const Login: React.FC = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/register');
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
        navigate('/home');
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
                        <button type='submit' className='btn btn-success w-50 mt-2 bg-dark'>Login</button>
                        <div>
                            <button className="blue-button" onClick={handleButtonClick}>No account ?</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

