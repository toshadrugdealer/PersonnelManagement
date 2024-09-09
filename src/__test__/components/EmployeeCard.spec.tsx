import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import { Employee } from "../../types/types";

// Пример данных сотрудника для теста
const mockEmployee: Employee = {
  id: 1,
  name: "Anton Antonov",
  phone: "+1 (111) 111-1111",
  role: "cook",
  birthday: "01.01.1990",
  isArchive: false,
};

test("check card employee", () => {
  const { getByText, getByRole } = render(
    <MemoryRouter>
      <EmployeeCard employee={mockEmployee} />
    </MemoryRouter>
  );

  expect(getByText(mockEmployee.name)).toBeInTheDocument();
  expect(getByText(`Role: ${mockEmployee.role}`)).toBeInTheDocument();
  expect(getByText(`Telephone: ${mockEmployee.phone}`)).toBeInTheDocument();

  const linkElement = getByRole("link");
  expect(linkElement).toHaveAttribute("href", `/edit/${mockEmployee.id}`);
});
