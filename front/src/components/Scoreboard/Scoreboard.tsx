import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store.ts';
import styles from './Scoreboard.module.css';

function Scoreboard() {
  const { hits, round } = useSelector((state: RootState) => state.game);

  return <div className={styles.scoreboard}>{hits} / {round}</div>;
}

export default Scoreboard;
