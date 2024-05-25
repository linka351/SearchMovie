import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

function ResizeObserver() {
	return {
		observe() {},
		unobserve() {},
		disconnect() {},
	};
}

global.ResizeObserver = ResizeObserver;

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

	test("toggles side menu", async () => {
		render(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>
		);
		const menuButton = await screen.findByLabelText("toggle side navigation");
		userEvent.click(menuButton);

		setTimeout(() => {
			expect(menuButton).toHaveClass("faxmark-side-nav");
		}, 500);
	});

	test("logs out user on logout button click", () => {
		render(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>
		);
		const logoutButton = screen.getByText("Logout");
		const removeFromLocalStorageMock = jest.fn();
		logoutButton.onclick = removeFromLocalStorageMock;

		userEvent.click(logoutButton);
		expect(removeFromLocalStorageMock).toHaveBeenCalledTimes(1);
	});
});
