import '../App.css';
import { useEffect, useState } from 'react'
import Header from '../components/header';
import LogIn from '../components/logIn';
import UserData from '../components/userData';

function Profile() {

	const [userData, setUserData] = useState(null);

	useEffect(() => {
		async function fetchUserData() {
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

		if (!token){
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

	return (
		<div className="Profile">
			<Header />
			{!userData
				? <LogIn />
				: <UserData data={userData} />
			}
		</div>
	)
}

export default Profile;
