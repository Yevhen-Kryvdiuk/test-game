import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store.ts';
import { hitDuck } from '../../store/gameSlice.ts';
import styles from './Duck.module.css';

function Duck() {
  const dispatch = useDispatch();
  const { duckX, duckY, status } = useSelector((state: RootState) => state.game);

  const onClick = () => {
    if (status === 'process') {
      dispatch(hitDuck());
    }
  };

  return (
    <div
      className={styles.duck}
      style={{ left: duckX, top: duckY }}
      onClick={onClick}
    />
  );
}

export default Duck;
