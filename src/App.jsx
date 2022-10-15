import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import './App.css';
import Chat from './components/chat/chat.component';
import { AuthContext, AUTH_ACTION_TYPES } from './context/auth.context';

import { auth, db, googlePopup, logoutUser } from './utils/firebase/firebase.utils';

function App() {
	const { user, dispatch } = useContext(AuthContext);

	const [form,setform] = useState({email: "", password: ""});
	const {email, password} = form;
	const onChange = (e) => {
		setform({...form, [e.target.name]: e.target.value});
	}

	const onSubmit = async e => {
		e.preventDefault();
		
		const {user:user1} = await signInWithEmailAndPassword(auth, email, password);
		const userRef = doc(db, `/users/${user1.uid}`);
		await setDoc(userRef, { uid:user1.uid, email:user1.email });
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			dispatch({ type: AUTH_ACTION_TYPES.LOGIN, payload: user });
		});

		return () => {
			unsubscribe();
		};
	}, []);

	

	return (
		<>
			<div className='App' style={{ display: 'flex', flexFlow: 'column', gap: 20 }}>
				<nav>
					{user ? (
						<button onClick={logoutUser}>Logout</button>
					) : (
						<form onSubmit={onSubmit}>
							<label>Email</label>
							<input value={email} type="email" name="email" onChange={onChange}/>
							<label>Password</label>
							<input value={password} type="password" name="password" onChange={onChange}/>
							<button type="submit">Log in</button>
						</form>
					)}
				</nav>
				{user && (
					<>
						<Chat />
					</>
				)}
			</div>
		</>
	);
}

export default App;
