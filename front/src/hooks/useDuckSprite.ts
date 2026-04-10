import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store.ts';

const FRAMES = [1, 2, 3, 2] as const;
const FRAME_DELAY = 150;

export function useDuckSprite(status: string) {
  const [frame, setFrame] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const direction = useSelector((state: RootState) => state.game.direction);

  useEffect(() => {
    if (status === 'process') {
      setFrame(0);
      timer.current = setInterval(() => {
        setFrame((prev) => (prev + 1) % FRAMES.length);
      }, FRAME_DELAY);
    }

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [status]);

  if (status === 'hit') {
    return '/images/shot.png';
  }

  return `/images/${direction}_${FRAMES[frame]}.png`;
}
