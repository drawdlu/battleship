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

function updateClosestElement(newShipY, newShipX) {
  const boardDiv = document.querySelector(".player.board");
  const position = getShipPositionFromWindow(newShipY, newShipX);
  closestElement = document.elementFromPoint(position.x, position.y);
}

// 20 is just a little less than half the cell size
// Makes placing the ships more intuitive than snapping it to the closest
// cell on the top left corner of the ship position on "mouseup"
function getShipPositionFromWindow(newShipY, newShipX) {
  const board = document.querySelector(".player.board");
  const y = board.offsetTop + newShipY;
  const x = board.offsetLeft + newShipX;

  return { y: y + 20, x: x + 20 };
}

function snapShipOnBoard(e) {
  currentShip.classList.remove("dragging");
  document.removeEventListener("mousemove", moveShip);
  document.removeEventListener("mouseup", snapShipOnBoard);

  // prevents errors when element is dragged past the window
  const cell = closestElement ? closestElement.closest(".player .cell") : null;

  if (cell) {
    moveShipToCellPosition(cell);
  } else {
    moveBackToOriginalPosition();
  }
}

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
