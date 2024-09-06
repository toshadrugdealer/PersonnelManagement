import { FC, useState } from "react";
import EmployeeList from "../../components/EmployeeList/EmployeeList";
import { Link } from "react-router-dom";
import EmployeeFilter from "../../components/EmployeeFilter/EmployeeFilter";
import { Transition } from "react-transition-group";
import styles from "./Home.module.scss";
import { useAppSelector } from "../../store/hooks";

const Home: FC = () => {
  const [filterRole, setFilterRole] = useState<
    "all" | "cook" | "waiter" | "driver"
  >("all");
  const [filterArchive, setFilterArchive] = useState<boolean>(false);
  const [sortField, setSortField] = useState<"name" | "birthday" | "">("");
  const [isModal, setIsModal] = useState(false);

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const employees = useAppSelector((state) => state.employees.length);

  return (
    <>
      <header>
        {employees ? (
          <button className={styles.filterBtn} onClick={handleModal}></button>
        ) : null}
        <h1>Personnel Management</h1>
      </header>

      <main className={styles.employeeManagement}>
        {employees ? (
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
        ) : null}

        <Transition in={isModal} timeout={300}>
          {(state) => (
            <div className={`${styles.employeeFilterModal} ${state}`}>
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
        </Transition>

        <EmployeeList
          filterRole={filterRole}
          filterArchive={filterArchive}
          sortField={sortField}
        />
      </main>
    </>
  );
};

export default Home;
