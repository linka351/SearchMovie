import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar Component", () => {
	test("renders Navbar with all elements", () => {
		const { getByText, queryAllByText } = render(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>
		);

		expect(getByText("MovieSearch")).toBeInTheDocument();
		expect(queryAllByText("Movies")).toHaveLength(2);
		expect(queryAllByText("Series")).toHaveLength(2);
		expect(queryAllByText("Favourites")).toHaveLength(2);
		expect(getByText("Search")).toBeInTheDocument();
		expect(getByText("Logout")).toBeInTheDocument();
	});

	test("toggles side menu", async () => {
		const { findByLabelText } = render(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>
		);
		const menuButton = await findByLabelText("toggle side navigation");
		fireEvent.click(menuButton);
		setTimeout(() => {
			expect(menuButton).toHaveClass("faxmark-side-nav");
		}, 500);
	});

	test("logs out user on logout button click", () => {
		const { getByText } = render(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>
		);
		const logoutButton = getByText("Logout");
		const removeFromLocalStorageMock = jest.fn();
		logoutButton.onclick = removeFromLocalStorageMock;

		fireEvent.click(logoutButton);
		expect(removeFromLocalStorageMock).toHaveBeenCalledTimes(1);
	});
});
