import { createDivWithClass } from "../modules/helper";
import { attackInitiated } from "./attack";
import { game } from "../index";

function createCell(x, y, ownBoard) {
  const cell = createDivWithClass("cell", `x-${x}`, `y-${y}`);

  if (!ownBoard) {
    addClickableDivToCell(cell);
  }

  return cell;
}

function addClickableDivToCell(cell) {
  const clickable = createDivWithClass("clickable");
  cell.append(clickable);
}

function addShipToCell(x, y, cell, board) {
  if (board[y][x].ship) {
    cell.classList.add("ship");
  }
}

function getBoardDiv(ownBoard) {
  const divClass = ownBoard ? ".player.board" : ".opponent.board";

  return document.querySelector(divClass);
}

function renderName(player, ownBoard) {
  const divClass = getPlayerNameDivClass(ownBoard);
  const div = document.querySelector(divClass);
  const name = getPlayerName(player);

  div.textContent = name;
}

function getPlayerNameDivClass(ownBoard) {
  return ownBoard ? ".player-name" : ".opponent-name";
}

function getPlayerName(player) {
  return player.name ? player.name : "Computer";
}

function addAttackListener(board, ownBoard) {
  if (!ownBoard) {
    board.addEventListener("click", attackInitiated);
  }
}

export function renderPlayerBoard(player, ownBoard) {
  const board = player.board.cells;
  const div = getBoardDiv(ownBoard);

  for (let y = 0; y < 10; ++y) {
    for (let x = 0; x < 10; ++x) {
      const cell = createCell(x, y, ownBoard);
      if (ownBoard) {
        addShipToCell(x, y, cell, board);
      }
      div.append(cell);
    }
  }

  addAttackListener(div, ownBoard);
  renderName(player, ownBoard);
}

export function renderAttack(target) {
  const cell = getCell(target);
  cell.append(createXDiv());
}

function getCell(target) {
  return target.closest(".cell");
}

function createXDiv() {
  const div = createDivWithClass("hit");
  div.textContent = "X";

  return div;
}
