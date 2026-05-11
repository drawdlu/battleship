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
    ships.push(ship);
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

  return {
    placeShip,
    receiveAttack,
    allShipsSunk,
  };
}
