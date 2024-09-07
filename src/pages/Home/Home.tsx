import { FC, useState } from "react";
import EmployeeList from "../../components/EmployeeList/EmployeeList";
import EmployeeFilter from "../../components/EmployeeFilter/EmployeeFilter";
import Header from "../../components/Header/Header";
import BgVideo from "../../components/BgVideo/BgVideo";
import { Transition } from "react-transition-group";
import { useAppSelector } from "../../store/hooks";
import styles from "./Home.module.scss";

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
      <Header employees={employees} handleModal={handleModal} />

      <main className={styles.employeeManagement}>
        {employees ? (
          <div className={styles.employeeFilterWrapper}>
            <EmployeeFilter
              setFilterRole={setFilterRole}
              setFilterArchive={setFilterArchive}
              setSortField={setSortField}
            />
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
            </div>
          )}
        </Transition>

        <EmployeeList
          filterRole={filterRole}
          filterArchive={filterArchive}
          sortField={sortField}
        />
      </main>
      <BgVideo />
    </>
  );
};

export default Home;
