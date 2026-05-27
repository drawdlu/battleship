import { getBoardDiv } from "./board";
import { game } from "../index";

export function hidePlayerShips() {
  const playerOnesettingUp = game.currentPlayerSettingUp == 1;
  const ships = getShips(playerOnesettingUp);

  ships.forEach((ship) => {
    ship.classList.add("hide");
  });
}

export function getShips(isPlayerOne) {
  const boardDiv = getBoardDiv(isPlayerOne);
  const ships = boardDiv.querySelectorAll(".ship");

  return ships;
}
