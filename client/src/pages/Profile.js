import '../App.css';
import { useEffect, useState } from 'react'
import Header from '../components/header';
import LogIn from '../components/logIn';

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
				: <div className="profile-container">
					<h1>Welcome, {userData.username}!</h1>
					<p><strong>User id:</strong> {userData.id}</p>
				</div>
			}
		</div>
	)
}

export default Profile;
