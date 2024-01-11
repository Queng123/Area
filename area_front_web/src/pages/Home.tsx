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

interface Service {
    name: string;
    isConnected: boolean;
}

export function Home() {
    const navigate = useNavigate();
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSCOPE = process.env.GOOGLE_CLIENT_SCOPE;
    const clientIDdiscord = process.env.DISCORD_CLIENT_ID;
    const clientSCOPEdiscord = process.env.DISCORD_CLIENT_SCOPE;
    const clientIDgithub = process.env.GITHUB_CLIENT_ID;
    const clientSCOPEgithub = process.env.GITHUB_CLIENT_SCOPE;
    const clientIDmsteams = process.env.MSTEAMS_CLIENT_ID;
    const clientSCOPEmsteams = process.env.MSTEAMS_CLIENT_SCOPE;
    const clientSECRETmsteams = process.env.MSTEAMS_CLIENT_SECRET;
    const clientIDspotify = process.env.SPOTIFY_CLIENT_ID;
    const clientSCOPEspotify = process.env.SPOTIFY_CLIENT_SCOPE;
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [username, setUsername] = useState('');
    const [statusService, setStatusService] = useState<Service[]>([]);

    const [password, setPassword] = useState<string>('');

    const [isGoogleConnected, setIsGoogleConnected] = useState(false);
    const [isDiscordConnected, setIsDiscordConnected] = useState(false);
    const [isGithubConnected, setIsGithubConnected] = useState(false);
    const [isMsteamsConnected, setIsMsteamsConnected] = useState(false);
    const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);

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

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user`);
            const userData = response.data;
            setUsername(userData.message);
        } catch (error) {
            console.error('Error with the request GET', error);
        }
    };

    const statusServices = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/services`)
            const services: Service[] = JSON.parse(response.data.message);

            services.forEach((service) => {
                switch (service.name) {
                    case 'Google':
                        setIsGoogleConnected(service.isConnected);
                        break;
                    case 'Discord':
                        setIsDiscordConnected(service.isConnected);
                        break;
                    case 'Github':
                        setIsGithubConnected(service.isConnected);
                        break;
                    case 'Msteams':
                        setIsMsteamsConnected(service.isConnected);
                        break;
                    case 'Spotify':
                        setIsSpotifyConnected(service.isConnected);
                        break;
                    default:
                        break;
                }
            });

            setStatusService(services);
        } catch (error) {
            console.error('Error with the request GET');
        }
    }

    useEffect(() => {
        statusServices();
        fetchData();
    }, []);

    const DisconnectService = async (serviceName: string) => {
        const requestData = {
            data: { service: serviceName },
        };
        try {
            const response = await axios.delete(`${BASE_URL}/user/services`, requestData);
            console.log('Server response:', response.data);
            await statusServices();
        } catch (error) {
            console.error('Error with the DELETE request', error);
        }
    };

    const GoogleLogin = async () => {
        const authCallbackURL = encodeURIComponent(`${BASE_URL}/auth/google/callback`);
        const link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${authCallbackURL}&response_type=code&scope=${clientSCOPE}`;

        const canOpen = window.open(link, '_blank');
        if (canOpen) {
            canOpen.focus();
            const checkLogin = setInterval(async () => {
                await statusServices();
            }, 3000);
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
            const checkLogin = setInterval(async () => {
                await statusServices();
            }, 3000);
        }
        else {
            alert('Please allow popups for this website');
        }
        await statusServices();
    };

    const GithubLogin = async () => {
        const authCallbackURL = encodeURIComponent(`${BASE_URL}/auth/github/callback`);
        const link = `https://github.com/login/oauth/authorize?client_id=${clientIDgithub}&redirect_uri=${authCallbackURL}&scope=${clientSCOPEgithub}`;

        const canOpen = window.open(link, '_blank');
        if (canOpen) {
            canOpen.focus();
            const checkLogin = setInterval(async () => {
                await statusServices();
            }, 3000);
        }
        else {
            alert('Please allow popups for this website');
        }
    };

    const MsteamsLogin = async () => {
        const authCallbackURL = encodeURIComponent(`${BASE_URL}/auth/teams/callback`);
        const link = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientIDmsteams}&scope=${clientSCOPEmsteams}&redirect_uri=${authCallbackURL}&response_type=code&client_secret=${clientSECRETmsteams}`;

        const canOpen = window.open(link, '_blank');
        if (canOpen) {
            canOpen.focus();
            const checkLogin = setInterval(async () => {
                await statusServices();
            }, 3000);
        }
        else {
            alert('Please allow popups for this website');
        }
    };

    const SpotifyLogin = async () => {
        const authCallbackURL = encodeURIComponent(`${BASE_URL}/auth/spotify/callback`);
        const link = `https://accounts.spotify.com/authorize?client_id=${clientIDspotify}&response_type=code&redirect_uri=${authCallbackURL}&scope=${clientSCOPEspotify}`;

        const canOpen = window.open(link, '_blank');
        if (canOpen) {
            canOpen.focus();
            const checkLogin = setInterval(async () => {
                await statusServices();
            }, 3000);
        }
        else {
            alert('Please allow popups for this website');
        }
    };

    const CreateArea = () => {
        navigate('/home/area');
    };

    return (
        <div className='body'>
            <h1>Welcome, {username}</h1>
            <div className='square'>
                <div className="service-boxes">
                    <div className="service-box box-color">
                        <img src={googleLogo} alt="Logo" className='icons' onClick={GoogleLogin}/>
                        <div className='text'>{isGoogleConnected ? 'Connected' : 'Not Connected'}</div>
                        <button className='service-button' onClick={() => DisconnectService('Google')}>Logout</button>
                    </div>
                    <div className="service-box box-color">
                        <img src={discordLogo} alt="Logo" className='icons' onClick={DiscordLogin}/>
                        <div className='text'>{isDiscordConnected ? 'Connected' : 'Not Connected'}</div>
                        <button className='service-button' onClick={() => DisconnectService('Discord')}>Logout</button>
                    </div>
                    <div className="service-box box-color">
                        <img src={githubLogo} alt="Logo" className='icons' onClick={GithubLogin}/>
                        <div className='text'>{isGithubConnected ? 'Connected' : 'Not Connected'}</div>
                        <button className='service-button' onClick={() => DisconnectService('Github')}>Logout</button>
                    </div>
                    <div className="service-box box-color">
                        <img src={msteamsLogo} alt="Logo" className='icons' onClick={MsteamsLogin}/>
                        <div className='text'>{isMsteamsConnected ? 'Connected' : 'Not Connected'}</div>
                        <button className='service-button' onClick={() => DisconnectService('msteams')}>Logout</button>
                    </div>
                    <div className="service-box box-color">
                        <img src={spotifyLogo} alt="Logo" className='icons' onClick={SpotifyLogin}/>
                        <div className='text'>{isSpotifyConnected ? 'Connected' : 'Not Connected'}</div>
                        <button className='service-button' onClick={() => DisconnectService('Spotify')}>Logout</button>
                    </div>
                </div>
            </div>
            <button className='button-circle' onClick={CreateArea}>Create Area</button>
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
