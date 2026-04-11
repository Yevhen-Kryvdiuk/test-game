import { useEffect } from 'react';
import { quackSound } from '../sounds.ts';
import type { GameStatus } from '../store/gameSlice.ts';

export function useSound(status: GameStatus) {
  useEffect(() => {
    if (status === 'process') {
      quackSound.play();
    } else {
      quackSound.stop();
    }
  }, [status]);
}
