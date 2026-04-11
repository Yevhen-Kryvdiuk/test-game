import type { Server } from 'socket.io';
import { game, timers } from './state.ts';
import { prepareNextRound, checkHit } from './round.ts';
import { ROUND_PAUSE } from './config.ts';

export function registerHandlers(io: Server) {
  function startNextRound() {
    timers.pause = null;
    prepareNextRound();
    io.emit('round_start', {
      round: game.round,
      hits: game.hits,
      direction: game.direction,
      baseSpeedX: game.baseSpeedX,
      baseSpeedY: game.baseSpeedY,
      duckX: game.startX,
      duckY: game.startY,
    });
  }

  function endRoundAndSchedule() {
    if (!game.roundActive) return;
    game.roundActive = false;
    if (timers.pause) return;
    timers.pause = setTimeout(startNextRound, ROUND_PAUSE);
  }

  function startGame() {
    if (game.isRunning) return;
    game.isRunning = true;
    game.round = 0;
    game.hits = 0;
    startNextRound();
  }

  function stopGame() {
    if (timers.pause) {
      clearTimeout(timers.pause);
      timers.pause = null;
    }
    game.isRunning = false;
    game.roundActive = false;
    game.round = 0;
    game.hits = 0;
    io.emit('game_stop');
  }

  io.on('connection', (socket) => {
    console.log('connected', socket.id);

    socket.emit('state', {
      isRunning: game.isRunning,
      round: game.round,
      hits: game.hits,
    });

    socket.on('request_start', startGame);
    socket.on('request_stop', stopGame);

    socket.on('round_end', () => {
      if (!game.isRunning) return;
      endRoundAndSchedule();
    });

    socket.on('shoot', (payload: { clickX: number; clickY: number }) => {
      if (!game.isRunning || !game.roundActive) return;

      if (checkHit(payload.clickX, payload.clickY)) {
        game.hits++;
        io.emit('shoot_result', { hit: true, hits: game.hits, round: game.round });
        endRoundAndSchedule();
      } else {
        socket.emit('shoot_result', { hit: false, hits: game.hits, round: game.round });
      }
    });
  });
}
