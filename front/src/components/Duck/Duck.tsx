import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store.ts';
import { useDuckSprite } from '../../hooks/useDuckSprite.ts';
import styles from './Duck.module.css';

function Duck() {
  const { duckX, duckY, status } = useSelector((state: RootState) => state.game);
  const sprite = useDuckSprite(status);

  return (
    <img
      className={styles.duck}
      style={{ left: duckX, top: duckY }}
      src={sprite}
      alt="duck"
      draggable={false}
    />
  );
}

export default Duck;
