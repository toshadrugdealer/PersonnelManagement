import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test, vi } from "vitest";
import EmployeeFilter from "../../components/EmployeeFilter/EmployeeFilter";

test("check employee filter", () => {
  const setFilterRole = vi.fn();
  const setFilterArchive = vi.fn();
  const setSortField = vi.fn();

  const { getByLabelText, getByText } = render(
    <MemoryRouter>
      <EmployeeFilter
        setFilterRole={setFilterRole}
        setFilterArchive={setFilterArchive}
        setSortField={setSortField}
      />
    </MemoryRouter>
  );

  expect(getByLabelText(/Role:/i)).toBeInTheDocument();
  expect(getByLabelText(/In the archive:/i)).toBeInTheDocument();
  expect(getByLabelText(/Sort by:/i)).toBeInTheDocument();
  expect(getByText(/Add a new employee/i)).toBeInTheDocument();

  fireEvent.change(getByLabelText(/Role:/i), { target: { value: "cook" } });
  expect(setFilterRole).toHaveBeenCalledWith("cook");

  fireEvent.click(getByLabelText(/In the archive:/i));
  expect(setFilterArchive).toHaveBeenCalledWith(true);

  fireEvent.change(getByLabelText(/Sort by:/i), { target: { value: "name" } });
  expect(setSortField).toHaveBeenCalledWith("name");
});
