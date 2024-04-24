import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext({
	addToLocalStorage: null,
	removeFromLocalStorage: null,
});

export const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({ children }) => {
	const [userLogin, setUserLogin] = useState();

	useEffect(() => {
		const loginExist = JSON.parse(localStorage.getItem("name"));
		setUserLogin(loginExist);
	}, []);

	const addToLocalStorage = username => {
		setUserLogin(username);
		localStorage.setItem("name", JSON.stringify(username));
	};

	const removeFromLocalStorage = () => {
		setUserLogin();
		localStorage.removeItem("name");
	};

	return (
		<UserContext.Provider
			value={{
				addToLocalStorage,
				removeFromLocalStorage,
				userLogin,
			}}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
