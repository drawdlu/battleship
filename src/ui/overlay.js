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
