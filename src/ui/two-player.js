import { addAttackListener, getBoardDiv, removeAttackListener } from "./board";
import { game } from "../index";
import { randomizeShips, listenToRandomize } from "./randmoize";
import { listenToShip } from "./ships";
import { listenToReady } from "./ready";
import { attackInitiated } from "./attack";

export function hidePlayerShips(playerNumber) {
  const isPlayerOne = playerNumber == 1;
  const ships = getShips(isPlayerOne);

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

export function getBoardClass(isPlayerOne) {
  if (isPlayerOne) {
    return ".player.board";
  } else {
    return ".opponent.board";
  }
}

function showShips(playerNumber) {
  const isPlayerOne = playerNumber == 1;
  const boardClass = getBoardClass(isPlayerOne);
  const ships = document.querySelectorAll(`${boardClass} .ship`);

  ships.forEach((ship) => {
    ship.classList.remove("hide");
  });
}

function showSetupButtons(playerNumber) {
  const isPlayerOne = playerNumber == 1;
  const containerClass = getButtonsContainerClass(isPlayerOne);
  const buttonsContainer = document.querySelector(containerClass);

  buttonsContainer.classList.remove("hide");
}

export function hideSetupButtons(playerNumber) {
  const isPlayerOne = playerNumber == 1;
  const containerClass = getButtonsContainerClass(isPlayerOne);
  const buttonsContainer = document.querySelector(containerClass);

  buttonsContainer.classList.add("hide");
}

export function getButtonsContainerClass(isPlayerOne) {
  if (isPlayerOne) {
    return ".player-container .setup-buttons";
  } else {
    return ".opponent-container .setup-buttons";
  }
}

export function handleSecondPlayerRenderShipSetup() {
  const playerNumber = game.currentPlayerSettingUp;
  showShips(playerNumber);
  showSetupButtons(playerNumber);
  randomizeShips();
  listenToShip();
  listenToRandomize();
  listenToReady();
}

export function switchActivePlayerOnBoard() {
  const isPlayerOne = true;
  const playerOneBoard = getBoardDiv(isPlayerOne);
  const playerTwoBoard = getBoardDiv(!isPlayerOne);

  if (isBoardActiveEventClick(playerOneBoard)) {
    removeAttackListener(playerOneBoard);
    addAttackListener(playerTwoBoard);
  } else {
    removeAttackListener(playerTwoBoard);
    addAttackListener(playerOneBoard);
  }
}

function isBoardActiveEventClick(board) {
  return board.dataset.clickable === "true";
}
