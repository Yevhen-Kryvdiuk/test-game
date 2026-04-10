import { ReactNode } from 'react';
import styles from './Field.module.css';

interface FieldProps {
  children?: ReactNode;
}

function Field({ children }: FieldProps) {
  return <div className={styles.field}>{children}</div>;
}

export default Field;
