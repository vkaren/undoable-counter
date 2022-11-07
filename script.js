let counter = 0;
let history = [0];
const historyBox = document.getElementById("box-history");
const counterText = document.getElementById("counter");

Object.values(document.getElementsByClassName("dec")).forEach((button) =>
  button.addEventListener("click", onCounterChange)
);
Object.values(document.getElementsByClassName("inc")).forEach((button) =>
  button.addEventListener("click", onCounterChange)
);

document.getElementById("undo").addEventListener("click", handleUndo);
document.getElementById("redo").addEventListener("click", handleRedo);

function onCounterChange(event) {
  const currentButton = event.currentTarget;

  if (clickUndo > 1) {
    console.log(history);
    history.splice(history.length - (clickUndo - 1), clickUndo - 1);
    console.log(history);
  }

  if (currentButton.className === "inc") {
    counter += currentButton.innerText.slice(1) - "";
  } else {
    counter -= currentButton.innerText.slice(1) - "";
  }

  clickUndo = 1;
  history.push(counter);

  counterText.innerText = counter;
  let historyText = document.createElement("p");

  historyText.innerText = `${currentButton.innerText} (${
    history[history.length - 2]
  } -> ${history[history.length - 1]})`;

  historyBox.appendChild(historyText);
}

let undoTexts = [];
let clickUndo = 1;
function handleUndo() {
  if (history.length - clickUndo === 0) {
    return false;
  }
  clickUndo++;
  counter = history[history.length - clickUndo];
  counterText.innerText = counter;

  undoTexts.push(historyBox.lastChild.innerText);
  historyBox.lastChild.remove();
}

function handleRedo() {
  if (clickUndo === 1) {
    return false;
  }
  clickUndo--;
  counter = history[history.length - clickUndo];
  counterText.innerText = counter;

  let historyText = document.createElement("p");
  historyText.innerText = undoTexts[undoTexts.length - 1];
  historyBox.appendChild(historyText);

  undoTexts.pop();
}
