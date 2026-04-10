import { createSlice } from '@reduxjs/toolkit';
import { FIELD_HEIGHT } from '../constants/field.ts';

export type GameStatus = 'start' | 'process' | 'hit' | 'finish';
export type Direction = 'diagonal' | 'vertical' | 'horizontal';

const directions: Direction[] = ['diagonal', 'vertical', 'horizontal'];

interface GameState {
  status: GameStatus;
  direction: Direction;
  duckX: number;
  duckY: number;
  round: number;
  hits: number;
}

const initialState: GameState = {
  status: 'start',
  direction: 'diagonal',
  duckX: 0,
  duckY: FIELD_HEIGHT,
  round: 0,
  hits: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startRound(state) {
      state.status = 'process';
      state.direction = directions[state.round % 3];
      state.duckX = 0;
      state.duckY = FIELD_HEIGHT;
      state.round++;
    },
    move(state) {
      switch (state.direction) {
        case 'diagonal':
          state.duckX += 5;
          state.duckY -= 3;
          break;
        case 'vertical':
          state.duckY -= 5;
          break;
        case 'horizontal':
          state.duckX += 5;
          break;
      }
    },
    hitDuck(state) {
      state.status = 'hit';
      state.hits++;
    },
    endRound(state) {
      state.status = 'finish';
    },
    reset(state) {
      state.status = 'start';
    },
  },
});

export const { startRound, move, hitDuck, endRound, reset } = gameSlice.actions;
export default gameSlice.reducer;
