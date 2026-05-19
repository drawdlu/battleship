import {
  getElementPosition,
  getShipSize,
  divClassContains,
} from "../modules/helper";

import { moveShipToCellPosition } from "./ships";

const shipCoords = new Set();

export function listenToRandomize() {
  const randomBtn = document.querySelector("button.randomize");

  randomBtn.addEventListener("click", randomizeShips);
}

export function randomizeShips() {
  shipCoords.clear();
  toggleShipRandom();
  const ships = document.querySelectorAll(".ship");

  ships.forEach((ship) => {
    placeShipOnRandomSpot(ship);
    ship.classList.remove("border-animation");
  });
  toggleShipRandom();
}

function placeShipOnRandomSpot(ship) {
  addOrRemoveRandomVertical(ship);
  let shipPlaced = false;

  while (!shipPlaced) {
    let randomStartingCoords = getRandomCoords();
    if (shipWillFit(ship, randomStartingCoords)) {
      shipPlaced = true;
      moveShip(randomStartingCoords, ship);
      addCoordsToSet(randomStartingCoords, ship);
    }
  }
}

function moveShip(coords, ship) {
  const cell = document.querySelector(`.cell.x-${coords.x}.y-${coords.y}`);

  moveShipToCellPosition(ship, cell);
}

function addCoordsToSet(coords, ship) {
  const add = getAddDirection(ship);
  const shipSize = getShipSize(ship);

  for (let i = 0; i < shipSize; ++i) {
    shipCoords.add(stringifyData(coords));

    coords.x += add.x;
    coords.y += add.y;
  }
}

function getAddDirection(ship) {
  const vertical = divClassContains(ship, "vertical");
  const addY = vertical ? 1 : 0;
  const addX = vertical ? 0 : 1;

  return { x: addX, y: addY };
}

function shipWillFit(ship, coords) {
  const coordsCopy = structuredClone(coords);
  const add = getAddDirection(ship);
  const shipSize = getShipSize(ship);

  for (let i = 0; i < shipSize; ++i) {
    if (
      shipCoords.has(stringifyData(coordsCopy)) ||
      notWithinRange(coordsCopy)
    ) {
      return false;
    }

    coordsCopy.x += add.x;
    coordsCopy.y += add.y;
  }
  return true;
}

function notWithinRange(coords) {
  return !withinZeroToTen(coords.x) || !withinZeroToTen(coords.y);
}

function withinZeroToTen(num) {
  return num < 10 && num >= 0;
}

function addOrRemoveRandomVertical(ship) {
  const vertical = randomVertical();

  if (vertical) {
    addVertical(ship);
  } else {
    removeVertical(ship);
  }
}

function addVertical(ship) {
  const verticalClass = getVerticalClass(ship);

  ship.classList.add(verticalClass);
}

function removeVertical(ship) {
  const verticalClass = getVerticalClass(ship);

  ship.classList.remove(verticalClass);
}

function getVerticalClass(ship) {
  const size = getShipSize(ship);

  return `vertical-${size}`;
}

function toggleShipRandom() {
  const ships = document.querySelectorAll(".ship");

  ships.forEach((ship) => {
    ship.classList.toggle("randomize");
  });
}

function getRandomCoords() {
  return { y: randomCoord(), x: randomCoord() };
}

function randomCoord() {
  return Math.floor(Math.random() * 10);
}

function randomVertical() {
  return !!Math.round(Math.random());
}

function stringifyData(data) {
  return JSON.stringify(data);
}
