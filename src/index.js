import "./styles.css";
import createGame from "./modules/gameloop";

export let game = createGame();

export function createNewGame() {
  const names = getNameValues(game);
  game = createGame();
  insertNamesToForm(names);
}

function getNameValues(game) {
  const player1Name = game.getPlayerName(1);
  const player2Name = game.getPlayerName(2);

  return { one: player1Name, two: player2Name };
}

function insertNamesToForm(names) {
  insertNameToInput(names.one, 1);

  if (names.two) {
    insertNameToInput(names.two, 2);
  }
}

function insertNameToInput(name, playerNumber) {
  const playerInput = document.querySelector(
    `input#player-${playerNumber}-name`,
  );
  playerInput.value = name;
}
