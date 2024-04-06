import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext({
	user: "",
	error: "",
	addToLocalStorage: null,
	lockButton: null,
	enterUser: null,
	userLogin: "",
});

export const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({ children }) => {
	const [userLogin, setUserLogin] = useState("");

	useEffect(() => {
		const loginExist = JSON.parse(localStorage.getItem("name"));
		setUserLogin(loginExist);
	}, []);

	const addToLocalStorage = (username) => {
		setUserLogin(username);
		localStorage.setItem("name", JSON.stringify(username));
	};

	return (
		<UserContext.Provider
			value={{
				addToLocalStorage,
				userLogin,
			}}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
