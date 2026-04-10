import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

export function useStartGame() {
  const [pong, setPong] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const countRef = useRef(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    socket.on('pong', (count: number) => {
      setPong(`pong ${count}`);
    });

    return () => {
      socket.off('pong');
    };
  }, []);

  const start = () => {
    if (intervalRef.current) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      socket.emit('ping', countRef.current);
      countRef.current++;
    }, 3000);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false);
    countRef.current = 1;
    setPong(null);
  };

  return { pong, running, start, stop };
}
