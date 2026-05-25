import { game } from "..";

export function announceWinner(player) {
  const name = player.name;
  if (player.name) {
    openWinDialog(name);
  } else {
    openWinDialog("Computer");
  }
}

function openWinDialog(name) {
  const dialog = document.querySelector("dialog#win");
  const nameSpan = dialog.querySelector("span.name");

  nameSpan.textContent = name;
  dialog.showModal();
}

export function renderOptions() {
  const dialog = document.querySelector("dialog#start-options");
  dialog.showModal();
  listenToGameTypeChange();
  updateInputs();
}

function updateInputs() {
  const playerRadioInput = document.querySelector(
    "dialog#start-options input#player",
  );
  const computerRadioInput = document.querySelector(
    "dialog#start-options input#computer",
  );

  if (playerRadioInput.checked) {
    toggleOpponentInputs("player");
  } else {
    toggleOpponentInputs("computer");
  }
}

function listenToGameTypeChange() {
  const gameTypeField = document.querySelector(
    "dialog#start-options fieldset.game-type",
  );

  gameTypeField.addEventListener("change", toggleOpponentNameInputsOnChange);
}

function toggleOpponentNameInputsOnChange(e) {
  const opponent = e.target.value;

  toggleOpponentInputs(opponent);
}

function toggleOpponentInputs(opponent) {
  if (opponent == "computer") {
    hidePlayer2Input();
  } else {
    showPlayer2Input();
  }
}

function getPlayer2InputDiv() {
  return document.querySelector(".game-start-options form input#player-2-name")
    .parentElement;
}

function hidePlayer2Input() {
  const inputDiv = getPlayer2InputDiv();

  inputDiv.classList.add("hide");
}

function showPlayer2Input() {
  const inputDiv = getPlayer2InputDiv();

  inputDiv.classList.remove("hide");
}
