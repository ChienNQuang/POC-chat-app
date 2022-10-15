const DEFAULT_STYLE = {
	borderRadius: 4,
	color: '#fff',
	padding: '5px 10px',
	width: 'max-content',
	maxWidth: '100%',
	wordWrap: 'break-word',
};

const ChatBubble = ({ current, children }) => {
	const STYLE = current
		? {
				...DEFAULT_STYLE,
				background: 'linear-gradient(180deg, rgba(42,128,218,1) 0%, rgba(234,74,255,1) 100%)',
				alignSelf: 'flex-end',
		  }
		: { ...DEFAULT_STYLE, background: '#222' };

	return <div style={STYLE}>{children}</div>;
};

export default ChatBubble;
