import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../redux/employeesSlice";
import { useNavigate } from "react-router-dom";
import { Employee } from "../redux/types";

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
    // Добавляем новый ID для сотрудника
    const newEmployee = {
      ...formData,
      id: Date.now(), // Генерируем уникальный ID
    };
    dispatch(addEmployee(newEmployee));
    navigate("/");
  };

  return (
    <div>
      <h1>Add a new employee</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Telephone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            onBlur={handlePhoneChange}
            placeholder="+7 (999) 999-9999"
            required
          />
        </label>

        <label>
          Birthday:
          <input
            type="text"
            name="birthday"
            value={formData.birthday}
            onChange={handleBirthdayChange}
            onBlur={handleBirthdayChange}
            placeholder="DD.MM.YYYY"
            required
          />
        </label>

        <label>
          Role:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="cook">Cook</option>
            <option value="waiter">Waiter</option>
            <option value="driver">Driver</option>
          </select>
        </label>

        <label>
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
    </div>
  );
};

export default AddEmployee;
