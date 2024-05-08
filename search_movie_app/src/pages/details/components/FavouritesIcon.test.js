import React from "react";
import { render } from "@testing-library/react";
import FavouritesIcon from "./FavouritesIcon";

describe("FavouritesIcon component", () => {
	test("renders FavouritesIcon with correct class", () => {
		const { container } = render(<FavouritesIcon classname='custom-class' />);
		const iconElement = container.querySelector(".icon");
		const heartIcon = container.querySelector(".icon svg");

		expect(iconElement).toBeInTheDocument();
		expect(heartIcon).toBeInTheDocument();
		expect(heartIcon).toHaveClass("custom-class");
	});
});
