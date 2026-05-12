import createComputerPlayer from "../src/factories/computer";

const computer = createComputerPlayer();

test("Creates a board", () => {
  expect(computer.board).toBeDefined();
});

test("Computer never repeats play coordinates", () => {
  const possibleBoardMoves = 100;
  const plays = new Set();

  for (let i = 0; i < possibleBoardMoves; ++i) {
    const coords = computer.getAttackCoords();
    expect(plays.has(coords)).toBeFalsy();
    plays.add(coords);
  }
});
