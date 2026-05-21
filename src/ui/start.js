import { dragShip } from "./ships";
import {
  getShipSize,
  getElementPosition,
  getAddDirection,
  divClassContains,
} from "../modules/helper";
import { game } from "../index";
import { defaultCoords } from "../modules/helper";
import { addAttackListener, getBoardDiv } from "./board";

export function listenToStart() {
  const startBtn = document.querySelector("button.start");

  startBtn.addEventListener("click", handleStart);
}

function handleStart() {
  const ships = document.querySelectorAll(".ship");
  const shipCoords = [];

  ships.forEach((ship) => {
    ship.removeEventListener("mousedown", dragShip);
    ship.classList.remove("can-move");
    shipCoords.push(getShipCoords(ship));
  });

  removeStartRandomizeButtons();

  setupShips(shipCoords);
  addAttackListener(getBoardDiv(false));
}

function setupShips(coords) {
  game.setupPlayerShips(coords, 1);
  game.setupPlayerShips(defaultCoords, 2);
}

function toggleShipZIndex(ship) {
  ship.classList.toggle("index-change");
}

function removeStartRandomizeButtons() {
  const setupButtonsDiv = document.querySelector(".setup-buttons");

  setupButtonsDiv.classList.add("inactive");
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
