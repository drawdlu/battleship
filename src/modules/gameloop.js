import createPlayer from "../factories/player";
import createComputerPlayer from "../factories/computer";
import createGameBoard from "../factories/gameboard";
import createShip from "../factories/ship";
import { defaultCoords } from "./helper";
import { renderPlayerBoard } from "../ui/board";
import { transmitAttack } from "../ui/attack";
import { announceWinner } from "../ui/overlay";
import { listenToShip } from "../ui/ships";
import { listenToRandomize, randomizeShips } from "../ui/randmoize";
import { listenToReady } from "../ui/ready";
import { renderOptions } from "../ui/overlay";
import { switchActivePlayerOnBoard } from "../ui/two-player";

export default function createGame() {
  let player1, player2, currentPlayer, opponentPlayer, twoPlayerGame;
  let currentPlayerSettingUp = 1;

  const renderBoards = (player, opponent) => {
    renderPlayerBoard(player, true);
    renderPlayerBoard(opponent, false);
  };

  const setupPlayerShips = (coords, playerNumber) => {
    const player = playerNumber == 1 ? player1 : player2;
    coords.forEach((shipCoords) => {
      const ship = createShip(shipCoords.length);

      shipCoords.forEach((coord) => {
        player.board.placeShip(ship, coord);
      });
    });
  };

  const setupBoard = () => {
    renderBoards(currentPlayer, opponentPlayer);
    randomizeShips();
    listenToShip();
    listenToRandomize();
    listenToReady();
  };

  const attackMissed = () => {
    changePlayers();
    switchActivePlayerOnBoard();

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

  const setupGame = (nameA, nameB) => {
    createPlayers(nameA, nameB);
    setupBoard();
  };

  const createPlayers = (player1Name, player2Name) => {
    if (player2Name) {
      player2 = createPlayer(player2Name);
    } else {
      player2 = createComputerPlayer();
    }

    player1 = createPlayer(player1Name);
    currentPlayer = player1;
    opponentPlayer = player2;
  };

  const setTwoPlayers = (boolenValue) => {
    twoPlayerGame = boolenValue;
  };

  const setCurrentPlayerSettingUp = (number) => {
    currentPlayerSettingUp = number;
  };

  renderOptions();

  return {
    get opponentPlayer() {
      return opponentPlayer;
    },
    get currentPlayer() {
      return currentPlayer;
    },
    get twoPlayerGame() {
      return twoPlayerGame;
    },
    get currentPlayerSettingUp() {
      return currentPlayerSettingUp;
    },
    attackMissed,
    attackHits,
    setupPlayerShips,
    setupGame,
    setTwoPlayers,
    setCurrentPlayerSettingUp,
  };
}
