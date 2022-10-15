const ChatInput = ({ message, onSendMessage, onChange, disabled, files, onRemove }) => {
	return (
		<form
			style={{
				background: '#333',
				borderRadius: 4,
				padding: 10,
				width: '100%',
				display: 'flex',
				flexFlow: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: 10,
			}}
			onSubmit={onSendMessage}
		>
			{!!files.length && (
				<div style={{ display: 'flex', width: '100%', gap: 10 }}>
					{files.map((file, index) => {
						if (file.type.startsWith('image/')) {
							return (
								<img
									key={index}
									width={40}
									height={40}
									style={{
										objectFit: 'cover',
										objectPosition: 'center',
										borderRadius: 4,
									}}
									src={file.url}
									alt={file.name}
									onClick={() => onRemove(index)}
								/>
							);
						}
						return (
							<div
								key={index}
								style={{
									height: 40,
									borderRadius: 4,
									background: '#444',
									padding: '5px 10px',
									display: 'grid',
									placeItems: 'center',
								}}
								onClick={() => onRemove(index)}
							>
								<a
									href={file.url}
									style={{
										color: '#fff',
									}}
								>
									{file.name}
								</a>
							</div>
						);
					})}
				</div>
			)}
			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 10,
				}}
			>
				<input
					onChange={onChange}
					value={message}
					style={{ width: '100%', borderRadius: 4, height: 30 }}
				/>
				<button
					style={{ borderRadius: 4, height: 30, padding: '5px 16px', cursor: 'pointer' }}
					type='submit'
					disabled={disabled}
					onClick={onSendMessage}
				>
					Send
				</button>
			</div>
		</form>
	);
};

export default ChatInput;
