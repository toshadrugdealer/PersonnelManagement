import { describe, it, expect } from "vitest";
import employeesReducer from "./../employeesSlice";
import { initialState } from "../initialState";

describe("employeesSlice", () => {
  it("check initial state", () => {
    const state = employeesReducer(undefined, { type: "unknown" });
    expect(state).toEqual(initialState);
  });
});
