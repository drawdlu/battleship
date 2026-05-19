export const defaultCoords = [
  {
    length: 5,
    coords: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ],
  },
  {
    length: 4,
    coords: [
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
    ],
  },
  {
    length: 3,
    coords: [
      [5, 2],
      [5, 3],
      [5, 4],
    ],
  },
  {
    length: 3,
    coords: [
      [3, 3],
      [3, 2],
      [3, 1],
    ],
  },
  {
    length: 2,
    coords: [
      [9, 7],
      [8, 7],
    ],
  },
];

export function createDivWithClass(...className) {
  const div = document.createElement("div");
  className.forEach((value) => {
    div.classList.add(value);
  });
  return div;
}

export function getElementPosition(div) {
  return div.getBoundingClientRect();
}

export function getShipSize(ship) {
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

export function divClassContains(div, string) {
  const classListString = div.classList.value;
  const regexp = new RegExp(`${string}`);

  return regexp.test(classListString);
}

export function getAddDirection(ship) {
  const vertical = divClassContains(ship, "vertical");
  const addY = vertical ? 1 : 0;
  const addX = vertical ? 0 : 1;

  return { x: addX, y: addY };
}
