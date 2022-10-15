const NewChatOverlay = ({ setOpenNewChat, setNewChatId, newChatId, onNewChat }) => {
	return (
		<div
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				width: '100vw',
				height: '100vh',
				transform: 'translate(-50%, -50%)',
				background: '#222a',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
			onClick={() => setOpenNewChat(false)}
		>
			<form
				style={{
					background: '#222',
					padding: 10,
					borderRadius: 4,
					display: 'flex',
					flexFlow: 'column',
					alignItems: 'center',
					gap: 20,
					color: '#fff',
				}}
				onClick={(e) => e.stopPropagation()}
				onSubmit={onNewChat}
			>
				<label>New chat ID</label>
				<input value={newChatId} onChange={(e) => setNewChatId(e.target.value)} />
				<button type='submit'>Create</button>
			</form>
		</div>
	);
};

export default NewChatOverlay;
