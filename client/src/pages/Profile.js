import '../App.css';
import { Profiler, useEffect, useState } from 'react'
import Header from '../components/header';
import LogIn from '../components/logIn';

function Profile() {

	useEffect(() => {
	}, [])

	return (
		<div className='Profile'>
			<Header />
			<LogIn />
		</div>
	)
}

export default Profile;
