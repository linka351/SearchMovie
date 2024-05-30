import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar Component", () => {
	test("renders Navbar with all elements", () => {
		render(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>
		);

		expect(screen.getByText("MovieSearch")).toBeInTheDocument();
		expect(screen.getAllByText("Movies")).toHaveLength(2);
		expect(screen.getAllByText("Series")).toHaveLength(2);
		expect(screen.getAllByText("Favourites")).toHaveLength(2);
		expect(screen.getByText("Search")).toBeInTheDocument();
		expect(screen.getByText("Logout")).toBeInTheDocument();
	});

	test("checking sideNav has the active class after click", async () => {
		render(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>
		);
		const menuButton = await screen.getByLabelText("toggle side navigation");
		let sideNav = screen.getByTestId("side-nav");

		expect(sideNav).not.toHaveClass("active");

		await userEvent.click(menuButton);
		sideNav = screen.getByTestId("side-nav");

		expect(sideNav).toHaveClass("active");
	});

	test("logs out user on logout button click", async () => {
		render(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>
		);
		const logoutButton = screen.getByText("Logout");
		const removeFromLocalStorageMock = jest.fn();
		logoutButton.onclick = removeFromLocalStorageMock;

		await userEvent.click(logoutButton);
		expect(removeFromLocalStorageMock).toHaveBeenCalledTimes(1);
	});
});
