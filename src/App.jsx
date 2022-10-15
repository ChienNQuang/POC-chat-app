import { onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import './App.css';
import Chat from './components/chat/chat.component';
import { AuthContext, AUTH_ACTION_TYPES } from './context/auth.context';

import { auth, googlePopup, logoutUser } from './utils/firebase/firebase.utils';

function App() {
	const { user, dispatch } = useContext(AuthContext);

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
						<button onClick={googlePopup}>Sign in with google</button>
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
