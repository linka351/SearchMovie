import React from "react";
import { render, screen } from "@testing-library/react";
import Offcanvas from "./Offcanvas";
import { MemoryRouter } from "react-router-dom";

test("renders Offcanvas component", () => {
	render(
		<MemoryRouter>
			<Offcanvas showMenu={true} closeMenu={() => {}} />
		</MemoryRouter>
	);

	expect(screen.getByText("Main Page")).toBeInTheDocument();
	expect(screen.getByText("Movies")).toBeInTheDocument();
	expect(screen.getByText("Series")).toBeInTheDocument();
	expect(screen.getByText("Favourites")).toBeInTheDocument();
});

test("adds active class to Offcanvas when showMenu is true", () => {
	render(
		<MemoryRouter>
			<Offcanvas showMenu={true} closeMenu={() => {}} />
		</MemoryRouter>
	);

	const offcanvasElement = screen.getByTestId("side-nav");
	expect(offcanvasElement).toBeInTheDocument();
});

test("changes tabIndex when showMenu is true", () => {
	render(
		<MemoryRouter>
			<Offcanvas showMenu={true} closeMenu={() => {}} />
		</MemoryRouter>
	);

	expect(screen.getByText("Main Page")).toHaveAttribute("tabIndex", "0");
	expect(screen.getByText("Movies")).toHaveAttribute("tabIndex", "0");
	expect(screen.getByText("Series")).toHaveAttribute("tabIndex", "0");
	expect(screen.getByText("Favourites")).toHaveAttribute("tabIndex", "0");
});
