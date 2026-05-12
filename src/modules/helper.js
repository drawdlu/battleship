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
