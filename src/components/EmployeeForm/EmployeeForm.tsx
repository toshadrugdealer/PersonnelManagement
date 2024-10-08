import { ChangeEvent, FC, FormEvent, useState } from "react";
import { editEmployee } from "../../store/employeesSlice";
import { useNavigate } from "react-router-dom";
import { Employee } from "../../types/types";
import { useAppDispatch } from "../../store/hooks";
import styles from "./EmployeeForm.module.scss";
import { Button } from "../Button/Button";

interface EmployeeFormProps {
  employee: Employee;
}
const EmployeeForm: FC<EmployeeFormProps> = ({ employee }) => {
  const [formData, setFormData] = useState<Employee>(employee);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      const formattedPhone = value
        .replace(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5")
        .slice(0, 18);
      setFormData({ ...formData, phone: formattedPhone });
    }
  };

  const handleBirthdayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 8) {
      const formattedBirthday = value
        .replace(/^(\d{2})(\d{2})(\d{4})/, "$1.$2.$3")
        .slice(0, 10);
      setFormData({ ...formData, birthday: formattedBirthday });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editEmployee(formData));
    navigate("/");
  };
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <form className={styles.employeeForm} onSubmit={handleSubmit} role="form">
      <label className={styles.label}>
        <p>Name:</p>
        <input
          className={styles.input}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className={styles.label}>
        Telephone:
        <input
          className={styles.input}
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handlePhoneChange}
          placeholder="+7 (999) 999-9999"
          required
        />
      </label>

      <label className={styles.label}>
        Birthday:
        <input
          className={styles.input}
          type="text"
          name="birthday"
          value={formData.birthday}
          onChange={handleBirthdayChange}
          placeholder="DD.MM.YYYY"
          required
        />
      </label>

      <label className={styles.label}>
        Role:
        <select
          className={styles.select}
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="cook">Cook</option>
          <option value="waiter">Waiter</option>
          <option value="driver">Driver</option>
        </select>
      </label>

      <label className={styles.checkbox}>
        In the archive :
        <input
          type="checkbox"
          name="isArchive"
          checked={formData.isArchive}
          onChange={handleCheckboxChange}
        />
      </label>
      <Button>Save</Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </form>
  );
};

export default EmployeeForm;
