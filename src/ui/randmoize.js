import {
  getElementPosition,
  getShipSize,
  divClassContains,
  getAddDirection,
} from "../modules/helper";

import { moveShipToCellPosition } from "./ships";

const shipCoords = new Set();

export function listenToRandomize() {
  const randomBtn = document.querySelector("button.randomize");

  randomBtn.addEventListener("click", randomizeShips);
}

export function randomizeShips() {
  toggleShipRandom();
  const ships = getSortedShipDivs();
  const shipCoords = getSortedRandomShipCoords();

  for (let i = 0; i < ships.length; ++i) {
    const ship = ships[i];
    const coords = shipCoords[i];
    placeShipOnCoord(ship, coords[0], isCoordsVertical(coords));
    ship.classList.remove("border-animation");
  }
  toggleShipRandom();
}

function placeShipOnCoord(ship, firstCoord, isVertical) {
  addOrRemoveRandomVertical(ship, isVertical);
  const size = getShipSize(ship);
  moveShip(firstCoord, ship);
}

function isCoordsVertical(coords) {
  if (coords[0][0] == coords[1][0]) {
    return false;
  } else {
    return true;
  }
}

function getSortedShipDivs() {
  const ships = document.querySelectorAll(".ship");
  const shipArr = [];
  const shipClasses = [
    ".two",
    ".three.first",
    ".three.second",
    ".four",
    ".five",
  ];

  for (let i = 0; i < shipClasses.length; ++i) {
    shipArr.push(document.querySelector(`.ship${shipClasses[i]}`));
  }

  return shipArr;
}

export function getSortedRandomShipCoords() {
  const shipCoords = [];
  const shipSizes = [2, 3, 3, 4, 5];
  const shipCount = shipSizes.length;

  for (let i = 0; i < shipCount; ++i) {
    let shipPlaced = false;
    while (!shipPlaced) {
      const coords = getCoordsThatWillFit(shipCoords, shipSizes[i]);
      if (coords) {
        shipCoords.push(coords);
        shipPlaced = true;
      }
    }
  }

  return convertToArrayAndSort(shipCoords);
}

function convertToArrayAndSort(coordsSet) {
  return [...coordsSet].sort((a, b) => a.length - b.length);
}

function getCoordsThatWillFit(shipCoords, shipSize) {
  const coords = [];
  let currentCoords = getRandomCoords();
  const isVertical = randomVertical();
  const add = getAddDirection(isVertical);

  for (let i = 0; i < shipSize; ++i) {
    if (
      notWithinRange(currentCoords) ||
      shipsHasCoords(shipCoords, currentCoords)
    ) {
      return null;
    }

    coords.push(currentCoords);
    currentCoords = [currentCoords[0] + add.y, currentCoords[1] + add.x];
  }

  return coords;
}

function shipsHasCoords(shipCoords, newCoords) {
  const match = shipCoords.some((coords) => {
    return coords.some((row) => {
      return JSON.stringify(row) == JSON.stringify(newCoords);
    });
  });

  if (match) {
    return true;
  }
  return false;
}

function moveShip(coords, ship) {
  const cell = document.querySelector(`.cell.x-${coords[1]}.y-${coords[0]}`);

  moveShipToCellPosition(ship, cell);
}

function addCoordsToSet(coords, isVertical, shipSize) {
  const add = getAddDirection(isVertical);

  for (let i = 0; i < shipSize; ++i) {
    shipCoords.add(stringifyData(coords));

    coords.x += add.x;
    coords.y += add.y;
  }
}

function shipWillFit(coords, isVertical, shipSize) {
  const coordsCopy = structuredClone(coords);
  const add = getAddDirection(isVertical);

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
  return !withinZeroToTen(coords[0]) || !withinZeroToTen(coords[1]);
}

function withinZeroToTen(num) {
  return num < 10 && num >= 0;
}

function addOrRemoveRandomVertical(ship, isVertical) {
  if (isVertical) {
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
  return [randomCoord(), randomCoord()];
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
