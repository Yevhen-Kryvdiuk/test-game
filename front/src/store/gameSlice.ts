import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FIELD_HEIGHT } from '../constants/field.ts';

export type GameStatus = 'start' | 'process' | 'hit' | 'finish';
export type Direction = 'diagonal' | 'vertical' | 'horizontal';

interface RoundPayload {
  round: number;
  hits: number;
  direction: Direction;
  baseSpeedX: number;
  baseSpeedY: number;
  duckX: number;
  duckY: number;
}

interface SyncPayload {
  isRunning: boolean;
  round: number;
  hits: number;
}

interface GameState {
  status: GameStatus;
  isRunning: boolean;
  direction: Direction;
  baseSpeedX: number;
  baseSpeedY: number;
  duckX: number;
  duckY: number;
  round: number;
  hits: number;
}

const initialState: GameState = {
  status: 'start',
  isRunning: false,
  direction: 'diagonal',
  baseSpeedX: 5,
  baseSpeedY: -3,
  duckX: 0,
  duckY: FIELD_HEIGHT,
  round: 0,
  hits: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startRound(state, action: PayloadAction<RoundPayload>) {
      const p = action.payload;
      state.status = 'process';
      state.isRunning = true;
      state.round = p.round;
      state.hits = p.hits;
      state.direction = p.direction;
      state.baseSpeedX = p.baseSpeedX;
      state.baseSpeedY = p.baseSpeedY;
      state.duckX = p.duckX;
      state.duckY = p.duckY;
    },
    move(state) {
      const mult = 1 + state.round * 0.2;
      state.duckX += state.baseSpeedX * mult;
      state.duckY += state.baseSpeedY * mult;
    },
    hitDuck(state) {
      state.status = 'hit';
    },
    endRound(state) {
      state.status = 'finish';
    },
    reset(state) {
      state.status = 'start';
    },
    setScore(state, action: PayloadAction<{ round: number; hits: number }>) {
      state.round = action.payload.round;
      state.hits = action.payload.hits;
    },
    syncState(state, action: PayloadAction<SyncPayload>) {
      state.isRunning = action.payload.isRunning;
      state.round = action.payload.round;
      state.hits = action.payload.hits;
    },
    stopGame(state) {
      state.status = 'start';
      state.isRunning = false;
      state.round = 0;
      state.hits = 0;
      state.duckX = 0;
      state.duckY = FIELD_HEIGHT;
    },
  },
});

export const {
  startRound,
  move,
  hitDuck,
  endRound,
  reset,
  setScore,
  syncState,
  stopGame,
} = gameSlice.actions;
export default gameSlice.reducer;
