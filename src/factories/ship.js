export default function createShip(size) {
  let length = size;
  let hits = 0;

  const isSunk = () => {
    return length === hits;
  };

  const hit = () => {
    hits += 1;
  };

  return {
    length: length,
    isSunk,
    hit,
  };
}
