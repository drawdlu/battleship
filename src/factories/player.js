import createGameBoard from "./gameboard";

export default function createPlayer(name) {
  const playerName = name;
  const gameBoard = createGameBoard();

  return {
    board: gameBoard,
    get name() {
      return playerName;
    },
  };
}
