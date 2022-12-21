import { ReactNode } from "react";
import styles from "./styles.module.scss";

const TableData = ({
  children,
  color,
}: {
  children: ReactNode;
  color?: string;
}) => <td className={styles.table_data}>{children}</td>;

export default TableData;
