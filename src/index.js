import "./styles.css";
import createGame from "./modules/gameloop";

export let game = createGame();

export function createNewGame() {
  game = createGame();
}
