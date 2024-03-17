import { createContext, useContext, useState } from "react";

const FavouritesContext = createContext({
	favourites: null,
	addFavourite: null,
	removeFavourite: null,
});

export const useFavouritesContext = () => {
	const context = useContext(FavouritesContext);

	if (!context) {
		throw new Error("Outside context");
	}

	return context;
};

const FavouritesContextProvider = ({ children }) => {
	const [favourites, setFavourites] = useState(
		JSON.parse(localStorage.getItem("favouriteArray")) || []
	);

	const addFavourite = newItem => {
		setFavourites(prev => {
			const newState = [...prev, newItem];
			localStorage.setItem("favouriteArray", JSON.stringify(newState));
			return newState;
		});
	};

	const removeFavourite = title => {
		setFavourites(prev => {
			const newState = prev.filter(item => item.title !== title);
			localStorage.setItem("favouriteArray", JSON.stringify(newState));
			return newState;
		});
	};

	const value = {
		favourites,
		addFavourite,
		removeFavourite,
	};

	return (
		<FavouritesContext.Provider value={value}>
			{children}
		</FavouritesContext.Provider>
	);
};

export default FavouritesContextProvider;
