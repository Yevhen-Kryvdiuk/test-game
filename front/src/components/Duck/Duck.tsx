import styles from './Duck.module.css';

interface DuckProps {
  x: number;
  y: number;
}

function Duck({ x, y }: DuckProps) {
  return (
    <div
      className={styles.duck}
      style={{ left: x, top: y }}
    />
  );
}

export default Duck;
