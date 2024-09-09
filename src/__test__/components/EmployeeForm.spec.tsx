import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import { Employee } from "../../types/types";

vi.mock("../../store/hooks", () => ({
  useAppDispatch: () => vi.fn(),
}));
vi.mock("../../store/employeesSlice", () => ({
  editEmployee: (employee: unknown) => ({
    type: "EDIT_EMPLOYEE",
    payload: employee,
  }),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

test("check form", () => {
  const employee: Employee = {
    id: 1,
    name: "Anton Antonov",
    phone: "+1 (111) 111-1111",
    birthday: "01.01.2000",
    role: "cook",
    isArchive: false,
  };

  render(<EmployeeForm employee={employee} />);

  expect(screen.getByLabelText(/Name:/i)).toHaveValue(employee.name);
  expect(screen.getByLabelText(/Telephone:/i)).toHaveValue(employee.phone);
  expect(screen.getByLabelText(/Birthday:/i)).toHaveValue(employee.birthday);
  expect(screen.getByLabelText(/Role:/i)).toHaveValue(employee.role);

  fireEvent.change(screen.getByLabelText(/Name:/i), {
    target: { value: "Anton Neantonov" },
  });
  expect(screen.getByLabelText(/Name:/i)).toHaveValue("Anton Neantonov");

  fireEvent.change(screen.getByLabelText(/Telephone:/i), {
    target: { value: "+1 (123) 456-7890" },
  });

  waitFor(() => {
    expect(screen.getByLabelText(/Telephone:/i)).toHaveValue(
      "+1 (123) 456-7890".replace(/\D/g, "")
    );
  });

  fireEvent.change(screen.getByLabelText(/Birthday:/i), {
    target: { value: "31.12.1999" },
  });
  expect(screen.getByLabelText(/Birthday:/i)).toHaveValue("31.12.1999");

  fireEvent.change(screen.getByLabelText(/Role:/i), {
    target: { value: "waiter" },
  });
  expect(screen.getByLabelText(/Role:/i)).toHaveValue("waiter");

  fireEvent.submit(screen.getByRole("form"));
  expect(mockNavigate).toHaveBeenCalledWith("/");
});

test("check cancel click", () => {
  const employee: Employee = {
    id: 1,
    name: "Anton Antonov",
    phone: "+1 (111) 111-1111",
    birthday: "01.01.2000",
    role: "cook",
    isArchive: false,
  };

  render(<EmployeeForm employee={employee} />);

  fireEvent.click(screen.getByText(/Cancel/i));
  expect(mockNavigate).toHaveBeenCalledWith("/");
});
