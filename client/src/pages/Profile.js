import '../App.css';
import { useEffect, useState } from 'react'
import Header from '../components/header';
import LogIn from '../components/logIn';
import Register from '../components/reg';
import UserData from '../components/userData';
import CreateOffer from '../components/createOffer';
import PurchaseHistory from '../components/purchaseHistory';
import CreatedOffers from '../components/createdOffers';
import InfoBox from '../components/infoBox';

function Profile() {

    const [userData, setUserData] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);

    const [infoBoxMessage, setInfoBoxMessage] = useState('');
    const [infoBoxSuccess, setInfoBoxSuccess] = useState(false);

    const [offerSecret, setOfferSecret] = useState(null);
    const [flag, setFlag] = useState(null);

    async function informationBox(obj, message, success, delay=2000){

		function timeout(delay) {
			return new Promise( res => setTimeout(res, delay) );
		}

        const infoBoxObj = obj
        infoBoxObj.style.display = 'flex'

        setInfoBoxSuccess(success)
        setInfoBoxMessage(message)

        infoBoxObj.style.display = 'flex'

        await timeout(delay);
        infoBoxObj.style.opacity = 0
        await timeout(500);
        infoBoxObj.style.zIndex = -100
        await timeout(500);
        infoBoxObj.style.display = 'none'
		infoBoxObj.style.opacity = 1
		infoBoxObj.style.zIndex = 100
    }

	async function successBox(message, state){
        const infoBoxObj = document.getElementById('infoBox')
		informationBox(infoBoxObj, message, state, 2000)
    }

    useEffect(() => {
        async function formatImages(offers){
            for(var i in offers){
                var offer = offers[i]
                const filename = offer.image
				if (filename.startsWith("http")) {
					continue
				}

				const imageResponse = await fetch(`/api/get_image.php?filename=${filename}`);
				if (imageResponse.ok) {
					// Convert the image to a blob and create an object URL
					const { image, error } = await imageResponse.json();
					if (image) {
						offer.image = `data:image/jpeg;base64,${image}`;
					} else {
						offer.image = '';
					}
				} else {
					offer.image = '';
				}
            }
            return offers
        }
        async function fetchUserData() {
            const response = await fetch('/api/Profile', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                var a = formatImages(data.created_offers)
                var b = formatImages(data.purchases)
                checkOfferSecret(data.purchases);
                if (data.id === 4) {
                    fetchFlag(data.id);
                }
                data.created_offers = await a
                data.purchase = await b
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

        let userId = getCookie('user_id');

        if (!token || !userId) {
            setUserData(false)
            return
        }

        fetchUserData();
    }, []);

    const checkOfferSecret = (purchases) => {
        const offer = purchases.find((purchase) => purchase.id === 8);
        if (offer) {
            setOfferSecret(offer.secret);
        } else {
            setOfferSecret(null);
        }
    };

    async function fetchFlag(userId) {
        const response = await fetch(`/api/flag/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            setFlag(data.flag);
        } else {
            console.error("Failed to fetch flag for user ID 4.");
        }
    }

    if (userData === null) {
        return <div>
            <Header />
        </div>
    }

    //Suht horisontaalne kood. Nii lõbus
    //Mu auto formatter isegi ei toota enam
    return (
        <div className="Profile">
            <Header cash={userData.money} />
            <InfoBox success={infoBoxSuccess} message={infoBoxMessage} />
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
                    <CreatedOffers offers={userData.created_offers} />
                    <CreateOffer successBox={successBox} />
                    {offerSecret && (
                        <div className="offer-secret">
                            <h3>Flag:</h3>
                            <p>{offerSecret}</p>
                        </div>
                    )}
                    {flag && (
                        <div className="user-flag">
                            <h3>Flag:</h3>
                            <p>{flag}</p>
                        </div>
                    )}
                </div>
                }
            </div>
        </div>
    );
}

export default Profile;
