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
      <video
        src="https://cdn.pixabay.com/video/2023/04/28/160767-822213540_small.mp4"
        autoPlay
        muted
        loop
      ></video>
    </>
  );
};

export default NotFound;
