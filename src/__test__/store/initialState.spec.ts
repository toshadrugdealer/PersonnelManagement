import { describe, it, expect } from "vitest";
import employeesReducer from "../../store/employeesSlice";
import { initialState } from "../../store/initialState";

describe("employeesSlice", () => {
  it("check initial state", () => {
    const state = employeesReducer(undefined, { type: "unknown" });
    expect(state).toEqual(initialState);
  });
});
