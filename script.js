const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreText = document.getElementById("score");
const jumpSound = document.getElementById("jumpSound");
const hitSound = document.getElementById("hitSound");
const bgMusic = document.getElementById("bgMusic");

let score = 0;
let isAlive = true;

// ✅ Start background music after first click
window.addEventListener("click", () => {
  bgMusic.play();
}, { once: true });

// ✅ Jump on SPACE
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    jump();
  }
});

// ✅ Jump function (Bonus: Stop run while jumping)
function jump() {
  if (!dino.classList.contains("jump")) {

    dino.classList.add("jump");
    dino.classList.add("jumpStopRun"); // ✅ stop running animation
    jumpSound.currentTime = 0;
    jumpSound.play();

    setTimeout(() => {
      dino.classList.remove("jump");
      dino.classList.remove("jumpStopRun"); // ✅ resume running animation
    }, 500);

  }
}

// ✅ cactus movement + collision + score
let cactusMove = setInterval(() => {

  let cactusRight = parseInt(
    window.getComputedStyle(cactus).getPropertyValue("right")
  );

  cactus.style.right = cactusRight + 5 + "px";

  // ✅ if cactus goes out, reset + add score
  if (cactusRight > 860) {
    cactus.style.right = "-60px";
    score++;
    scoreText.innerText = "Score: " + score;
  }

  // ✅ collision check
  let dinoBottom = parseInt(
    window.getComputedStyle(dino).getPropertyValue("bottom")
  );

  if (cactusRight > 680 && cactusRight < 740 && dinoBottom < 50) {
    gameOver();
  }

}, 20);

// ✅ Game Over
function gameOver() {
  if (isAlive) {
    isAlive = false;

    hitSound.currentTime = 0;
    hitSound.play();
    bgMusic.pause();

    clearInterval(cactusMove);
    alert("Game Over! Final Score: " + score);

    location.reload();
  }
                             }
