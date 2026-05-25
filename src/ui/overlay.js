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
  listenToContinue();
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

function listenToContinue() {
  const form = document.querySelector("dialog#start-options form");

  form.addEventListener("submit", handleGameStart);
}

function handleGameStart(e) {
  e.preventDefault();
  closeGameOptionsDialog();

  const data = new FormData(e.currentTarget);

  if (data.get("opponent") === "computer") {
    game.setupGame(data.get("player-1-name"));
  } else {
    game.setupGame(data.get("player-1-name"), data.get("player-2-name"));
  }
}

function closeGameOptionsDialog() {
  const gameOptionsDialog = document.querySelector("dialog#start-options");

  gameOptionsDialog.close();
}
