import { createRef, useState } from "react";
import { useNavigate } from 'react-router-dom';  // Added useNavigate for redirecting


function LogIn({ }) {

	const usernameRef = createRef(null)
	const passwordRef = createRef(null)
	const [passwordInputType, setPasswordInputType] = useState('password')

	const [loading, setLoading] = useState(false);  // Added loading state
	const [error, setError] = useState("");  // Added error state for handling error messages
	const navigate = useNavigate();


	function seePassword(e){
		if(e.target.checked){
			setPasswordInputType('text')
		} else {
			setPasswordInputType('password')
		}
	}

	async function tryLogIn(e) {

		e.preventDefault()

		const username = usernameRef.current.value
		const password = passwordRef.current.value

		if (!username || !password) {
			setError("Both fields are required");  // Display error message if fields are empty
			return;
		  }		  

		const message = { 'username': username, 'password': password }

		console.log(message)

		const response = await fetch('/api/logIn', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(message)
		})
		const data = await response.json()

		if (response.ok) {
			// Assuming your server returns the JWT token in `data.token`
			const token = data.token;
			if (token) {
			  // Store the token in localStorage and redirect
			  localStorage.setItem('jwtToken', token);
			  navigate('/');  // Redirect user to profile page after successful login
			} else {
			  setError("Failed to log in. Please try again.");  // Added error message if no token returned
			}
		  } else {
			// Handle invalid credentials or other errors from the server
			setError(data.message || "Login failed. Please try again.");
		  }
	}

	return (
		<form onSubmit={tryLogIn} className="logIn borderdDiv">
			<div className="cardHeader">
				<h1>Login</h1>
			</div>
			<div className="inputBox">
				<label>Username</label>
				<input ref={usernameRef} placeholder="Enter Username"></input>
			</div>
			<div className="inputBox">
				<label>Password</label>
				<input type={passwordInputType} ref={passwordRef} placeholder="Password"></input>
				<input type="checkbox" onChange={seePassword} style={{width: 'auto', height: 'auto', margin: 'none'}}></input>
				<span style={{fontSize: '16px', fontWeight: '400', marginLeft: '5px'}}>See password</span>
			</div>
			<button type="submit">Log In</button>
		</form>
	);
}

export default LogIn;
