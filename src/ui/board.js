import { createDivWithClass } from "../modules/helper";

export function renderPlayerBoard(player, ownBoard) {
  const board = player.board.cells;
  const div = getBoardDiv(ownBoard);

  for (let x = 0; x < 10; ++x) {
    for (let y = 0; y < 10; ++y) {
      const cell = createDivWithClass("cell", `x-${x}`, `y-${y}`);
      if (ownBoard) {
        addShipToCell(x, y, cell, board);
      }
      div.append(cell);
    }
  }
}

function addShipToCell(x, y, cell, board) {
  if (board[x][y].ship) {
    cell.classList.add("ship");
  }
}

function getBoardDiv(ownBoard) {
  const divClass = ownBoard ? ".player.board" : ".opponent.board";

  return document.querySelector(divClass);
}
