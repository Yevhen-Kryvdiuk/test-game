import { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import type { GameStatus } from '../store/gameSlice.ts';

export function useSound(status: GameStatus) {
  const quack = useRef(new Howl({ src: ['/sounds/quack.mp3'], loop: true }));
  const shot = useRef(new Howl({ src: ['/sounds/awp.mp3'], loop: false }));

  useEffect(() => {
    if (status === 'process') {
      quack.current.play();
    } else if (status === 'hit') {
      quack.current.stop();
      shot.current.play();
    } else {
      quack.current.stop();
    }
  }, [status]);
}
