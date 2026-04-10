import { useGame } from './hooks/useGame.ts';
import Scoreboard from './components/Scoreboard/Scoreboard.tsx';
import Field from './components/Field/Field.tsx';
import Duck from './components/Duck/Duck.tsx';
import styles from './App.module.css';

function App() {
  const { status, start } = useGame();

  return (
    <>
      <Scoreboard />
      <Field>
        {status !== 'start' && <Duck />}
      </Field>
      <button className={styles.btn} onClick={start} disabled={status !== 'start'}>
        Start
      </button>
    </>
  );
}

export default App;
