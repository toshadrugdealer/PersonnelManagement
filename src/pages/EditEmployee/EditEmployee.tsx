import { Link, useParams } from "react-router-dom";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import { useAppSelector } from "../../store/hooks";
import styles from "./EditEmployee.module.scss";
import BgVideo from "../../components/BgVideo/BgVideo";

const EditEmployee = () => {
  const { id } = useParams<{ id: string }>();
  const employeeId = id ? parseInt(id, 10) : null;
  const employee = useAppSelector((state) =>
    state.employees.find((emp) => emp.id === employeeId)
  );

  return (
    <>
      <div className={styles.wrapper}>
        {employee ? (
          <>
            <h1>Change employee</h1>
            <EmployeeForm employee={employee} />
          </>
        ) : (
          <>
            <h1>Employee not found</h1>
            <Link to="/">Go back to Home</Link>
          </>
        )}
      </div>
      <BgVideo />
    </>
  );
};

export default EditEmployee;
