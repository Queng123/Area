import { Route, Routes } from 'react-router-dom';

import { Splash } from './pages/Splash/Splash';
import { Register } from './pages/Register/Register';
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { ResetPassword } from './pages/ResetPassword/ResetPassword';
import { NotFound } from './pages/NotFound/NotFound';
import {DownloadFile} from './pages/DownloadMobile';

export function RoutesManager() {
    return (
        <Routes>
            <Route path='/' element={<Splash />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login/reset-password' element={<ResetPassword />} />
            <Route path='/home' element={<Home />} />
            <Route path="/client.apk" element={<DownloadFile />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
