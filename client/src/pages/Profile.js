import '../App.css';
import { useEffect, useState } from 'react'
import Header from '../components/header';
import LogIn from '../components/logIn';
import Register from '../components/reg';
import UserData from '../components/userData';
import CreateOffer from '../components/createOffer';
import PurchaseHistory from '../components/purchaseHistory';

//VÄGA IMPORTANT
//VÄGA IMPORTANT
//VÄGA IMPORTANT
//VÄGA IMPORTANT
//VÄGA IMPORTANT
//VÄGA IMPORTANT
//VÄGA IMPORTANT
// ma kuidagi fuck uppisin selle faili ja server.py's oleva jwt-de tegemise/kasutamise/valideerimise loogika
// selle rikkus algselt ära Commit 39a90f4
// ehk töötav versioon on üks enne seda ehk Commit 39a90f4
// praeguses commitis loginimine ikka ei tööta ja kui ma homme seda ara parandada ei suuda siis ma lih votan vanast commitist need failid

//muidu see fail on suht vahe muudetud aga back-endis on loogika semi different ja ma enam ei geti mis seal toimub
//ima go sleep

function Profile() {

    const [userData, setUserData] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);

    useEffect(() => {
        async function fetchUserData() {
            //const response = await fetch(`/api/Profile?user_id=${userId}`, {
            const response = await fetch('/api/Profile', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else {
                setUserData(false)
            }
        }

        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
        }

        let token = getCookie('token');

        console.log(!token)

        let userId = getCookie('user_id');

        if (!token || !userId) {
            setUserData(false)
            return
        }

        fetchUserData();
    }, [document.cookie]);

    if (userData === null) {
        return <div>
            <Header />
        </div>
    }

    userData.purchases = []

    //Suht horisontaalne kood. Nii lõbus
    //Mu auto formatter isegi ei toota enam
    return (
        <div className="Profile">
            <Header />
            <div className='scrollable'>
                {!userData ? (
                    <div>
                        {isRegistering ? (
                            <div>
                                <Register />
                                <p>
                                    Already have an account?{' '}
                                    <button
                                        className="toggle-button"
                                        onClick={() => setIsRegistering(false)}
                                    >
                                        Log in here
                                    </button>
                                </p>
                            </div>
                        ) : (
                            <div>
                                <LogIn />
                                <p>
                                    Don’t have an account?{' '}
                                    <button
                                        className="toggle-button"
                                        onClick={() => setIsRegistering(true)}
                                    >
                                        Register here
                                    </button>
                                </p>
                            </div>
                        )}
                    </div>
                ) : <div>
                    <UserData data={userData} />
                    <PurchaseHistory offers={userData.purchases} />
                    <CreateOffer />
                </div>
                }
            </div>
        </div>
    );
}

export default Profile;
