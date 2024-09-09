import { describe, expect, it } from "vitest";
import employeesReducer, { addEmployee } from "../../store/employeesSlice";
import { initialState } from "../../store/initialState";

describe("employeesSlice", () => {
  it("check add employee", () => {
    const newEmployee = {
      id: 3,
      name: "John Doe",
      phone: "+1 (555) 555-5555",
      birthday: "01.01.1990",
      role: "cook",
      isArchive: false,
    };

    const nextState = employeesReducer(initialState, addEmployee(newEmployee));

    expect(nextState).toEqual([...initialState, newEmployee]);
  });
});
