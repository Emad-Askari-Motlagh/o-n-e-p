import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import styles from "./AnimatedHeader.module.scss";

interface AnimatedHeaderProps {
  children: ReactNode;
  color?: string;
  fontSize?: string;
  Logo?: any;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  children,
  color,
  fontSize,
  Logo,
}) => {
  const headerVariants: Variants = {
    initial: { opacity: 0, y: -200 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.h1
      style={{ color, fontSize }}
      className={styles.header_container}
      initial="initial"
      animate="animate"
      variants={headerVariants}>
      <span className={styles.header_container__logo}>{Logo}</span>
      <span className={styles.header_container__label}> {children}</span>
    </motion.h1>
  );
};

export default AnimatedHeader;
