import { getBoardDiv } from "./board";

export function displayAttackInfo(shipInfo, isPlayerOne) {
  const containerDiv = getBoardDiv(isPlayerOne).parentElement;
  const length = convertShipLenghtToWord(shipInfo.length);
  let shipHitDiv;

  if (length === "three") {
    shipHitDiv = getShipLengthThreeDiv(containerDiv, shipInfo);
  } else {
    shipHitDiv = containerDiv.querySelector(`.ship-display.${length} .safe`);
  }
  removeSafeFromDiv(shipHitDiv);
  addHitToDiv(shipHitDiv);
}

function convertShipLenghtToWord(length) {
  switch (length) {
    case 2:
      return "two";
    case 3:
      return "three";
    case 4:
      return "four";
    default:
      return "five";
  }
}

function removeSafeFromDiv(div) {
  div.classList.remove("safe");
}

function addHitToDiv(div) {
  div.classList.add("hit");
}

function getShipLengthThreeDiv(container, shipInfo) {
  const divs = container.querySelectorAll(".ship-display.three");
  const divOne = divs[0];
  const divTwo = divs[1];
  const shipRemaining = shipInfo.length - shipInfo.hits + 1;

  console.log(`length: ${divOne.querySelectorAll(".safe").length}`);
  console.log(`remainingLength: ${shipRemaining}`);
  if (divOne.querySelectorAll(".safe").length == shipRemaining) {
    return divOne.querySelector(".safe");
  } else {
    return divTwo.querySelector(".safe");
  }
}
