import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserContextProvider, { useUserContext } from "./UserContext";

const TestComponent = () => {
	const { addToLocalStorage, removeFromLocalStorage, userLogin } =
		useUserContext();

	return (
		<div>
			<p>Logged in user: {userLogin ? userLogin : "None"}</p>
			<button onClick={() => addToLocalStorage("testUser")}>Login</button>
			<button onClick={removeFromLocalStorage}>Logout</button>
		</div>
	);
};

describe("UserContextProvider", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	test("add user to localStorage and set userLogin", async () => {
		render(
			<UserContextProvider>
				<TestComponent />
			</UserContextProvider>
		);

		const loginButton = screen.getByText("Login");
		await userEvent.click(loginButton);

		expect(screen.getByText("Logged in user: testUser")).toBeInTheDocument();
		expect(JSON.parse(localStorage.getItem("name"))).toBe("testUser");
	});

	test("remove user from localStorage and userLogin", async () => {
		render(
			<UserContextProvider>
				<TestComponent />
			</UserContextProvider>
		);

		const loginButton = screen.getByText("Login");
		const logoutButton = screen.getByText("Logout");

		await userEvent.click(loginButton);
		await userEvent.click(logoutButton);

		expect(screen.getByText("Logged in user: None")).toBeInTheDocument();
		expect(localStorage.getItem("name")).toBe(null);
	});
});
