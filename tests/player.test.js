import createPlayer from "../src/factories/player";
import createGameBoard from "../src/factories/gameboard";

const name = "Ruth";
const player = createPlayer(name);

test("Creates a player with name", () => {
  expect(player.name).toBe(name);
});

test("A board objects exists within a player object", () => {
  expect(player.board).toBeDefined();
});
