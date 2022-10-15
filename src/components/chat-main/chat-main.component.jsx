import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import { db, storage } from '../../utils/firebase/firebase.utils';
import ChatBubble from '../chat-bubble/chat-bubble.component';

const ChatMain = ({ chat }) => {
	const [messages, setMessages] = useState([]);
	const { user } = useContext(AuthContext);
	const [preview, setPreview] = useState(null);

	useEffect(() => {
		const unsubscribeFromChat = onSnapshot(
			query(collection(db, `/chats/${chat}/messages`), limit(50), orderBy('sent', 'asc')),
			(docs) => {
				setMessages(
					docs.docs.map((doc) => {
						return {
							...doc.data(),
							id: doc.id,
						};
					})
				);
			}
		);

		return () => {
			unsubscribeFromChat();
		};
	}, [chat]);

	return (
		<>
			<div
				style={{
					flex: 1,
					background: '#333',
					width: '100%',
					borderRadius: 4,
					display: 'flex',
					flexFlow: 'column',
					overflow: 'auto',
					padding: 10,
					gap: 5,
				}}
			>
				{!!messages.length ? (
					messages?.map(({ id, uid, content, fileURL }) => (
						<ChatBubble key={id} current={uid === user.uid}>
							<div>
								{fileURL.map((file) => {
									if (file.type.startsWith('image/'))
										return (
											<img
												key={file.ref}
												src={file.ref}
												alt='user image'
												width={60}
												height={60}
												style={{ objectFit: 'cover', objectPosition: 'center' }}
												onClick={() => setPreview({ ref: file.ref, type: file.type })}
											/>
										);
									return (
										<div
											key={file.ref}
											style={{
												height: 40,
												borderRadius: 4,
												padding: '5px 10px',
												display: 'grid',
												placeItems: 'center',
											}}
											onClick={() => setPreview({ ref: file.ref, type: file.type })}
										>
											<span
												href={file.ref}
												style={{
													color: '#fff',
													cursor: 'pointer',
												}}
											>
												{file.name}
											</span>
										</div>
									);
								})}
							</div>
							{content}
						</ChatBubble>
					))
				) : (
					<div
						style={{
							width: '100%',
							height: 100,
							color: '#fff',
							display: 'grid',
							placeItems: 'center',
						}}
					>
						<div>Start the conversation by saying "Hi!"</div>
					</div>
				)}
			</div>
			{preview && (
				<div
					style={{
						width: '100vw',
						height: '100vh',
						position: 'absolute',
						top: 0,
						left: 0,
						background: '#0009',
					}}
					onClick={() => setPreview(null)}
				>
					<div
						style={{
							width: '100%',
							height: 60,
							background: '#222',
						}}
						onClick={(e) => e.stopPropagation()}
					>
						<div
							style={{
								width: '100%',
								height: '100%',
								maxWidth: 1280,
								display: 'grid',
								placeItems: 'center flex-end',
							}}
						>
							<a href={preview.ref} download>
								Download
							</a>
						</div>
					</div>
					<div
						style={{
							width: 'max-content',
							height: 'calc(100% - 60px)',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							flexFlow: 'column',
							margin: 'auto',
							color: '#fff',
						}}
					>
						<div
							style={{
								width: '100%',
								height: '100%',
								display: 'grid',
								placeItems: 'center',
							}}
						>
							{preview.type.startsWith('image/') ? (
								<img src={preview.ref} style={{ maxWidth: '80vw', maxHeight: '80vh' }} />
							) : (
								<span>File</span>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ChatMain;
