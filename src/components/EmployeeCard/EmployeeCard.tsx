import { FC } from "react";
import { Link } from "react-router-dom";
import { Employee } from "../../types/types";
import styles from "./EmployeeCard.module.scss";

interface EmployeeCardProps {
  employee: Employee;
}
const EmployeeCard: FC<EmployeeCardProps> = ({ employee }) => {
  return (
    <div className={styles.employeeCard}>
      <h3>{employee.name}</h3>
      <p>Role: {employee.role}</p>
      <p>Telephone: {employee.phone}</p>
      <Link to={`/edit/${employee.id}`}>
        <button>Change employee</button>
      </Link>
    </div>
  );
};

export default EmployeeCard;
