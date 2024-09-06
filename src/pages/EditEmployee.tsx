import { useParams } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm/EmployeeForm";
import { useAppSelector } from "../store/hooks";

const EditEmployee = () => {
  const { id } = useParams<{ id: string }>();
  const employeeId = id ? parseInt(id, 10) : null;
  const employee = useAppSelector((state) =>
    state.employees.find((emp) => emp.id === employeeId)
  );

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <div>
      <h1>Change employee</h1>
      <EmployeeForm employee={employee} />
    </div>
  );
};

export default EditEmployee;
