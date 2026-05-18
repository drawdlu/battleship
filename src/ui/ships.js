let newX = 0,
  newY = 0,
  startX = 0,
  startY = 0,
  originalX = 0,
  originalY = 0;

let currentShip = null,
  closestElement = null;

export function listenToShipDrag() {
  const ships = document.querySelectorAll(".ship");

  ships.forEach((ship) => {
    ship.addEventListener("mousedown", dragShip);
  });
}

function dragShip(e, ship) {
  e.preventDefault();
  recordShipValues(e.currentTarget);
  startX = e.clientX;
  startY = e.clientY;

  document.addEventListener("mousemove", moveShip);
  document.addEventListener("mouseup", snapShipOnBoard);
}

function recordShipValues(ship) {
  currentShip = ship;
  currentShip.classList.add("dragging");
  originalY = ship.offsetTop;
  originalX = ship.offsetLeft;
}

function moveShip(e) {
  newX = startX - e.clientX;
  newY = startY - e.clientY;

  startX = e.clientX;
  startY = e.clientY;

  const newShipY = currentShip.offsetTop - newY;
  const newShipX = currentShip.offsetLeft - newX;

  currentShip.style.top = newShipY + "px";
  currentShip.style.left = newShipX + "px";
  updateClosestElement(newShipY, newShipX);
}

// 20 is just a little less than half the cell size
// Makes placing the ships more intuitive than snapping it to the closest
// cell on the top left corner of the ship position on "mouseup"
function updateClosestElement(newShipY, newShipX) {
  const boardDiv = document.querySelector(".player.board");
  const position = getShipPositionFromWindow(newShipY, newShipX);
  closestElement = document.elementFromPoint(position.x + 20, position.y + 20);
}

function getShipPositionFromWindow(newShipY, newShipX) {
  const board = document.querySelector(".player.board");
  const y = board.offsetTop + newShipY - window.scrollY;
  const x = board.offsetLeft + newShipX - window.scrollX;

  return { y: y, x: x };
}

function snapShipOnBoard(e) {
  document.removeEventListener("mousemove", moveShip);
  document.removeEventListener("mouseup", snapShipOnBoard);

  const cell = returnClosestPlayerCell(closestElement);

  if (cell && checkIfMoveValid()) {
    moveShipToCellPosition(cell);
  } else {
    moveBackToOriginalPosition();
  }
  currentShip.classList.remove("dragging");
}

function checkIfMoveValid(cell) {
  const size = getShipSize();
  let currentDiv = closestElement;
  const add = getDimensionsToAdd();

  for (let i = 1; i < size; ++i) {
    const divPos = getElementPosition(currentDiv);
    const nextCell = document.elementFromPoint(
      divPos.left + add.left,
      divPos.top + add.top,
    );

    if (!isAPlayerCell(nextCell)) {
      return false;
    }
    currentDiv = nextCell;
  }

  return true;
}

// 20 here has same function as updateClosestElement only this time making sure
// we are pointing close to the middle of the cell to capture wether it is
// a ship or a cell if within board
function getDimensionsToAdd() {
  const cellSize = 50;
  const vertical = shipClassContains("vertical");
  const left = vertical ? 20 : cellSize + 20;
  const top = vertical ? cellSize + 20 : 20;

  return { left: left, top: top };
}

function getElementPosition(div) {
  return div.getBoundingClientRect();
}

function isAPlayerCell(div) {
  const playerBoard = document.querySelector(".player.board");

  return playerBoard.contains(div) && div.classList.contains("cell");
}

function getShipSize() {
  if (shipClassContains("two")) {
    return 2;
  } else if (shipClassContains("three")) {
    return 3;
  } else if (shipClassContains("four")) {
    return 4;
  } else if (shipClassContains("five")) {
    return 5;
  }
}

function shipClassContains(string) {
  const classListString = currentShip.classList.value;
  const regexp = new RegExp(`${string}`);

  return regexp.test(classListString);
}

function returnClosestPlayerCell(div) {
  // prevents errors when element is dragged past the window
  if (!div) {
    return null;
  }

  return div.closest(".player .cell");
}

function checkOverflowAndCollision(closestElement) {}

function moveShipToCellPosition(cell) {
  const y = cell.offsetTop;
  const x = cell.offsetLeft;

  currentShip.style.top = y + 2 + "px";
  currentShip.style.left = x + 2 + "px";
}

function moveBackToOriginalPosition() {
  currentShip.style.top = originalY + "px";
  currentShip.style.left = originalX + "px";
}
