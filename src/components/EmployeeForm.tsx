import { ChangeEvent, FC, FormEvent, useState } from "react";
import { editEmployee } from "../redux/employeesSlice";
import { useNavigate } from "react-router-dom";
import { Employee } from "../redux/types";
import { useAppDispatch } from "../redux/hooks";

interface EmployeeFormProps {
  employee: Employee;
}
const EmployeeForm: FC<EmployeeFormProps> = ({ employee }) => {
  const [formData, setFormData] = useState(employee);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Обработчик для изменения полей формы
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Обработчик для чекбоксов
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  // Маска для телефона
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Убираем все нецифровые символы
    if (value.length <= 11) {
      const formattedPhone = value
        .replace(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5")
        .slice(0, 18);
      setFormData({ ...formData, phone: formattedPhone });
    }
  };

  // Маска для даты
  const handleBirthdayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Убираем нецифровые символы
    if (value.length <= 8) {
      const formattedBirthday = value
        .replace(/^(\d{2})(\d{2})(\d{4})/, "$1.$2.$3")
        .slice(0, 10);
      setFormData({ ...formData, birthday: formattedBirthday });
    }
  };

  // Обработчик отправки формы
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editEmployee(formData));
    navigate("/");
  };

  return (
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
        В архиве:
        <input
          type="checkbox"
          name="isArchive"
          checked={formData.isArchive}
          onChange={handleCheckboxChange}
        />
      </label>

      <button type="submit">Save</button>
    </form>
  );
};

export default EmployeeForm;
