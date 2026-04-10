import Scoreboard from './components/Scoreboard/Scoreboard.tsx';
import Field from './components/Field/Field.tsx';
import Duck from './components/Duck/Duck.tsx';
import { useStartGame } from './hooks/useStartGame.ts';

function App() {
  const { pong, running, start, stop } = useStartGame();

  return (
    <>
      <Scoreboard hits={0} total={0} />
      <Field>
        {running && <Duck x={100} y={200} />}
      </Field>
      <div>{pong}</div>
      <button onClick={start} disabled={running}>Start</button>
      <button onClick={stop} disabled={!running}>Stop</button>
    </>
  );
}

export default App;
