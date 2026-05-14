import { game } from "../index";
import { renderAttack } from "./board";

export function attackInitiated(event) {
  const target = event.target;
  if (target.className === "clickable") {
    const coords = extractAttackCoords(target);
    transmitAttack(coords, target);
  }
}

function extractAttackCoords(target) {
  const divClass = target.closest(".cell").className;

  return [extractNum("y", divClass), extractNum("x", divClass)];
}

// Returns 2nd item in array result because we are capturing the digit
function extractNum(letter, string) {
  const regex = new RegExp(`${letter}-(\\d)`);
  return Number(regex.exec(string)[1]);
}

export function transmitAttack(coords, target) {
  try {
    const opponent = game.opponentPlayer;
    const shipPresent = opponent.board.receiveAttack(coords);
    renderAttack(target, shipPresent);

    if (shipPresent) {
      game.attackHits();
    } else {
      game.attackMissed();
    }
  } catch (err) {
    console.log(err + coords);
  }
}

function successfulAttack() {}
