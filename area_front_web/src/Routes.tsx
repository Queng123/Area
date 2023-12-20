import { Route, Routes } from 'react-router-dom';

import { Splash } from './pages/Splash';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

export function RoutesManager() {
    return (
        <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
