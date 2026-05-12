import createPlayer from "../factories/player";
import createComputerPlayer from "../factories/computer";
import createGameBoard from "../factories/gameboard";
import createShip from "../factories/ship";
import { defaultCoords } from "./helper";
import { renderPlayerBoard } from "../ui/board";

export default function startGame() {
  const player = createPlayer("Default");
  const computer = createComputerPlayer();
  const currentPlayer = player;
  const opponentPlayer = computer;

  setupShips(player, computer);

  renderBoards(currentPlayer, opponentPlayer);
}

function renderBoards(player, opponent) {
  renderPlayerBoard(player, true);
  renderPlayerBoard(opponent, false);
}

function setupShips(player1, player2) {
  setupPlayerShips(player1);
  setupPlayerShips(player2);
}

function setupPlayerShips(player) {
  defaultCoords.forEach((val) => {
    const ship = createShip(val.length);

    val.coords.forEach((coord) => {
      player.board.placeShip(ship, coord);
    });
  });
}
