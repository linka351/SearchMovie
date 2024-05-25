import { renderHook } from "@testing-library/react";
import useDebounce from "./useDebounce";

jest.useFakeTimers();

test("calls callback after delay", () => {
	const callback = jest.fn();
	const delay = 200;
	const dependencies = [1];

	renderHook(() => useDebounce({ callback, delay, dependecies: dependencies }));

	jest.advanceTimersByTime(delay);

	expect(callback).toHaveBeenCalledTimes(1);
});

test("does not call callback before delay", () => {
	const callback = jest.fn();
	const delay = 200;
	const dependencies = [1];

	renderHook(() => useDebounce({ callback, delay, dependecies: dependencies }));

	jest.advanceTimersByTime(delay / 2);

	expect(callback).not.toHaveBeenCalled();
});

test("clears previous timeout when dependencies change", () => {
	const callback = jest.fn();
	const delay = 200;
	const { rerender } = renderHook(
		({ dependencies }) =>
			useDebounce({ callback, delay, dependecies: dependencies }),
		{
			initialProps: { dependencies: [1] },
		}
	);

	rerender({ dependencies: [2] });

	jest.advanceTimersByTime(delay);

	expect(callback).toHaveBeenCalledTimes(1);
});
