import {createContext, useState, useEffect} from "react";
import {createUserDocumentFromAuth, onAuthStateChangedListener} from "../utils/firebase/firebase.utils";

// the user data store
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

export const UserProvider = ({children}) => {
	const [currentUser, setCurrentUser] = useState(null);
	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if(user) {
				createUserDocumentFromAuth(user);
			}
			setCurrentUser(user);
		});
		//'unsubscribe' is used to stop this listener from listening when component is unmounted (else, memory leak!)
		return unsubscribe;
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
