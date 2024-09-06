import { FC, useState } from "react";
import EmployeeList from "../../components/EmployeeList/EmployeeList";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";
import EmployeeFilter from "../../components/EmployeeFilter/EmployeeFilter";

const Home: FC = () => {
  const [filterRole, setFilterRole] = useState<
    "all" | "cook" | "waiter" | "driver"
  >("all");
  const [filterArchive, setFilterArchive] = useState<boolean>(false);
  const [sortField, setSortField] = useState<"name" | "birthday" | "">("");
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <div className={styles.homePage}>
      <header>
        <button
          style={{ backgroundColor: `${modal ? "red" : "blue"}` }}
          className={styles.filterBtn}
          onClick={handleModal}
        ></button>
        <h1>Personnel Management</h1>
      </header>

      <div className={styles.employeeManagement}>
        <div className={styles.employeeFilterWrapper}>
          <EmployeeFilter
            setFilterRole={setFilterRole}
            setFilterArchive={setFilterArchive}
            setSortField={setSortField}
          />
          <Link to="/add">
            <button>Add a new employee</button>
          </Link>
        </div>

        {modal && (
          <div className={styles.employeeFilterModal}>
            <EmployeeFilter
              setFilterRole={setFilterRole}
              setFilterArchive={setFilterArchive}
              setSortField={setSortField}
            />
            <Link to="/add">
              <button>Add a new employee</button>
            </Link>
          </div>
        )}
        <EmployeeList
          filterRole={filterRole}
          filterArchive={filterArchive}
          sortField={sortField}
        />
      </div>
    </div>
  );
};

export default Home;
