import createGameBoard from "./gameboard";
import { notWithinRange } from "../modules/helper";

export default function createComputerPlayer() {
  const gameBoard = createGameBoard();
  const attacksArr = Array.from({ length: 10 }, (_, x) =>
    Array.from({ length: 10 }, (_, y) => [x, y]),
  ).flat();
  let lastAttackCoords, hitOriginCoords, directionFound, attackDirection;
  let attackCoordsQueue = [];
  let shipHit = false;
  let lastAttackHit = false;
  let directionAlreadyFlipped = false;

  const getAttackCoords = () => {
    let attackCoords;

    if (shipHit && directionFound) {
      attackCoords = getAttackWithAxisFound();
    } else if (shipHit) {
      attackCoords = getAttackWhenNoAxisFound();
    } else if (lastAttackHit) {
      handleLastAttackHit();
      attackCoords = getRandomAttackCoords(attackCoordsQueue);
    } else {
      attackCoords = getRandomAttackCoords(attacksArr);
    }

    lastAttackCoords = attackCoords;
    resetLastAttackHit();
    removeAttackFromArrays(attackCoords);
    return attackCoords;
  };

  const removeAttackFromArrays = (coord) => {
    removeCoordFromArr(coord, attacksArr);
    removeCoordFromArr(coord, attackCoordsQueue);
  };

  const getAttackWithAxisFound = () => {
    if (!lastAttackHit && directionAlreadyFlipped) {
      resetAllValues();
      return getRandomAttackCoords(attacksArr);
    } else if (!lastAttackHit) {
      reverseDirection();
    }

    return findNextAttack();
  };

  const attackQueueExists = () => {
    return attackCoordsQueue.length > 0;
  };

  const getAttackWhenNoAxisFound = () => {
    if (lastAttackHit) {
      directionFound = true;
      attackDirection = getAttackDirection(hitOriginCoords, lastAttackCoords);
      return findNextAttack();
    } else {
      return getRandomAttackCoords(attackCoordsQueue);
    }
  };

  const findNextAttack = () => {
    const nextCoords = getNextAttack(lastAttackCoords);

    return nextCoords;
  };

  const getNextAttack = (currentCoords) => {
    let validNextCoord = findValidCoordFromArr(currentCoords);

    if (!validNextCoord && directionAlreadyFlipped) {
      resetAllValues();
      return getRandomAttackCoords(attacksArr);
    } else if (!validNextCoord) {
      reverseDirection();
      validNextCoord = findValidCoordFromArr(currentCoords);
    }

    if (!validNextCoord) {
      resetAllValues();
      return getRandomAttackCoords(attacksArr);
    }

    return validNextCoord;
  };

  const resetAllValues = () => {
    shipHit = false;
    hitOriginCoords = null;
    directionFound = false;
    attackDirection = null;
    attackCoordsQueue = [];
    directionAlreadyFlipped = false;
  };

  const findValidCoordFromArr = (currentCoords) => {
    let coords = addToCoords(attackDirection, currentCoords);

    while (!notWithinRange(coords)) {
      if (getCoordIndex(coords, attacksArr)) {
        return coords;
      }

      coords = addToCoords(attackDirection, coords);
    }

    return null;
  };

  const reverseDirection = () => {
    directionAlreadyFlipped = true;

    attackDirection = [-attackDirection[0], -attackDirection[1]];
  };

  const getAttackDirection = (originCoords, attackCoords) => {
    if (originCoords[0] === attackCoords[0]) {
      return [0, 1];
    } else {
      return [1, 0];
    }
  };

  const resetLastAttackHit = () => {
    lastAttackHit = false;
  };

  const handleLastAttackHit = () => {
    shipHit = true;
    recordAttackHitOrigin();
    pushAdjacentTilesToQueue();
  };

  const pushAdjacentTilesToQueue = () => {
    attackCoordsQueue = [];
    const addDirections = [
      [0, 1],
      [1, 0],
      [-1, 0],
      [0, -1],
    ];

    for (const addCoord of addDirections) {
      const newCoord = addToCoords(addCoord, hitOriginCoords);
      if (notWithinRange(newCoord) || !getCoordIndex(newCoord, attacksArr)) {
        continue;
      }

      attackCoordsQueue.push(newCoord);
    }
  };

  const addToCoords = (add, coords) => {
    return [+coords[0] + add[0], +coords[1] + add[1]];
  };

  const getRandomAttackCoords = (arr) => {
    const index = getRandomIndex(arr);
    const attackCoords = arr[index];

    return attackCoords;
  };

  const getRandomIndex = (arr) => {
    const lastIndex = arr.length;

    return Math.floor(Math.random() * lastIndex);
  };

  const removeCoordFromArr = (coords, arr) => {
    const index = getCoordIndex(coords, arr);
    if (index != null) {
      removeAttackFromArr(index, arr);
    }
  };

  const getCoordIndex = (coords, arr) => {
    for (let y = 0; y < arr.length; ++y) {
      if (coords[0] === arr[y][0] && coords[1] === arr[y][1]) {
        return y;
      }
    }

    return null;
  };

  const removeAttackFromArr = (index, arr) => {
    arr.splice(index, 1);
  };

  const attackHit = () => {
    lastAttackHit = true;
  };

  const recordAttackHitOrigin = () => {
    hitOriginCoords = lastAttackCoords;
  };

  return {
    board: gameBoard,
    getAttackCoords,
    attackHit,
  };
}
