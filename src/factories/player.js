import createGameBoard from "./gameboard";

export default function createPlayer(playerName) {
  const name = playerName;
  const board = createGameBoard();

  return {
    board: board,
    get name() {
      return playerName;
    },
  };
}
