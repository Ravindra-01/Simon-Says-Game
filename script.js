let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highestLevel = 0;
let gameoverDiv = document.querySelector(".gameover");
let hsScore = document.querySelector("#higestScore");
let yourScorePara = document.querySelector("#yourScore");
let lvlPara = document.querySelector("h3");
let boxColor = ["red", "yellow", "blue", "green"];
function flashBox() {
  let randomIdx = Math.floor(Math.random() * 3);
  let randomBox = boxColor[randomIdx];
  gameSeq.push(randomBox);
  let box = document.querySelector(`.${randomBox}`);
  box.classList.add("flashWhite");
  setTimeout(function () {
    box.classList.remove("flashWhite");
  }, 300);
  // console.log("gameSeq", gameSeq);
  // console.log("userSeq", userSeq);
  // console.log("level", level);
  lvlPara.innerText = `level ${level + 1}`;
}

function userFlash(box) {
  console.log("user clicked", box.classList[1]);
  userSeq.push(box.classList[1]);
  box.classList.add("flashGreen");
  setTimeout(function () {
    box.classList.remove("flashGreen");
  }, 250);
  answer();
}

//userInput
let boxes = document.querySelectorAll(".box");
for (const box of boxes) {
  box.addEventListener("click", () => userFlash(box));
}

//Answer
function answer() {
  let userIdx = userSeq.length - 1;
  if (userSeq[userIdx] === gameSeq[userIdx]) {
    console.log("correct");
    if (userSeq.length === gameSeq.length) {
      level++;
      lvlPara.innerText = `level ${level + 1}`;
      flashBox();
      userSeq = [];
    }
  } else {
    highestLevel = Math.max(highestLevel, level);
    hsScore.innerText = `Highest-Score: ${highestLevel}`;

    console.log("wrong");
    lvlPara.innerHTML = "<h2>Game Over!</h2>";
    document.body.classList.add("flashRed");
    setTimeout(function () {
      document.body.classList.remove("flashRed");
    }, 250);

    gameoverDiv.style.display = "flex";
    hsScore.innerText = `Highest-Score: ${highestLevel}`;
    yourScorePara.innerText = `Your-Score: ${level}`;

    stbtn.classList.remove("stbtn-hide");
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;

    return;
  }
}
let stbtn = document.querySelector("#startbtn");
stbtn.addEventListener("click", function () {
  lvlPara.innerText = `level ${level + 1}`;
  if (!started) {
    started = true;
  }
  stbtn.classList.add("stbtn-hide");
  flashBox();
});
let replay=document.querySelector("#replaybtn");
replay.addEventListener("click",function(){
  gameoverDiv.style.display="none";
  lvlPara.innerText = "Press 'START' to start the game"
})