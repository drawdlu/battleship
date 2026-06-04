import { createNewGame } from "../index";
import { getBoardDiv, removeDarkenClass, removeAttackListener } from "./board";
import {
  showSetupButtons,
  hideShowButton,
  showShips,
  removeListener,
  hideSetupButtons,
  hidePlayerShips,
} from "./two-player";
import { hideShipHitsDisplay } from "./ship-hits";

export function addNewGameListener(button) {
  button.addEventListener("click", handleNewGame);
}

export function handleNewGame(e) {
  const confirm = e.target.dataset.confirm == "yes";
  let restart = getRestartValue(confirm);

  if (restart) {
    handleShowHideElements();
    createNewGame();
  }
}

function handleShowHideElements() {
  const board1 = getBoardDiv(true);
  const board2 = getBoardDiv(false);

  removeWinnerOverlay();
  removeBoardCells();
  showPlayer1SetupButtons();
  removeDarkenFromBoards(board1, board2);
  removeShowButtons();
  showPlayer1Ships();
  hideShipHitsDisplay();
  addCanMoveToShips();
  removeAttackListeners();
  removeFleetDamage();
  hideAllPlayerSetupButtons();
  hidePlayer2Ships();
}

function hidePlayer2Ships() {
  hidePlayerShips(2);
}

function hideAllPlayerSetupButtons() {
  hideSetupButtons(1);
  hideSetupButtons(2);
}

function removeFleetDamage() {
  const fleetDivs = document.querySelectorAll(".ship-display div");

  fleetDivs.forEach((div) => {
    div.classList.add("safe");
    div.classList.remove("hit");
  });
}

function removeAttackListeners() {
  const boards = document.querySelectorAll(".board");

  boards.forEach((board) => {
    removeAttackListener(board);
  });
}

function addCanMoveToShips() {
  const ships = document.querySelectorAll(".ship");

  ships.forEach((ship) => {
    ship.classList.add("can-move");
  });
}

function showPlayer1Ships() {
  showShips(1);
}

function removeShowButtons() {
  const buttonDivs = document.querySelectorAll(".showButton");

  buttonDivs.forEach((div) => {
    hideShowButton(div);
    removeListener(div.querySelector("button"));
  });
}

function removeDarkenFromBoards(board1, board2) {
  removeDarkenClass(board1);
  removeDarkenClass(board2);
}

function showPlayer1SetupButtons() {
  showSetupButtons(1);
}

export function listenToRestart() {
  const button = document.querySelector("button.restart");

  addNewGameListener(button);
}

function getRestartValue(confirm) {
  if (confirm) {
    return window.confirm("Are you sure you want to restart the game?");
  } else {
    return true;
  }
}

function removeWinnerOverlay() {
  const dialog = document.querySelector("dialog#win");

  dialog.close();
}

function removeBoardCells() {
  const board1 = getBoardDiv(true);
  const board2 = getBoardDiv(false);

  removeBoardCellsAfterShips(board1);
  removeBoardCellsAfterShips(board2);
}

function removeBoardCellsAfterShips(board) {
  const lastShip = board.querySelector(".ship.five");

  while (lastShip.nextElementSibling) {
    lastShip.nextElementSibling.remove();
  }
}
