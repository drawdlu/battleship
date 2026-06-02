export default function createGameBoard() {
  const cells = Array.from(Array(10), () =>
    Array.from(Array(10), () => ({
      ship: null,
      attacked: false,
    })),
  );

  const ships = [];

  const placeShip = (ship, coords) => {
    cells[coords[0]][coords[1]].ship = ship;

    addShipToList(ship);
  };

  const allShipsSunk = () => {
    return ships.every((ship) => ship.isSunk());
  };

  const addShipToList = (ship) => {
    if (ships.indexOf(ship) === -1) {
      ships.push(ship);
    }
  };

  const receiveAttack = (coords) => {
    const cell = cells[coords[0]][coords[1]];
    if (cell.attacked) {
      throw new Error("Cell already attacked");
    }

    cell.attacked = true;
    if (cell.ship !== null) {
      cell.ship.hit();
      return true;
    }

    return false;
  };

  const copyBoard = () => {
    return cells.map((x) => x.map((cell) => ({ ...cell })));
  };

  const getShipInfo = (coords) => {
    const ship = cells[coords[0]][coords[1]].ship;
    const length = ship.length;
    const hits = ship.hits;
    const sunk = ship.isSunk();
    const first = isFirstThreeShip(ship);

    return { length: length, hits: hits, sunk: sunk, first: first };
  };

  const isFirstThreeShip = (ship) => {
    return ship === ships[1];
  };

  return {
    placeShip,
    receiveAttack,
    allShipsSunk,
    get cells() {
      return copyBoard();
    },
    getShipInfo,
  };
}
