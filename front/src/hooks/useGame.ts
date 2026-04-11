import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store.ts';
import {
  startRound,
  move,
  hitDuck,
  endRound,
  reset,
  setScore,
  syncState,
  stopGame,
} from '../store/gameSlice.ts';
import { FIELD_WIDTH } from '../constants/field.ts';
import { socket } from '../socket.ts';
import { shotSound } from '../sounds.ts';

interface ShootResult {
  hit: boolean;
  hits: number;
  round: number;
}

export function useGame() {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.game.status);
  const isRunning = useSelector((state: RootState) => state.game.isRunning);
  const duckX = useSelector((state: RootState) => state.game.duckX);
  const duckY = useSelector((state: RootState) => state.game.duckY);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    socket.on('state', (s) => dispatch(syncState(s)));
    socket.on('round_start', (p) => dispatch(startRound(p)));
    socket.on('game_stop', () => dispatch(stopGame()));
    socket.on('shoot_result', (r: ShootResult) => {
      dispatch(setScore({ round: r.round, hits: r.hits }));
      if (r.hit) dispatch(hitDuck());
    });

    return () => {
      socket.off('state');
      socket.off('round_start');
      socket.off('game_stop');
      socket.off('shoot_result');
    };
  }, [dispatch]);

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
      socket.emit('round_end');
    }
  }, [duckX, duckY, status, dispatch]);

  useEffect(() => {
    if (status === 'hit') {
      const t = setTimeout(() => dispatch(reset()), 2000);
      return () => clearTimeout(t);
    }
    if (status === 'finish') {
      const t = setTimeout(() => dispatch(reset()), 1000);
      return () => clearTimeout(t);
    }
  }, [status, dispatch]);

  const start = () => socket.emit('request_start');
  const stop = () => socket.emit('request_stop');
  const shoot = (clickX: number, clickY: number) => {
    shotSound.play();
    socket.emit('shoot', { clickX, clickY });
  };

  return { status, isRunning, start, stop, shoot };
}
