import {
  addAttackListener,
  addDarkenClass,
  adjustOpacityOfCurrentPlayerBoard,
  getBoardDiv,
  removeAttackListener,
  removeDarkenClass,
} from "./board";
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

export function showShips(playerNumber) {
  const isPlayerOne = playerNumber == 1;
  const boardClass = getBoardClass(isPlayerOne);
  const ships = document.querySelectorAll(`${boardClass} .ship`);

  ships.forEach((ship) => {
    ship.classList.remove("hide");
  });
}

export function showSetupButtons(playerNumber) {
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
  const dialog = document.querySelector("dialog#player-two-setup");
  const button = dialog.querySelector("button.setup");
  insertNameInDialog(dialog);

  dialog.showModal();
  button.addEventListener("click", setupScreenForSecondPlayer);
}

function insertNameInDialog(dialog) {
  const span = dialog.querySelector("span.name");
  const name = game.opponentPlayer.name;

  span.textContent = name;
}

function setupScreenForSecondPlayer() {
  const playerNumber = game.currentPlayerSettingUp;
  closePlayerTwoSetupDialog();
  showShips(playerNumber);
  showSetupButtons(playerNumber);
  randomizeShips();
  listenToShip();
  listenToRandomize();
  listenToReady();
}

function closePlayerTwoSetupDialog() {
  const dialog = document.querySelector("dialog#player-two-setup");
  dialog.close();
}

export function switchActivePlayerOnBoard() {
  const isPlayerOne = true;
  const playerOneBoard = getBoardDiv(isPlayerOne);
  const playerTwoBoard = getBoardDiv(!isPlayerOne);
  showCurrentPlayerName();
  adjustOpacityOfCurrentPlayerBoard();
  activateShowButtonForCurrentPlayer();

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

export function showCurrentPlayerName() {
  if (game.humanOpponent) {
    const name = game.currentPlayer.name;
    const span = document.querySelector(".playerTurn span.name");
    span.parentElement.parentElement.classList.remove("hide");

    span.textContent = name;
  }
}

export function activateShowButtonForCurrentPlayer() {
  if (!game.isHumanOpponent() || game.dontActivateShowButtons) {
    return;
  }
  const isPlayerOne = game.isPlayerOneCurrentPlayer();
  const showButtonDivCurrent = getShowButton(isPlayerOne);
  const showButtonDivOpponent = getShowButton(!isPlayerOne);

  revealAndHideButtons(showButtonDivCurrent, showButtonDivOpponent);
  activateAndRemoveButtonListeners(showButtonDivCurrent, showButtonDivOpponent);
}

function activateAndRemoveButtonListeners(currentDiv, opponentDiv) {
  const currentButton = currentDiv.querySelector("button");
  const opponentButton = opponentDiv.querySelector("button");

  activateListener(currentButton);
  removeListener(opponentButton);
}

function activateListener(button) {
  button.addEventListener("mousedown", showCurrentPlayerShips);
}

export function removeListener(button) {
  button.removeEventListener("mousedown", showCurrentPlayerShips);
  document.removeEventListener("mouseup", hideCurrentPlayerShips);
}

function showCurrentPlayerShips() {
  const container = getCurrentPlayerContainer();
  const playerNumber = getPlayerNumberFromContainer(container);
  const board = container.querySelector(".board");
  removeDarkenClass(board);

  showShips(playerNumber);
  document.addEventListener("mouseup", hideCurrentPlayerShips);
}

function hideCurrentPlayerShips() {
  const container = getCurrentPlayerContainer();
  const playerNumber = getPlayerNumberFromContainer(container);
  const board = container.querySelector(".board");
  addDarkenClass(board);

  hidePlayerShips(playerNumber);
}

function getCurrentPlayerContainer() {
  const isPlayerOne = game.isPlayerOneCurrentPlayer();

  return getBoardDiv(isPlayerOne).parentElement;
}

function getContainerFromShowButtonEvent(e) {
  return e.target.closest(".board-container");
}

function getPlayerNumberFromContainer(div) {
  return div.classList.contains("player-container") ? 1 : 2;
}

function revealAndHideButtons(currentDiv, opponentDiv) {
  revealShowButton(currentDiv);
  hideShowButton(opponentDiv);
}

function getShowButton(isPlayerOne) {
  const container = getBoardDiv(isPlayerOne).parentElement;

  return container.querySelector(".showButton");
}

function revealShowButton(div) {
  div.classList.remove("hide");
}

export function hideShowButton(div) {
  div.classList.add("hide");
}
