import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './styles/Home.css';
import logo from '../assets/logo.png';
import googleLogo from '../assets/google.png';
import discordLogo from '../assets/discord.png';
import githubLogo from '../assets/github.png';
import msteamsLogo from '../assets/msteams.png';
import spotifyLogo from '../assets/spotify.png';

export function Home() {
    const navigate = useNavigate();
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSCOPE = process.env.GOOGLE_CLIENT_SCOPE;
    const clientIDdiscord = process.env.DISCORD_CLIENT_ID;
    const clientSCOPEdiscord = process.env.DISCORD_CLIENT_SCOPE;
    const clientIDgithub = process.env.GITHUB_CLIENT_ID;
    const clientSCOPEgithub = process.env.GITHUB_CLIENT_SCOPE;
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [username, setUsername] = useState('');

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user`);
                const userData = response.data;
                setUsername(userData.message);
                console.log('Username:', username);
                console.log('Server responsssse:', response.data);
            } catch (error) {
                console.error('Erreur lors de la requête GET', error);
            }
        };

        fetchData();
    }, []);

    const GoogleLogin = async () => {
        const authCallbackURL = encodeURIComponent(`${BASE_URL}/auth/google/callback`);
        const link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${authCallbackURL}&response_type=code&scope=${clientSCOPE}`;

        const canOpen = window.open(link, '_blank');
        if (canOpen) {
            canOpen.focus();
        }
        else {
            alert('Please allow popups for this website');
        }
    };

    const DiscordLogin = async () => {
        const authCallbackURL = encodeURIComponent(`${BASE_URL}/auth/discord/callback`);
        const link = `https://discord.com/api/oauth2/authorize?client_id=${clientIDdiscord}&redirect_uri=${authCallbackURL}&response_type=code&scope=${clientSCOPEdiscord}`;

        const canOpen = window.open(link, '_blank');
        if (canOpen) {
            canOpen.focus();
        }
        else {
            alert('Please allow popups for this website');
        }
    };

    const GithubLogin = async () => {
        const authCallbackURL = encodeURIComponent(`${BASE_URL}/auth/github/callback`);
        const link = `https://github.com/login/oauth/authorize?client_id=${clientIDgithub}&redirect_uri=${authCallbackURL}&scope=${clientSCOPEgithub}`;

        const canOpen = window.open(link, '_blank');
        if (canOpen) {
            canOpen.focus();
        }
        else {
            alert('Please allow popups for this website');
        }
    };

    const MsteamsLogin = async () => {
        console.log("Msteams");
    };

    const SpotifyLogin = async () => {
        console.log("Spotify");
    };

    return (
        <div className='body'>
            <h1>Welcome, {username}</h1>
            <div className='square'>
                <div className="service-boxes">
                    <div className="service-box box-color">
                        <img src={googleLogo} alt="Logo" className='icons' onClick={GoogleLogin}/>
                    </div>
                    <div className="service-box box-color">
                        <img src={discordLogo} alt="Logo" className='icons' onClick={DiscordLogin}/>
                    </div>
                    <div className="service-box box-color">
                        <img src={githubLogo} alt="Logo" className='icons' onClick={GithubLogin}/>
                    </div>
                    <div className="service-box box-color">
                        <img src={msteamsLogo} alt="Logo" className='icons' onClick={MsteamsLogin}/>
                    </div>
                    <div className="service-box box-color">
                        <img src={spotifyLogo} alt="Logo" className='icons' onClick={SpotifyLogin}/>
                    </div>
                </div>
            </div>
            <div className='button-container'>
                <button className='button-circle' onClick={handleClick}>Log Out</button>
                <button className='button-circle' onClick={DeleteAccount}>Delete account</button>
            </div>
            <div className='update-password-container'>
                <button className='button-circle' onClick={UpdatePassword}>Update Password</button>
                <input
                    type='password'
                    placeholder='enter new password'
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>

        </div>
    )
}
