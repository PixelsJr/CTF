import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from '../components/header';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
    const checkToken = async () => {
      const token = getCookie('token');
      
      if (token) {
        try {
          const response = await fetch('/api/is_admin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Error validating token', error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      
      setLoading(false);
    };

    checkToken();
    }, []);

    if (loading) {
        return <div>Checking for admin status...</div>;
    }

    if (!isAuthenticated) {
        return <div>Page denied. You are not admin</div>;
    }


    return (
        <div className="Admin">
            <Header />
            <h1>Amazing, you truly are the admin of this page!</h1>
        </div>
    );
}

export default Admin;
