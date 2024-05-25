import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Dodaj to dla matcherów jak toBeInTheDocument i toHaveClass
import FavouritesIcon from "./FavouritesIcon";

describe("FavouritesIcon component", () => {
	test("renders FavouritesIcon with correct class", () => {
		render(<FavouritesIcon classname='custom-class' />);

		const iconElement = screen.getByTestId("icon");
		const heartIcon = screen.getByTestId("heart-icon");

		expect(iconElement).toBeInTheDocument();
		expect(heartIcon).toBeInTheDocument();
		expect(heartIcon).toHaveClass("custom-class");
	});
});
