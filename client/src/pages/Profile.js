import '../App.css';
import { Profiler, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';  // To redirect if the user is not authenticated
import Header from '../components/header';
import LogIn from '../components/logIn';

function Profile() {

	const [userData, setUserData] = useState(null);  // State to store profile data
	const [loading, setLoading] = useState(true);    // To handle loading state
	const [error, setError] = useState("");          // To handle any errors
	const navigate = useNavigate();                  // For redirecting the user

	

	useEffect(() => {
		const token = localStorage.getItem('jwtToken');  // Get the JWT token from localStorage
		
		if (!token) {
		navigate('/login');  // Redirect to login page if there's no token
		return;
		}

	    // Fetch user data from the backend
		const fetchUserData = async () => {
			try {
			  const response = await fetch('/api/Profile', {
				headers: { // ! wtf?
				  'token': `Bearer ${token}`,  // Include the JWT token in the Authorization header
				  'Content-Type': 'application/json',
				},
			  });
	  
			  if (response.ok) {
				const data = await response.json();
				setUserData(data);  // Set the received data to userData state // ! wtf?
			  } else {
				setError("Failed to load user data.");
			  }
			} catch (err) {
			  setError("An error occurred while fetching user data.");
			} finally {
			  setLoading(false);  // End loading state
			}
		}
	
		fetchUserData();  // Call the function to fetch user data
	}, [navigate]);


	// Handle the loading and error states
	if (loading) {
		return <div>Loading...</div>;  // Show loading message while fetching data
		}
	if (error) {
		return <div>{error}</div>;  // Show error message if something goes wrong
	}

	// If no token exists, render the login form
	if (!userData) {
		return (
			<div className="Profile">
				<Header />
				<LogIn />
		  	</div>
		);
	}

	return (
		<div className="Profile">
			<Header />
			<div className="profile-container">
				<h1>Welcome, {userData.username}!</h1>
				<p><strong>User id:</strong> {userData.id}</p>
			</div>
		</div>
	)
}

export default Profile;
