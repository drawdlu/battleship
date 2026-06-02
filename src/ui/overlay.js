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

  const names = getPlayerNames(data);
  registerTwoPlayerGame(data);
  recordShowHitsOptionToGame(data.get("show-hits"));

  game.setupGame(names.playerOne, names.playerTwo);
}

function recordShowHitsOptionToGame(showHits) {
  if (showHits) {
    game.changeDontShowHits(false);
  } else {
    game.changeDontShowHits(true);
  }
}

function registerTwoPlayerGame(data) {
  const hasTwoPlayers = gameHasHumanOpponent(data);

  game.setTwoPlayers(hasTwoPlayers);
}

function getPlayerNames(data) {
  const playerOne = getNameValue(data.get("player-1-name"), 1);
  let playerTwo = null;

  if (gameHasHumanOpponent(data)) {
    playerTwo = getNameValue(data.get("player-2-name"), 2);
  }

  return { playerOne: playerOne, playerTwo: playerTwo };
}

function gameHasHumanOpponent(data) {
  return data.get("opponent") === "player";
}

function getNameValue(name, number) {
  return name ? name : `Player ${number}`;
}

function closeGameOptionsDialog() {
  const gameOptionsDialog = document.querySelector("dialog#start-options");

  gameOptionsDialog.close();
}
