import { Route, Routes } from 'react-router-dom';

import { Register } from './pages/Register';

function NotFound() {
    return (
        <div>
            <h2>Invalid URL</h2>
        </div>
    )
}

export function RoutesManager() {
    return (
        <Routes>
            <Route path="/" element={<Register />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
