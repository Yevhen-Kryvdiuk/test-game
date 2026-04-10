import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store.ts';
import { startRound, move, endRound, reset } from '../store/gameSlice.ts';
import { FIELD_WIDTH } from '../constants/field.ts';

export function useGame() {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.game.status);
  const duckX = useSelector((state: RootState) => state.game.duckX);
  const duckY = useSelector((state: RootState) => state.game.duckY);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (status === 'process') {
      timer.current = setInterval(() => {
        dispatch(move());
      }, 30);
    }

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [status, dispatch]);

  useEffect(() => {
    if (status === 'process' && (duckX > FIELD_WIDTH || duckY < 0)) {
      dispatch(endRound());
    }
  }, [duckX, duckY, status, dispatch]);

  useEffect(() => {
    if (status === 'finish') {
      const delay = setTimeout(() => dispatch(reset()), 1000);
      return () => clearTimeout(delay);
    }
  }, [status, dispatch]);

  const start = () => dispatch(startRound());

  return { status, start };
}
