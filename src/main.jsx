import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/auth.context';
import { ChatProvider } from './context/chat.context';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<ChatProvider>
				<App />
			</ChatProvider>
		</AuthProvider>
	</React.StrictMode>
);
