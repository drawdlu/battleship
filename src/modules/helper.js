export const defaultCoords = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
  ],

  [
    [5, 2],
    [5, 3],
    [5, 4],
  ],

  [
    [3, 3],
    [3, 2],
    [3, 1],
  ],

  [
    [9, 7],
    [8, 7],
  ],
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

export function getAddDirection(isVertical) {
  const addY = isVertical ? 1 : 0;
  const addX = isVertical ? 0 : 1;

  return { x: addX, y: addY };
}

export function notWithinRange(coords) {
  return !withinZeroToTen(coords[0]) || !withinZeroToTen(coords[1]);
}

function withinZeroToTen(num) {
  return num < 10 && num >= 0;
}
