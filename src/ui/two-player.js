import { getBoardDiv } from "./board";

export function hidePlayerShips(isPlayerOne) {
  const ships = getShips(isPlayerOne);

  ships.forEach((ship) => {
    ship.classList.add("hide");
  });
}

function getShips(isPlayerOne) {
  const boardDiv = getBoardDiv(isPlayerOne);
  const ships = boardDiv.querySelectorAll(".ship");

  return ships;
}
