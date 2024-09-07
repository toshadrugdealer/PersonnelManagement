import { ChangeEvent, FC, useState } from "react";
import styles from "./EmployeeFilter.module.scss";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";

interface EmployeeFilterProps {
  setFilterRole: (role: "all" | "cook" | "waiter" | "driver") => void;
  setFilterArchive: (archive: boolean) => void;
  setSortField: (sortField: "name" | "birthday" | "") => void;
}
const EmployeeFilter: FC<EmployeeFilterProps> = ({
  setFilterRole,
  setFilterArchive,
  setSortField,
}) => {
  const [role, setRole] = useState("all");
  const [archive, setArchive] = useState(false);
  const [sortField, setSort] = useState("");

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value as "all" | "cook" | "waiter" | "driver";
    setRole(selectedRole);
    setFilterRole(selectedRole);
  };

  const handleArchiveChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isArchive = e.target.checked;
    setArchive(isArchive);
    setFilterArchive(isArchive);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value as "name" | "birthday" | "";
    setSort(selectedSort);
    setSortField(selectedSort);
  };

  return (
    <div className={styles.employeeFilter}>
      <label>
        Role:
        <select value={role} onChange={handleRoleChange}>
          <option value="all">All</option>
          <option value="cook">Cook</option>
          <option value="waiter">Waiter</option>
          <option value="driver">Driver</option>
        </select>
      </label>
      <label>
        In the archive:
        <input
          type="checkbox"
          checked={archive}
          onChange={handleArchiveChange}
        />
      </label>
      <label>
        Sort by:
        <select value={sortField} onChange={handleSortChange}>
          <option value="">Default</option>
          <option value="name">Name</option>
          <option value="birthday">Birthday</option>
        </select>
      </label>
      <Link to="/add">
        <Button>Add a new employee</Button>
      </Link>
    </div>
  );
};

export default EmployeeFilter;
