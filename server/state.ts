import type { Direction } from './config.ts';
import { FIELD_HEIGHT } from './config.ts';

export interface GameState {
  isRunning: boolean;
  roundActive: boolean;
  round: number;
  hits: number;
  direction: Direction;
  baseSpeedX: number;
  baseSpeedY: number;
  startX: number;
  startY: number;
  startTime: number;
}

export const game: GameState = {
  isRunning: false,
  roundActive: false,
  round: 0,
  hits: 0,
  direction: 'diagonal',
  baseSpeedX: 5,
  baseSpeedY: -3,
  startX: 0,
  startY: FIELD_HEIGHT,
  startTime: 0,
};

export const timers = {
  pause: null as ReturnType<typeof setTimeout> | null,
};
