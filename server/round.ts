import { game } from './state.ts';
import {
  directions,
  speeds,
  FIELD_HEIGHT,
  MOVE_MS,
  SPEED_STEP,
  DUCK_HALF,
} from './config.ts';
import type { Direction } from './config.ts';

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickStartPosition(direction: Direction) {
  switch (direction) {
    case 'horizontal':
      return { x: 0, y: randomInt(100, 400) };
    case 'vertical':
      return { x: randomInt(100, 700), y: FIELD_HEIGHT };
    case 'diagonal':
      return { x: 0, y: randomInt(300, 500) };
  }
}

export function prepareNextRound() {
  game.round++;
  game.direction = directions[Math.floor(Math.random() * 3)];
  const base = speeds[game.direction];
  game.baseSpeedX = base.x;
  game.baseSpeedY = base.y;
  const start = pickStartPosition(game.direction);
  game.startX = start.x;
  game.startY = start.y;
  game.startTime = Date.now();
  game.roundActive = true;
}

export function getDuckPosition() {
  const flightTime = Date.now() - game.startTime;
  const moves = Math.floor(flightTime / MOVE_MS);
  const mult = 1 + game.round * SPEED_STEP;
  return {
    duckX: game.startX + game.baseSpeedX * mult * moves,
    duckY: game.startY + game.baseSpeedY * mult * moves,
  };
}

export function checkHit(clickX: number, clickY: number) {
  const { duckX, duckY } = getDuckPosition();
  return (
    Math.abs(clickX - duckX) < DUCK_HALF &&
    Math.abs(clickY - duckY) < DUCK_HALF
  );
}
