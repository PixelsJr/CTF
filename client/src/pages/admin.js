import React, { useState, useEffect, useRef } from 'react';
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
	const [flag, setFlag] = useState(null);
	const textareaRef = useRef(null)

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
						const data = await response.json();
						console.log(data)
						if (data.flag) {
							setFlag(data.flag);
						}
						getJWT()
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

	async function getJWT() {
		const response = await fetch('/api/getAllOffers', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const message = await response.json()
		var a = {}
		a.target = textareaRef.current
		textareaRef.current.value = JSON.stringify(message, null, 2)
		takeSize(a)
	}

	function takeSize(e) {
		var el = e.target;
		setTimeout(function () {
			el.style.cssText = 'min-height:37px; height: 37px; width: 90%; background-color: #FCFCE4';
			// for box-sizing other than "content-box" use:
			// el.style.cssText = '-moz-box-sizing:content-box';
			el.style.cssText = 'height:' + el.scrollHeight + 'px; width: 90%; background-color: #F9ECC9';
		}, 0);
	}

	if (loading) {
		return <div>Checking for admin status...</div>;
	}

	if (!isAuthenticated) {
		return <div>Page denied. You are not admin</div>;
	}

	return (
		<div className="Admin">
			<Header />
			<div className='scrollable'>
				<h1>Amazing, you truly are the admin of this page!</h1>

				{/* Display the flag if it's available */}
				{flag && (
					<div>
						<h2>Flag: {flag}</h2> {/* Display the flag here */}
					</div>
				)}

				<textarea onChange={(e) => {
					takeSize(e)
				}} ref={textareaRef}></textarea>
				<button onClick={async (e) => {

					const message = e.target.value

					const response = await fetch('/api/updateData.json', {
						method: 'POST',
						body: {"message": message},
						headers: {
							'Content-Type': 'application/json',
						},
					});
				}} style={{margin: '5px', width: '400px', height: '200px', fontSize: '32px'}}>Update data.json</button>
			</div>
		</div>
	);
}

export default Admin;
