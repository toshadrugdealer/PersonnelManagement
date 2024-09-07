import { Link, useParams } from "react-router-dom";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import { useAppSelector } from "../../store/hooks";
import styles from "./EditEmployee.module.scss";

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
      <div className="effects"></div>
      <video
        src="https://cdn.pixabay.com/video/2023/04/28/160767-822213540_small.mp4"
        autoPlay
        muted
        loop
      ></video>
    </>
  );
};

export default EditEmployee;
