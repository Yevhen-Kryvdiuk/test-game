import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store.ts';
import styles from './Duck.module.css';

function Duck() {
  const { duckX, duckY } = useSelector((state: RootState) => state.game);

  return (
    <div
      className={styles.duck}
      style={{ left: duckX, top: duckY }}
    />
  );
}

export default Duck;
