# Duck Hunt

Small game where you shoot ducks. Logic is on the server, client just renders and sends clicks.

## Run

Server:
```
npm install
npm run dev
```

Client:
```
cd front
npm install
npm run dev
```

Open http://localhost:5173.

## How to play

Press Start, the duck flies across the field. Click on the field to shoot. If you hit it - +1 to score.

The duck can fly in 3 directions: horizontal, vertical or diagonal. Direction and start point are picked randomly. Speed grows every round, so it gets harder.

- **Start** - start the game
- **Stop** - stop and reset the score

## NOTE

The game is made for a single player. If you open several tabs they will interfere with each other, multiplayer was not implemented.
