import createGameBoard from "./gameboard";

export default function createComputerPlayer() {
  const gameBoard = createGameBoard();
  const attacksArr = Array.from({ length: 10 }, (_, x) =>
    Array.from({ length: 10 }, (_, y) => [x, y]),
  ).flat();

  const getAttackCoords = () => {
    const index = getRandomIndex();
    const attacksCoords = attacksArr[index];
    removeAttackFromArr(index);

    return attacksCoords;
  };

  const getRandomIndex = () => {
    const lastIndex = attacksArr.length;

    return Math.floor(Math.random() * lastIndex);
  };

  const removeAttackFromArr = (index) => {
    attacksArr.splice(index, 1);
  };

  return {
    board: gameBoard,
    getAttackCoords,
  };
}
