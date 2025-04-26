let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msg = document.querySelector("#msg");
let modal = document.querySelector("#modal");
let confirmResetBtn = document.querySelector("#confirm-reset");
let cancelResetBtn = document.querySelector("#cancel-reset");

let player = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const showModal = () => {
  modal.classList.remove("hide");
};

const hideModal = () => {
  modal.classList.add("hide");
};

const resetGame = () => {
  showModal();
};

confirmResetBtn.addEventListener("click", () => {
  player = true;
  count = 0;
  clearBoxes();
  msg.innerText = "Play Your Move.";
  hideModal();
});

cancelResetBtn.addEventListener("click", () => {
  hideModal();
});

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (player) {
      box.innerText = "O";
      box.disabled = true;
      count++;
      let isWinner = checkWinner();
      if (!isWinner && count < 9) {
        msg.innerText = "Computer is playing its move...";
        player = false;
        disableBoxes();
        setTimeout(computerTurn, 1000);
      } else if (!isWinner && count === 9) {
        gameDraw();
      }else{
        return;
      }
    }
  });
});

const computerTurn = () => {
  let availableBoxes = Array.from(boxes).filter(box => box.innerText === "");
  const randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
  randomBox.innerText = "X";
  randomBox.disabled = true;
  count++;
  
  let isWinner = checkWinner();
  if (!isWinner && count < 9) {
    msg.innerText = "Your Turn!";
    player = true;
    enableBoxes();
  } else if (isWinner) {
    return;
  } else {
    gameDraw();
  }
};

const gameDraw = () => {
  msg.innerText = "Game was a Draw.";
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
  }
};
const clearBoxes = () => {
    for (let box of boxes) {
      box.disabled = false;
      box.innerText = "";
    }
  };

const showWinner = (val) => {
  let winner = val==="O"? "player":"computer";
  msg.innerText = `Congratulations, Winner is ${winner}`;
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false;
};

resetBtn.addEventListener("click", resetGame);
