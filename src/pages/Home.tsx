import { FC, useState } from "react";
import EmployeeList from "../components/EmployeeList";
import EmployeeFilter from "../components/EmployeeFilter";
import { Link } from "react-router-dom";

const Home: FC = () => {
  const [filterRole, setFilterRole] = useState<
    "all" | "cook" | "waiter" | "driver"
  >("all");
  const [filterArchive, setFilterArchive] = useState<boolean>(false);
  const [sortField, setSortField] = useState<"name" | "birthday" | "">("");

  return (
    <div className="home-page">
      <h1>Personnel management</h1>
      <Link to="/add">
        <button>Add a new employee</button>
      </Link>
      <EmployeeFilter
        setFilterRole={setFilterRole}
        setFilterArchive={setFilterArchive}
        setSortField={setSortField}
      />
      <EmployeeList
        filterRole={filterRole}
        filterArchive={filterArchive}
        sortField={sortField}
      />
    </div>
  );
};

export default Home;
