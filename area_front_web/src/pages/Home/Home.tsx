import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Home.css';
import { ResetPassword } from '../ResetPassword/ResetPassword';
import 'boxicons';
import logo from '../../assets/logo.png';
import logoWhite from '../../assets/logoWhite.png';
import googleLogo from '../../assets/google.png';
import discordLogo from '../../assets/discord.png';
import githubLogo from '../../assets/github.png';
import deezerLogo from '../../assets/deezer.png';
import spotifyLogo from '../../assets/spotify.png';
import meteoLogo from '../../assets/meteo.png';
import mailerLogo from '../../assets/mailer.png';

interface Service {
    name: string;
    isConnected: boolean;
}

interface Reaction {
    name: string;
    description: string;
}

interface Action {
    name: string;
    description: string;
}

interface Area {
    action_id: string;
    reaction_id: string;
}

export function Home() {
    const navigate = useNavigate();
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSCOPE = process.env.GOOGLE_CLIENT_SCOPE;
    const clientIDdiscord = process.env.DISCORD_CLIENT_ID;
    const clientSCOPEdiscord = process.env.DISCORD_CLIENT_SCOPE;
    const clientIDgithub = process.env.GITHUB_CLIENT_ID;
    const clientSCOPEgithub = process.env.GITHUB_CLIENT_SCOPE;
    const clientIDdeezer = process.env.DEEZER_CLIENT_ID;
    const clientSCOPEdeezer = process.env.DEEZER_CLIENT_SCOPE;
    const clientSECRETdeezer = process.env.DEEZER_CLIENT_SECRET;
    const clientIDspotify = process.env.SPOTIFY_CLIENT_ID;
    const clientSCOPEspotify = process.env.SPOTIFY_CLIENT_SCOPE;
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [username, setUsername] = useState('');
    const [statusService, setStatusService] = useState<Service[]>([]);

    const [password, setPassword] = useState<string>('');

    const [isGoogleConnected, setIsGoogleConnected] = useState(false);
    const [isDiscordConnected, setIsDiscordConnected] = useState(false);
    const [isGithubConnected, setIsGithubConnected] = useState(false);
    const [isDeezerConnected, setIsDeezerConnected] = useState(false);
    const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);
    const [isMeteoConnected, setIsMeteoConnected] = useState(false);
    const [isMailerConnected, setIsMailerConnected] = useState(false);

    const [isDashboard, setDashboard] = useState(true);
    const [isSetting, setSetting] = useState(false);
    const [isCreateArea, setCreateArea] = useState(false);

    const [actions, setActions] = useState<string[]>([]);
    const [reactions, setReactions] = useState<string[]>([]);
    const [area, setArea] = useState<string[]>([]);

    const [selectedAction, setSelectedAction] = useState<string>('');
    const [selectedReaction, setSelectedReaction] = useState<string>('');
    const [displaySelection, setDisplaySelection] = useState<string>('');

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoad(true);
        }, 1000);
        return () => clearTimeout(timer);
    });

    const AddArea = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/area/${selectedAction}-${selectedReaction}`);
            setSelectedAction('Action');
            setSelectedReaction('Reaction');
            setErrorMessage('');
            setSuccessMessage('Area created')
        } catch (error) {
            setErrorMessage('Error during creation of the area');
            setSuccessMessage('')
        }
        loadArea();
    };

    const DeleteArea = async (item: string) => {
        const [name1, name2] = item.split(" - ");
        const firstName = name1.trim();
        const secondName = name2.trim();
        const response = await axios.delete(`${BASE_URL}/area/${firstName}-${secondName}`);
        loadArea();
    };

    const loadActions = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/actions`);
            const actionNames = response.data.actions.map((action: Action) => action.name);
            setActions(actionNames);
        } catch (error) {
            console.error('Error during load of actions:', error);
        }
    };

    const loadReactions = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/reactions`);
            const reactionNames = response.data.reactions.map((reaction: Reaction) => reaction.name);
            setReactions(reactionNames);
        } catch (error) {
            console.error('Error during load of reactions:', error);
        }
    };

    const loadArea = async () => {
        try {
            const response = await axios.get<{ message: Area[] }>(`${BASE_URL}/area`);

            if (response.status === 200) {
                const combinedData = response.data.message.map(item => `${item.action_id} - ${item.reaction_id}`);
                setArea(combinedData);
            } else {
                setArea([]);
            }
        } catch (error) {
            setArea([]);
        }
    };

    useEffect(() => {
        loadActions();
        loadReactions();
        loadArea();
        statusServices();
        fetchData();
    }, []);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const LogOut = async () => {
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
            loadActions();
            loadReactions();

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
                    case 'Deezer':
                        setIsDeezerConnected(service.isConnected);
                        break;
                    case 'Spotify':
                        setIsSpotifyConnected(service.isConnected);
                        break;
                    case 'Meteo':
                        setIsMeteoConnected(service.isConnected);
                        break;
                    case 'Mailer':
                        setIsMailerConnected(service.isConnected);
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

    const DeezerLogin = async () => {
        const authCallbackURL = encodeURIComponent(`${BASE_URL}/auth/deezer/callback`);
        const link = `https://connect.deezer.com/oauth/auth.php?client_id=${clientIDdeezer}&scope=${clientSCOPEdeezer}&redirect_uri=${authCallbackURL}&response_type=code&client_secret=${clientSECRETdeezer}`;

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

    const MeteoLogin = async () => {
        const response = await axios.get(`${BASE_URL}/auth/meteo`);
        console.log(response);
        statusServices();
    };

    const MailerLogin = async () => {
        const response = await axios.get(`${BASE_URL}/auth/mailer`);
        console.log(response);
        statusServices();
    };

    const sidebarPage = (tab: string) => {
        setDashboard(false);
        setCreateArea(false);
        setSetting(false);

        if (tab === 'Dashboard') {
            setDashboard(true);
        } else if (tab === 'Setting') {
            setSetting(true);
        } else if (tab === 'CreateArea') {
            setCreateArea(true);
        }
    }

    const HandleServices = (tab: string) => {
        if (tab === 'Github') {
            if (isGithubConnected) {
                DisconnectService(tab);
            } else {
                GithubLogin();
            }
        } else if (tab === 'Deezer') {
            if (isDeezerConnected) {
                DisconnectService(tab);
            } else {
                DeezerLogin();
            }
        } else if (tab === 'Spotify') {
            if (isSpotifyConnected) {
                DisconnectService(tab);
            } else {
                SpotifyLogin();
            }
        } else if (tab === 'Discord') {
            if (isDiscordConnected) {
                DisconnectService(tab);
            } else {
                DiscordLogin();
            }
        } else if (tab === 'Google') {
            if (isGoogleConnected) {
                DisconnectService(tab);
            } else {
                GoogleLogin();
            }
        } else if (tab === 'Mailer') {
            if (isMailerConnected) {
                DisconnectService(tab);
            } else {
                MailerLogin();
            }
        } else if (tab === 'Meteo') {
            if (isMeteoConnected) {
                DisconnectService(tab);
            } else {
                MeteoLogin();
            }
        }
    }

    return (
        isLoad ? (
            <div className='home-background'>
                <div className='home-sidebar'>
                    <div className='home-logo_content'>
                        <div className='home-logo'>
                            <img src={logoWhite} alt="Logo" className="white-logo" />
                            <div className='home-logo_name'>Area</div>
                        </div>
                    </div>
                    <ul className='home-nav-links'>
                        <li>
                            <a href='#' onClick={() => sidebarPage("Dashboard")}>
                                <i className='bx bx-grid-alt' ></i>
                                <span className='home-links-name'>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href='#' onClick={() => sidebarPage("CreateArea")}>
                                <i className='bx bx-plus-circle' ></i>
                                <span className='home-links-name'>Create Area</span>
                            </a>
                        </li>
                        <li>
                            <a href='#' onClick={() => sidebarPage("Setting")}>
                                <i className='bx bx-cog' ></i>
                                <span className='home-links-name'>Setting</span>
                            </a>
                        </li>
                    </ul>
                    <div className='home-profile_content'>
                        <div className='home-profile'>
                            <div className='home-profile_details'>
                                <div className='home-name_job'>
                                    <div className='home-name'>{username}</div>
                                    <div className='home-job'>User</div>
                                </div>
                            </div>
                            <i className='bx bx-log-out' id="log_out" onClick={LogOut}></i>
                        </div>
                    </div>
                </div>
                <div className='home-home_content'>
                    <div className='home-text'>
                        {isDashboard &&
                            <div className='home-square'>
                                <h2>Services</h2>
                                <div className="top-rectangle">
                                    <div className="services-container">
                                        <div className="service-item">
                                            <img
                                                src={githubLogo}
                                                alt="Logo"
                                                onClick={() => HandleServices('Github')}
                                                style={{ width: '90px', height: 'auto' }}
                                            />
                                            <h5 className='service-name'>GitHub</h5>
                                            {!isGithubConnected ? (
                                                <i className='bx bx-no-signal nosignal-icons'></i>
                                            ) : (
                                                <i className='bx bx-signal-5 signal-icons' ></i>
                                            )}
                                        </div>
                                        <div className="service-item">
                                            <img
                                                src={deezerLogo}
                                                alt="Logo"
                                                onClick={() => HandleServices('Deezer')}
                                                style={{ width: '100px', height: 'auto' }}
                                            />
                                            <h5 className='service-name'>Deezer</h5>
                                            {!isDeezerConnected ? (
                                                <i className='bx bx-no-signal nosignal-icons'></i>
                                            ) : (
                                                <i className='bx bx-signal-5 signal-icons' ></i>
                                            )}
                                        </div>
                                        <div className="service-item">
                                            <img
                                                src={spotifyLogo}
                                                alt="Logo"
                                                onClick={() => HandleServices('Spotify')}
                                                style={{ width: '90px', height: 'auto' }}
                                            />
                                            <h5 className='service-name'>Spotify</h5>
                                            {!isSpotifyConnected ? (
                                                <i className='bx bx-no-signal nosignal-icons'></i>
                                            ) : (
                                                <i className='bx bx-signal-5 signal-icons' ></i>
                                            )}
                                        </div>
                                        <div className="service-item">
                                            <img
                                                src={discordLogo}
                                                alt="Logo"
                                                onClick={() => HandleServices('Discord')}
                                                style={{ width: '90px', height: 'auto' }}
                                            />
                                            <h5 className='service-name'>Discord</h5>
                                            {!isDiscordConnected ? (
                                                <i className='bx bx-no-signal nosignal-icons'></i>
                                            ) : (
                                                <i className='bx bx-signal-5 signal-icons' ></i>
                                            )}
                                        </div>
                                        <div className="service-item">
                                            <img
                                                src={googleLogo}
                                                alt="Logo"
                                                onClick={() => HandleServices('Google')}
                                                style={{ width: '80px', height: 'auto', marginBottom: '10px' }}
                                            />
                                            <h5 className='service-name'>Google</h5>
                                            {!isGoogleConnected ? (
                                                <i className='bx bx-no-signal nosignal-icons'></i>
                                            ) : (
                                                <i className='bx bx-signal-5 signal-icons' ></i>
                                            )}
                                        </div>
                                        <div className="service-item">
                                            <img
                                                src={mailerLogo}
                                                alt="Logo"
                                                onClick={() => HandleServices('Mailer')}
                                                style={{ width: '90px', height: 'auto' }}
                                            />
                                            <h5 className='service-name'>Mailer</h5>
                                            {!isMailerConnected ? (
                                                <i className='bx bx-no-signal nosignal-icons'></i>
                                            ) : (
                                                <i className='bx bx-signal-5 signal-icons' ></i>
                                            )}
                                        </div>
                                        <div className="service-item">
                                            <img
                                                src={meteoLogo}
                                                alt="Logo"
                                                onClick={() => HandleServices('Meteo')}
                                                style={{ width: '100px', height: 'auto' }}
                                            />
                                            <h5 className='service-name'>Meteo</h5>
                                            {!isMeteoConnected ? (
                                                <i className='bx bx-no-signal nosignal-icons'></i>
                                            ) : (
                                                <i className='bx bx-signal-5 signal-icons' ></i>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <h2>Area List</h2>
                            <div className="red-square">
                                <div className="combined-list">
                                    {area.map((item, index) => (
                                        <div key={index} className="list-item">
                                        {item}
                                        <i className='bx bx-message-square-x red-icon' onClick={() => DeleteArea(item)}></i>
                                    </div>
                                    ))}
                                </div>
                            </div>
                            </div>
                        }
                        {isCreateArea &&
                            <div className='create-area-square'>
                                <h2>Area Creation</h2>
                                <div className="container-create-area">
                                    <div>
                                        <select className='custom-select' value={selectedAction} onChange={e => setSelectedAction(e.target.value)}>
                                            <option value="">Action</option>
                                            {actions.map(item => (
                                                <option key={item} value={item}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <select className='custom-select' value={selectedReaction} onChange={e => setSelectedReaction(e.target.value)}>
                                            <option value="">Reaction</option>
                                            {reactions.map(item => (
                                                <option key={item} value={item}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <button className='create-area-button' onClick={AddArea}>Add Area</button>
                                {successMessage && <div className="success-message">{successMessage}</div>}
                                {errorMessage && <div className="error-message">{errorMessage}</div>}
                            </div>
                        }
                        {isSetting &&
                            <div className='setting-square'>
                                <h2>Account Settings</h2>
                                <input
                                    className="custom-input"
                                    type="password"
                                    placeholder="New password"
                                />
                                <input
                                    className="custom-input"
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <button className="setting-button" onClick={UpdatePassword}>Update Information</button>
                                <button className="delete-account-button" onClick={DeleteAccount}>Delete Account</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        ) : (
            <div className='splash-background'>
                <div className="splash-position">
                    <img src={logo} alt="Logo" className="splash-logo" />
                </div>
            </div>
        )
    );
}
