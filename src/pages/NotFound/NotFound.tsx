import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/">Go back to Home</Link>
      </div>
      <div className="effects"></div>
      <video src="../../../public/video.mp4" autoPlay muted loop></video>
    </>
  );
};

export default NotFound;
