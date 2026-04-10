import { createSlice } from '@reduxjs/toolkit';
import { FIELD_HEIGHT } from '../constants/field.ts';

export type GameStatus = 'start' | 'process' | 'finish';

interface GameState {
  status: GameStatus;
  duckX: number;
  duckY: number;
  round: number;
  hits: number;
}

const initialState: GameState = {
  status: 'start',
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
      state.duckX = 0;
      state.duckY = FIELD_HEIGHT;
      state.round++;
    },
    move(state) {
      state.duckX += 5;
      state.duckY -= 3;
    },
    hitDuck(state) {
      state.status = 'finish';
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
