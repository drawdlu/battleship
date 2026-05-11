import { createGameBoard } from "../src/factories/gameboard";
import { createShip } from "../src/factories/ship";

const coords = [
  [0, 0],
  [0, 2],
];

test("Places ship on correct coordinates and receiveAttack returns true", () => {
  const ship = createShip(1);
  const board = createGameBoard();
  board.placeShip(ship, coords[0]);

  expect(board.receiveAttack(coords[0])).toBeTruthy();
  expect(ship.isSunk()).toBeTruthy();
});

test("receiveAttack returns false on a miss", () => {
  const ship = createShip(1);
  const board = createGameBoard();
  board.placeShip(ship, coords[0]);

  expect(board.receiveAttack(coords[1])).toBeFalsy();
});

test("receiveAttack throws an error on a duplicate attack", () => {
  const ship = createShip(1);
  const board = createGameBoard();
  board.placeShip(ship, coords[0]);

  board.receiveAttack(coords[0]);
  expect(() => {
    board.receiveAttack(coords[0]);
  }).toThrow("Cell already attacked");
});

test("Checks if all ships are sunk", () => {
  const ship1 = createShip(1);
  const ship2 = createShip(1);

  const board = createGameBoard();
  board.placeShip(ship1, coords[0]);
  board.placeShip(ship2, coords[1]);

  board.receiveAttack(coords[0]);
  expect(board.allShipsSunk()).toBeFalsy();
  board.receiveAttack(coords[1]);
  expect(board.allShipsSunk()).toBeTruthy();
});
