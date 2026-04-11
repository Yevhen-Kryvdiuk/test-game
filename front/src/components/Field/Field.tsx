import { ReactNode, MouseEvent } from 'react';
import styles from './Field.module.css';

interface FieldProps {
  children?: ReactNode;
  onShoot?: (clickX: number, clickY: number) => void;
}

function Field({ children, onShoot }: FieldProps) {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!onShoot) return;
    const rect = e.currentTarget.getBoundingClientRect();
    onShoot(e.clientX - rect.left, e.clientY - rect.top);
  };

  return (
    <div className={styles.field} onClick={handleClick}>
      {children}
    </div>
  );
}

export default Field;
