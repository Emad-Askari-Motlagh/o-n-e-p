import { ReactNode } from "react";
import styles from "./styles.module.scss";

const TableHeader = ({ children }: { children: ReactNode }) => (
  <th className={styles.table_header}>{children}</th>
);

export default TableHeader;
