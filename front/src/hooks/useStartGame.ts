import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

export function useStartGame() {
  const [pong, setPong] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const count = useRef(1);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    socket.on('pong', (count: number) => {
      setPong(count);
    });

    return () => {
      socket.off('pong');
    };
  }, []);

  const start = () => {
    if (timer.current) return;
    setRunning(true);
    timer.current = setInterval(() => {
      socket.emit('ping', count.current);
      count.current++;
    }, 3000);
  };

  const stop = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    setRunning(false);
    count.current = 1;
    setPong(null);
  };

  return { pong, running, start, stop };
}
