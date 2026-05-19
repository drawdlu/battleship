let newX = 0,
  newY = 0,
  startX = 0,
  startY = 0,
  originalX = 0,
  originalY = 0;

let currentShip = null,
  closestElement = null;

export function listenToShip() {
  const ships = document.querySelectorAll(".ship");

  ships.forEach((ship) => {
    const rotate = ship.querySelector(".rotate");
    ship.addEventListener("mousedown", dragShip);
    rotate.addEventListener("click", rotateShip);
  });
}

function rotateShip(e) {
  const ship = e.currentTarget.closest(".ship");
  const size = getShipSize(ship);
  const rotateClass = "vertical-" + size;
  const vertical = !divClassContains(ship, "vertical");

  if (checkIfMoveValid(ship, ship, vertical)) {
    ship.classList.toggle(rotateClass);
  }
}

function dragShip(e) {
  if (divClassContains(e.target, "rotate")) {
    return;
  }

  e.preventDefault();
  recordShipValues(e.currentTarget);
  startX = e.clientX;
  startY = e.clientY;

  document.addEventListener("mousemove", moveShip);
  document.addEventListener("mouseup", snapShipOnBoard);
}

function toggleDraggingFromRotate() {
  const rotateDivs = document.querySelectorAll(".rotate");

  rotateDivs.forEach((rotate) => {
    rotate.classList.toggle("dragging");
  });
}

function toggleDraggingFromPage() {
  const body = document.querySelector("html");

  body.classList.toggle("dragging");
}

function recordShipValues(ship) {
  currentShip = ship;
  originalY = ship.offsetTop;
  originalX = ship.offsetLeft;
  toggleDragging();
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
  const vertical = divClassContains(currentShip, "vertical");

  if (cell && checkIfMoveValid(cell, currentShip, vertical)) {
    moveShipToCellPosition(cell);
  } else {
    moveBackToOriginalPosition();
  }
  toggleDragging();
}

function toggleDragging() {
  currentShip.classList.toggle("dragging");
  toggleDraggingFromRotate();
  toggleDraggingFromPage();
}

function checkIfMoveValid(cell, ship, vertical) {
  const size = getShipSize(ship);
  let currentDiv = cell;
  const add = getDimensionsToAdd(ship, vertical);

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
function getDimensionsToAdd(ship, vertical) {
  const cellSize = 50;
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

function getShipSize(ship) {
  if (divClassContains(ship, "two")) {
    return 2;
  } else if (divClassContains(ship, "three")) {
    return 3;
  } else if (divClassContains(ship, "four")) {
    return 4;
  } else if (divClassContains(ship, "five")) {
    return 5;
  }
}

function divClassContains(div, string) {
  const classListString = div.classList.value;
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
