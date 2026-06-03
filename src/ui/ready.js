import { dragShip } from "./ships";
import {
  getShipSize,
  getElementPosition,
  getAddDirection,
  divClassContains,
} from "../modules/helper";
import { game } from "../index";
import {
  addAttackListener,
  addClickableDivToBoard,
  getBoardDiv,
  adjustOpacityOfCurrentPlayerBoard,
} from "./board";
import { getSortedRandomShipCoords } from "./randmoize";
import {
  hidePlayerShips,
  isPlayerOneSetup,
  getShips,
  handleSecondPlayerRenderShipSetup,
  getButtonsContainerClass,
  hideSetupButtons,
  switchActivePlayerOnBoard,
  showCurrentPlayerName,
  activateShowButtonForCurrentPlayer,
} from "./two-player";

export function listenToReady() {
  const containerClass = getButtonsContainerClass(isPlayerOneSetup());
  const readyBtn = document.querySelector(`${containerClass} button.ready`);

  readyBtn.addEventListener("click", handleReady);
}

function handleReady() {
  const ships = getShips(isPlayerOneSetup());
  const shipCoords = [];

  ships.forEach((ship) => {
    ship.removeEventListener("mousedown", dragShip);
    ship.classList.remove("can-move");
    shipCoords.push(getShipCoords(ship));
  });

  hideSetupButtons(game.currentPlayerSettingUp);
  handleTwoPlayer(shipCoords);
}

function handleTwoPlayer(coords) {
  const currentPlayerSetup = game.currentPlayerSettingUp;
  if (game.twoPlayerGame && currentPlayerSetup == 2) {
    game.setupPlayerShips(coords, currentPlayerSetup);
    hidePlayerShips(currentPlayerSetup);
    setupGameStart();
  } else if (game.twoPlayerGame) {
    game.setupPlayerShips(coords, currentPlayerSetup);
    hidePlayerShips(currentPlayerSetup);
    game.setCurrentPlayerSettingUp(2);
    handleSecondPlayerRenderShipSetup();
  } else {
    const isPlayerOne = false;
    addClickableDivToBoard(isPlayerOne);
    addAttackListener(getBoardDiv(isPlayerOne));
    setupShipsWithComputerOpponent(coords);
    toggleShipDisplays();
  }
}

function toggleShipDisplays() {
  if (game.dontShowHits) {
    return;
  }
  const shipDisplays = document.querySelectorAll(".ship-hit-display");

  shipDisplays.forEach((shipDisplayDiv) => {
    shipDisplayDiv.classList.toggle("hide");
  });
}

function setupGameStart() {
  addClickableDivsToBothBoards();
  addAttackListenerToOpponentBoard();
  toggleShipDisplays();
  adjustOpacityOfCurrentPlayerBoard();
  showCurrentPlayerName();
  activateShowButtonForCurrentPlayer();
}

function addAttackListenerToOpponentBoard() {
  const isPlayerOne = false;
  const boardDiv = getBoardDiv(isPlayerOne);
  addAttackListener(boardDiv);
}

function addClickableDivsToBothBoards() {
  addClickableDivToBoard(true);
  addClickableDivToBoard(false);
}

function setupShipsWithComputerOpponent(coords) {
  game.setupPlayerShips(coords, 1);
  game.setupPlayerShips(getSortedRandomShipCoords(), 2);
}

function toggleShipZIndex(ship) {
  ship.classList.toggle("index-change");
}

function getShipCoords(ship) {
  const shipSize = getShipSize(ship);
  const vertical = divClassContains(ship, "vertical");
  const add = getAddDirection(vertical);
  let currentCoords = getCellCoordsInFront(ship);
  const coords = [];

  for (let i = 0; i < shipSize; ++i) {
    coords.push(currentCoords);

    currentCoords = [currentCoords[0] + add.y, currentCoords[1] + add.x];
  }

  return coords;
}

// Toggling ships z-index here to make sure I get the cell instead of the ship
function getCellCoordsInFront(ship) {
  toggleShipZIndex(ship);
  const shipPos = getElementPosition(ship);
  const cell = document.elementFromPoint(shipPos.left + 20, shipPos.top + 20);
  toggleShipZIndex(ship);

  return getCoordsFromCellDiv(cell);
}

function getCoordsFromCellDiv(cell) {
  const xRegex = new RegExp("x-([0-9])");
  const yRegex = new RegExp("y-([0-9])");
  const classString = cell.classList.value;

  const x = classString.match(xRegex)[1];
  const y = classString.match(yRegex)[1];
  return [+y, +x];
}
