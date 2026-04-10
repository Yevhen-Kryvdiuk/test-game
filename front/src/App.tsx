import { useGame } from './hooks/useGame.ts';
import Scoreboard from './components/Scoreboard/Scoreboard.tsx';
import Field from './components/Field/Field.tsx';
import Duck from './components/Duck/Duck.tsx';

function App() {
  const { status, start } = useGame();

  return (
    <>
      <Scoreboard />
      <Field>
        {status === 'process' && <Duck />}
      </Field>
      <button onClick={start} disabled={status !== 'start'}>
        Start
      </button>
    </>
  );
}

export default App;
