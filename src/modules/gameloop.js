import createPlayer from "../factories/player";
import createComputerPlayer from "../factories/computer";
import createGameBoard from "../factories/gameboard";
import createShip from "../factories/ship";
import { defaultCoords } from "./helper";
import { renderPlayerBoard } from "../ui/board";

export default function createGame() {
  const player1 = createPlayer("Default Player");
  const player2 = createComputerPlayer();
  let currentPlayer = player1;
  let opponentPlayer = player2;

  const renderBoards = (player, opponent) => {
    renderPlayerBoard(player, true);
    renderPlayerBoard(opponent, false);
  };

  const setupShips = (player1, player2) => {
    setupPlayerShips(player1);
    setupPlayerShips(player2);
  };

  const setupPlayerShips = (player) => {
    defaultCoords.forEach((val) => {
      const ship = createShip(val.length);

      val.coords.forEach((coord) => {
        player.board.placeShip(ship, coord);
      });
    });
  };

  const setupBoard = () => {
    setupShips(player1, player2);
    renderBoards(currentPlayer, opponentPlayer);
  };

  setupBoard();
}
