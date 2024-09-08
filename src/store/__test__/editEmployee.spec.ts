import { describe, expect, it } from "vitest";
import employeesReducer, { editEmployee } from "../employeesSlice";
import { initialState } from "../initialState";

describe("employeesSlice", () => {
  it("check edit employee", () => {
    const updatedEmployee = {
      id: 1,
      name: "Jane Doe Updated",
      phone: "+1 (555) 555-5555",
      birthday: "01.01.1990",
      role: "waiter",
      isArchive: false,
    };

    const nextState = employeesReducer(
      initialState,
      editEmployee(updatedEmployee)
    );

    expect(nextState[0]).toEqual(updatedEmployee);
  });
});
