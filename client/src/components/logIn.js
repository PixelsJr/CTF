import { createRef } from "react";

function LogIn({ }) {

	const usernameRef = createRef(null)
	const passwordRef = createRef(null)

	async function tryLogIn(e){

		e.preventDefault()

		const username = usernameRef.current.value
		const password = passwordRef.current.value

		const message = {'username': username, 'password': password}

		console.log(message)

		const response = await fetch('/api/logIn', {
			method: 'POST',
			body: JSON.stringify(message)
		})
		const data = await response.json()
	}

	return (
		<form onSubmit={tryLogIn} className="logIn borderdDiv">
			<h1>Palun logige sisse</h1>
			<input ref={usernameRef} placeholder="username"></input>
			<input ref={passwordRef} placeholder="password"></input>
			<button type="submit">Submit</button>
		</form>
	);
}

export default LogIn;
