import React from "react";
import { render } from "@testing-library/react";
import Offcanvas from "./Offcanvas";
import { MemoryRouter } from "react-router-dom";

test("renders Offcanvas component", () => {
	const { getByText } = render(
		<MemoryRouter>
			<Offcanvas showMenu={true} closeMenu={() => {}} />
		</MemoryRouter>
	);

	expect(getByText("Main Page")).toBeInTheDocument();
	expect(getByText("Movies")).toBeInTheDocument();
	expect(getByText("Series")).toBeInTheDocument();
	expect(getByText("Favourites")).toBeInTheDocument();
});

test("adds active class when showMenu is true", () => {
	const { container } = render(
		<MemoryRouter>
			<Offcanvas showMenu={true} closeMenu={() => {}} />
		</MemoryRouter>
	);

	const offcanvasElement = container.firstChild;
	expect(offcanvasElement).toHaveClass("sidenav active");
});

test("changes tabIndex when showMenu is true", () => {
	const { getByText } = render(
		<MemoryRouter>
			<Offcanvas showMenu={true} closeMenu={() => {}} />
		</MemoryRouter>
	);

	expect(getByText("Main Page")).toHaveAttribute("tabIndex", "0");
	expect(getByText("Movies")).toHaveAttribute("tabIndex", "0");
	expect(getByText("Series")).toHaveAttribute("tabIndex", "0");
	expect(getByText("Favourites")).toHaveAttribute("tabIndex", "0");
});
