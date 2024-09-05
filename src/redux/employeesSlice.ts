import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    editEmployee: (state, action) => {
      const index = state.findIndex((emp) => emp.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    addEmployee: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { editEmployee, addEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
