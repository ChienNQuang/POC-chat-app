import { initializeApp } from 'firebase/app';
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	setDoc,
	where,
} from 'firebase/firestore';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
	apiKey: "AIzaSyCNLQbLBc09SdW2cVoa-p5k2VU7aqvJNCQ",
	authDomain: "tikera-8fa44.firebaseapp.com",
	projectId: "tikera-8fa44",
	storageBucket: "tikera-8fa44.appspot.com",
	messagingSenderId: "222627878456",
	appId: "1:222627878456:web:d4e071ae9ea8b9dfb578cd",
	measurementId: "G-7NS8FLQDD4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export const googlePopup = async () => {
	try {
		const { user } = await signInWithPopup(auth, googleProvider);
		const userRef = doc(db, `/users/${user.uid}`);
		const { uid, email, displayName, photoURL } = user;
		await setDoc(userRef, { uid, email, displayName, photoURL });
	} catch (e) {
		console.log(e);
	}
};

export const logoutUser = async () => {
	await signOut(auth);
};

export const sendMessage = async (message, fileURL, uid, chatId) => {
	if ((!message && !fileURL) || !chatId || !uid) return;
	try {
		const chatRef = collection(db, `/chats/${chatId}/messages`);
		await addDoc(chatRef, { content: message, uid, fileURL: fileURL || [], sent: Date.now() });
	} catch (e) {
		console.log(e);
	}
};

export const findUser = async (otherUid) => {
	if (!otherUid) return;
	const userRef = doc(db, `/users/${otherUid}`);
	const result = await getDoc(userRef);
	return result.data();
};

export const checkChatExists = async (currentUid, otherUid) => {
	const chatRef = collection(db, `/chats`);
	const q = query(chatRef, where('membersId', 'in', [[currentUid, otherUid]]));
	const results = await getDocs(q);
	return results.size;
};

export const createNewChat = async (current, otherUid) => {
	const other = await findUser(otherUid);
	if (!current || !other) return;
	try {
		const { uid, photoURL, displayName, email } = current;
		const chatRef = collection(db, `/chats`);
		await addDoc(chatRef, {
			membersId: [current.uid, other.uid],
			members: [{ uid, photoURL, displayName, email }, other],
		});
	} catch (e) {
		console.log(e);
	}
};

export const uploadFiles = async (chatId, file) => {
	if (!chatId || !file) return;
	const fileRef = ref(storage, `/chats/${chatId}/${file.uuid}`);
	const snapshot = uploadBytes(fileRef, file.file);
	return snapshot;
};
