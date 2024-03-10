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
	const [error, setError] = useState("");
	const [user, setUser] = useState("");
	const [userLogin, setUserLogin] = useState("");

	useEffect(() => {
		const loginExist = JSON.parse(localStorage.getItem("name"));
		setUserLogin(loginExist);
		setUser(loginExist);
	}, []);

	const addToLocalStorage = e => {
		e.preventDefault();
		setUserLogin(user);
		localStorage.setItem("name", JSON.stringify(user));
	};

	const lockButton = e => {
		e.preventDefault();
		setError("Proszę podać nazwę użytkownika!");
	};

	const enterUser = e => {
		setUser(e.target.value);
	};

	return (
		<UserContext.Provider
			value={{
				user: user,
				error: error,
				addToLocalStorage: addToLocalStorage,
				lockButton: lockButton,
				enterUser: enterUser,
				userLogin: userLogin,
			}}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
