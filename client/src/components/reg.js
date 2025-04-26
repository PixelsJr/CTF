import '../App.css';
import { createRef, useState } from 'react';

function Register() {
    //Registering a user. Name, password


    const usernameRef = createRef(null);
    const passwordRef = createRef(null);
    const [passwordInputType, setPasswordInputType] = useState('password');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    function seePassword(e) {
		if (e.target.checked) {
			setPasswordInputType('text')
		} else {
			setPasswordInputType('password')
		}
	}

    async function handleRegister(event) {
        event.preventDefault();

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        const response = await fetch('/api/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            setSuccess(true);
            setError(null);
        } else {
            const errorData = await response.json();
            setError(errorData.error || 'Failed to register');
            setSuccess(false);
        }
    }

    return (
        <div className="Register">
            <form onSubmit={handleRegister} className="logIn borderdDiv">
                <div className="cardHeader">
                    <h1>Register</h1>
                </div>
                {success ? (
                    <div className="successMessage">
                        <p>Account created successfully! You can now log in.</p>
                    </div>
                ) : (
                    <>
                        <div className="inputBox">
                            <label>Username</label>
                            <input ref={usernameRef} placeholder="Enter Username" required></input>
                        </div>
                        <div className="inputBox">
                            <label>Password</label>
                            <input
                                type={passwordInputType}
                                ref={passwordRef}
                                placeholder="Enter Password"
                                required
                            ></input>
                            <input
                                type="checkbox"
                                onChange={seePassword}
                                style={{ width: 'auto', height: 'auto', margin: 'none' }}
                            ></input>
                            <span style={{ fontSize: '16px', fontWeight: '400', marginLeft: '5px' }}>
                                See password
                            </span>
                        </div>
                        <button type="submit">Register</button>
                    </>
                )}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default Register;
