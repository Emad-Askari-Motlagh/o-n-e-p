import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import styles from "./AnimatedHeader.module.scss";

interface AnimatedHeaderProps {
  children: ReactNode;
  color?: string;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ children, color }) => {
  const headerVariants: Variants = {
    initial: { opacity: 0, y: -200 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.h1
      style={{ color }}
      className={styles.header_con}
      initial="initial"
      animate="animate"
      variants={headerVariants}>
      {children}
    </motion.h1>
  );
};

export default AnimatedHeader;
