import Lottie from "lottie-react";
import styles from "./styles.module.scss";

const LoadingIndicator = ({ animation }) => (
  <div className={styles.spinner}>
    <Lottie
      className={styles.spinner__icon}
      animationData={animation}
      loop={true}
    />
  </div>
);
export default LoadingIndicator;
