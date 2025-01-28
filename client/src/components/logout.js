import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function LogoutButton() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];

        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        //? Kas lege muud viisi selle tegemiseks pole?
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';

        navigate('/Profile');
        window.location.reload();
    };

    if (!isLoggedIn) {
        return null;
    }

    return (
            <button 
                onClick={handleLogout}
                style={{
                    backgroundColor: 'red',
                    margin: 'auto',
                    color: 'white', 
                    border: 'none',
                    height: '80%',
                    padding: '8px 15px', 
                    cursor: 'pointer',
                    fontSize: '14px'
                }}>
                Log Out
            </button>
    );
}