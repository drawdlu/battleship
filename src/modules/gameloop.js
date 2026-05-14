import createPlayer from "../factories/player";
import createComputerPlayer from "../factories/computer";
import createGameBoard from "../factories/gameboard";
import createShip from "../factories/ship";
import { defaultCoords } from "./helper";
import { renderPlayerBoard } from "../ui/board";
import { transmitAttack } from "../ui/attack";
import { announceWinner } from "../ui/overlay";

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

  const attackMissed = () => {
    changePlayers();

    if (computerTurn()) {
      computerAttack();
    }
  };

  const attackHits = () => {
    if (playerWon()) {
      announceWinner(currentPlayer);
      // stop game
    } else if (computerTurn()) {
      computerAttack();
    }
  };

  const playerWon = () => {
    return opponentPlayer.board.allShipsSunk();
  };

  const changePlayers = () => {
    const temp = currentPlayer;
    currentPlayer = opponentPlayer;
    opponentPlayer = temp;
  };

  const computerTurn = () => {
    return !currentPlayer.name;
  };

  const computerAttack = () => {
    const coords = currentPlayer.getAttackCoords();
    const target = document.querySelector(
      `.player .cell.x-${coords[1]}.y-${coords[0]}`,
    );
    transmitAttack(coords, target);
  };

  setupBoard();

  return {
    get opponentPlayer() {
      return opponentPlayer;
    },
    attackMissed,
    attackHits,
    computerTurn,
  };
}
