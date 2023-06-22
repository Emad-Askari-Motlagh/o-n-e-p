import React, { ReactNode, MouseEvent, FC } from "react";
import styles from "./header.module.scss";

interface NavItemProps {
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLLIElement>) => void;
  icon?: ReactNode;
  header_label: string;
  onPointerLeave?: (event: MouseEvent<HTMLLIElement>) => void;
}

const NavItem: FC<NavItemProps> = ({
  children,
  onClick,
  icon,
  header_label,
  onPointerLeave,
}) => {
  return (
    <li
      className={styles.nav_item}
      onClick={onClick}
      onPointerLeave={onPointerLeave}>
      {children}
      {icon}
      <span>{header_label}</span>
    </li>
  );
};

export default NavItem;
