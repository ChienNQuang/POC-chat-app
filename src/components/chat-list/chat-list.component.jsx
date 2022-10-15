import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { ChatContext, CHAT_ACTION_TYPES } from '../../context/chat.context';

const ChatListItem = ({ id, member }) => {
	const { dispatch } = useContext(ChatContext);
	return (
		<div
			onClick={() => {
				dispatch({ type: CHAT_ACTION_TYPES.SET_CHAT, payload: id });
			}}
			style={{
				display: 'flex',
				color: '#fff',
				padding: '10px 20px',
				gap: 20,
				borderRadius: 4,
				cursor: 'pointer',
			}}
		>
			<img src={member.photoURL} alt='avatar' height={40} style={{ borderRadius: '50%' }} />
			<span style={{ textOverflow: 'ellipsis', maxWidth: '100%' }}>
				{member.displayName.toUpperCase()}
			</span>
		</div>
	);
};

const ChatList = ({ onNewChat, chats }) => {
	const { user } = useContext(AuthContext);
	return (
		<div
			style={{
				display: 'flex',
				flexFlow: 'column',
				background: '#222',
				borderRadius: 4,
				padding: 10,
				flex: 1,
				gap: 20,
			}}
		>
			<button onClick={() => onNewChat(true)}>New chat</button>
			<div
				style={{
					display: 'flex',
					flexFlow: 'column',
					background: '#333',
					borderRadius: 4,
					width: '100%',
				}}
			>
				{chats?.map(({ id, members }) => (
					<ChatListItem
						id={id}
						member={members.find((member) => member.uid != user.uid)}
						key={id}
					/>
				))}
			</div>
		</div>
	);
};

export default ChatList;
