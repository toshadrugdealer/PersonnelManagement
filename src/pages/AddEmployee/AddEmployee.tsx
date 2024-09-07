import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../store/employeesSlice";
import { useNavigate } from "react-router-dom";
import { Employee } from "../../types/types";
import styles from "./AddEmployee.module.scss";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Employee>({
    name: "",
    phone: "",
    birthday: "",
    role: "cook",
    isArchive: false,
  });

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
    const newEmployee = {
      ...formData,
      id: Date.now(),
    };
    dispatch(addEmployee(newEmployee));
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h1>Add a new employee</h1>
        <div className={styles.addEmployee}>
          <form onSubmit={handleSubmit}>
            <label className={styles.label}>
              Name:
              <input
                className={styles.input}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Employee name"
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
                onBlur={handlePhoneChange}
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
                onBlur={handleBirthdayChange}
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
              In the archive:
              <input
                type="checkbox"
                name="isArchive"
                checked={formData.isArchive}
                onChange={handleCheckboxChange}
              />
            </label>

            <button type="submit">Add an employee</button>
          </form>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
      <div className="effects"></div>
      {/* <video src="../../../public/video.mp4" autoPlay muted loop></video> */}
    </>
  );
};

export default AddEmployee;
