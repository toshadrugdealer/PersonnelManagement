import EmployeeCard from "../EmployeeCard/EmployeeCard";
import { useAppSelector } from "../../store/hooks";
import { FC } from "react";
import styles from "./EmployeeList.module.scss";
import { Link } from "react-router-dom";

interface EmployeeListProps {
  filterRole: "all" | "cook" | "waiter" | "driver";
  filterArchive: boolean;
  sortField: "name" | "birthday" | "";
}
const EmployeeList: FC<EmployeeListProps> = ({
  filterRole,
  filterArchive,
  sortField,
}) => {
  const employees = useAppSelector((state) => state.employees);

  const filteredEmployees = employees.filter((employee) => {
    return (
      (filterRole === "all" || employee.role === filterRole) &&
      (filterArchive === false || employee.isArchive)
    );
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortField === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortField === "birthday") {
      const dateA: Date = new Date(a.birthday.split(".").reverse().join("-"));
      const dateB: Date = new Date(b.birthday.split(".").reverse().join("-"));
      return dateA.getTime() - dateB.getTime();
    }
    return 0;
  });

  return (
    <div className={styles.employeeList}>
      {sortedEmployees.length > 0 ? (
        sortedEmployees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))
      ) : (
        <>
          <p className={styles.noEmployees}>No employees found</p>
          <Link to={"/add"}>Add a new employee</Link>
        </>
      )}
    </div>
  );
};

export default EmployeeList;
