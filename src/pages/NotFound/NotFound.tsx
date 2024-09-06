import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <div className={styles.wrapper}>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/">Go back to Home</Link>
      </div>
    </>
  );
};

export default NotFound;
