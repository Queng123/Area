import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useRedirectTimer(path: string, delay: number) {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(path);
        }, delay);

        return () => clearTimeout(timer);
    }, [path, delay]);
}
