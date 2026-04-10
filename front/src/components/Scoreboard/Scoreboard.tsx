import styles from './Scoreboard.module.css';

interface ScoreboardProps {
  hits: number;
  total: number;
}

function Scoreboard({ hits, total }: ScoreboardProps) {
  return <div className={styles.scoreboard}>{hits} / {total}</div>;
}

export default Scoreboard;
