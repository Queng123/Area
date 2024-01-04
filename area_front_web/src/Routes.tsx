import { Route, Routes } from 'react-router-dom';

import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Reset_Password } from './pages/Reset_Password';
import { NotFound } from './pages/NotFound';

export function RoutesManager() {
    return (
        <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/reset-password" element={<Reset_Password />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
