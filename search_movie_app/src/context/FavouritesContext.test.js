import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavouritesContextProvider, {
	useFavouritesContext,
} from "./FavouritesContext";

const TestComponent = () => {
	const { favourites, addFavourite, removeFavourite } = useFavouritesContext();

	return (
		<div>
			<ul>
				{favourites.map((item, index) => (
					<li key={index}>{item.title || item.name}</li>
				))}
			</ul>
			<button onClick={() => addFavourite({ title: "New Favourite" })}>
				Add Favourite
			</button>
			<button onClick={() => removeFavourite("New Favourite")}>
				Remove Favourite
			</button>
		</div>
	);
};

describe("FavouritesContext", () => {
	beforeEach(() => {
		localStorage.setItem("favouriteArray", JSON.stringify([]));
	});

	test("add new element to favourite", async () => {
		render(
			<FavouritesContextProvider>
				<TestComponent />
			</FavouritesContextProvider>
		);

		await userEvent.click(screen.getByText("Add Favourite"));

		expect(screen.getByText("New Favourite")).toBeInTheDocument();
		expect(JSON.parse(localStorage.getItem("favouriteArray"))).toEqual([
			{ title: "New Favourite" },
		]);
	});

	test("remove element from favourite", async () => {
		render(
			<FavouritesContextProvider>
				<TestComponent />
			</FavouritesContextProvider>
		);

		await userEvent.click(screen.getByText("Add Favourite"));
		await userEvent.click(screen.getByText("Remove Favourite"));

		expect(screen.queryByText("New Favourite")).not.toBeInTheDocument();
		expect(JSON.parse(localStorage.getItem("favouriteArray"))).toEqual([]);
	});
});
