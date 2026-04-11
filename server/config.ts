export const FIELD_HEIGHT = 500;
export const DUCK_HALF = 40;
export const MOVE_MS = 30;
export const SPEED_STEP = 0.2;
export const ROUND_PAUSE = 2000;

export type Direction = 'diagonal' | 'vertical' | 'horizontal';

export const directions: Direction[] = ['diagonal', 'vertical', 'horizontal'];

export const speeds: Record<Direction, { x: number; y: number }> = {
  diagonal: { x: 5, y: -3 },
  vertical: { x: 0, y: -5 },
  horizontal: { x: 5, y: 0 },
};
