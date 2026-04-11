import { useGame } from './hooks/useGame.ts';
import { useSound } from './hooks/useSound.ts';
import Scoreboard from './components/Scoreboard/Scoreboard.tsx';
import Field from './components/Field/Field.tsx';
import Duck from './components/Duck/Duck.tsx';
import styles from './App.module.css';

function App() {
  const { status, isRunning, start, stop, shoot } = useGame();
  useSound(status);

  return (
    <>
      <Scoreboard />
      <Field onShoot={shoot}>
        {status !== 'start' && <Duck />}
      </Field>
      <div className={styles.buttons}>
        <button className={styles.btn} onClick={start} disabled={isRunning}>
          Start
        </button>
        <button className={styles.btn} onClick={stop} disabled={!isRunning}>
          Stop
        </button>
      </div>
    </>
  );
}

export default App;
