import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchInput from "./SearchInput";

describe("SearchInput component", () => {
	test("renders input field with placeholder and value correctly", () => {
		render(<SearchInput value='Test Value' onChange={() => {}} />);
		const inputElement = screen.getByPlaceholderText("Czego Szukasz?");
		expect(inputElement).toBeInTheDocument();
		expect(inputElement).toHaveAttribute("value", "Test Value");
	});

	test("calls onChange function with input value when input changes", async () => {
		const onChangeMock = jest.fn();
		render(<SearchInput value='' onChange={onChangeMock} />);

		const inputElement = screen.getByPlaceholderText("Czego Szukasz?");
		fireEvent.change(inputElement, { target: { value: "Test Value" } });

		expect(onChangeMock).toHaveBeenCalledTimes(1);

		expect(onChangeMock).toHaveBeenCalledWith("Test Value");
	});
});
