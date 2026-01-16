const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreText = document.getElementById("score");
const jumpSound = document.getElementById("jumpSound");
const hitSound = document.getElementById("hitSound");
const bgMusic = document.getElementById("bgMusic");
let score = 0;
let isAlive = true;
window.addEventListener("click", () => {
 bgMusic.play();
}, { once: true });
document.addEventListener("keydown", function (event) {
 if (event.code === "Space") {
 jump();
 }
});
function jump() {
 if (!dino.classList.contains("jump")) {
 dino.classList.add("jump");
 jumpSound.play();
 setTimeout(() => {
 dino.classList.remove("jump");
 }, 500);
 }
}
let cactusMove = setInterval(() => {
 let cactusLeft = parseInt(
 window.getComputedStyle(cactus).getPropertyValue("right")
 );
 cactus.style.right = cactusLeft + 5 + "px";
 if (cactusLeft > 860) {
 cactus.style.right = "-60px";
 score++;
 scoreText.innerText = "Score: " + score;
 }
 let dinoBottom = parseInt(
 window.getComputedStyle(dino).getPropertyValue("bottom")
 );
 if (cactusLeft > 680 && cactusLeft < 740 && dinoBottom < 50) {
 gameOver();
 }
}, 20);
function gameOver() {
 if (isAlive) {
 isAlive = false;
 hitSound.play();
 bgMusic.pause();
 clearInterval(cactusMove);
 alert("Game Over! Final Score: " + score);
 location.reload();
}
}
