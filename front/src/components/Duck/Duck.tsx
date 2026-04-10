import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store.ts';
import { hitDuck } from '../../store/gameSlice.ts';
import { useDuckSprite } from '../../hooks/useDuckSprite.ts';
import styles from './Duck.module.css';

function Duck() {
  const dispatch = useDispatch();
  const { duckX, duckY, status } = useSelector((state: RootState) => state.game);
  const sprite = useDuckSprite(status);

  const onClick = () => {
    if (status === 'process') {
      dispatch(hitDuck());
    }
  };

  return (
    <img
      className={styles.duck}
      style={{ left: duckX, top: duckY }}
      src={sprite}
      alt="duck"
      onClick={onClick}
      draggable={false}
    />
  );
}

export default Duck;
