import { createShip } from "../src/factories/ship.js";

const shipLength = 1;
const newShip = createShip(shipLength);

test("Contains ship length", () => {
  expect(newShip).toHaveProperty("length", shipLength);
});

test("Sunk function returns false at start", () => {
  expect(newShip.isSunk()).toBeFalsy();
});

test("Calling hit shipLength (1) times will result in a sunk ship", () => {
  const shipLength = 1;
  const newShip = createShip(shipLength);
  newShip.hit();
  expect(newShip.isSunk()).toBeTruthy();
});

test("Calling hit shipLength (2) times will result in a sunk ship", () => {
  const shipLength = 2;
  const newShip = createShip(shipLength);
  newShip.hit();
  expect(newShip.isSunk()).toBeFalsy();

  newShip.hit();
  expect(newShip.isSunk()).toBeTruthy();
});
