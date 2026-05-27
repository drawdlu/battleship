import { getBoardDiv } from "./board";
import { game } from "../index";

export function hidePlayerShips() {
  const ships = getShips(isPlayerOneSetup());

  ships.forEach((ship) => {
    ship.classList.add("hide");
  });
}

export function isPlayerOneSetup() {
  return game.currentPlayerSettingUp == 1;
}

export function getShips(isPlayerOne) {
  const boardDiv = getBoardDiv(isPlayerOne);
  const ships = boardDiv.querySelectorAll(".ship");

  return ships;
}

export function getBoardClass() {
  if (isPlayerOneSetup()) {
    return ".player.board";
  } else {
    return ".opponent.board";
  }
}
