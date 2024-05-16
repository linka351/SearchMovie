import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchInput from "./SearchInput";

describe("SearchInput component", () => {
	test("renders input field with placeholder and value correctly", () => {
		render(<SearchInput value='Test Value' onChange={() => {}} />);
		const inputElement = screen.getByPlaceholderText("Czego Szukasz?");
		expect(inputElement).toBeInTheDocument();
		expect(inputElement).toHaveAttribute("value", "Test Value");
	});

	// Nie działa !!!!!!!
	// test("calls onChange function with input value when input changes", async () => {
	// 	const onChangeMock = jest.fn();
	// 	const user = userEvent.setup();
	// 	render(<SearchInput value='' onChange={onChangeMock} />);

	// 	const inputElement = screen.getByPlaceholderText("Czego Szukasz?");
	// 	await user.type(inputElement, "Test Value", {
	// 		target: { value: "Test Value" },
	// 	});

	// 	screen.debug();

	// expect(onChangeMock).toHaveBeenCalledTimes(10);

	// expect(onChangeMock).toHaveBeenCalledWith("Test Value");
	//});
});
