const red = document.getElementById("red");
const blue = document.getElementById("blue");
const green = document.getElementById("green");
const yellow = document.getElementById("yellow");
const level = document.getElementById("level");

const colors = [red, blue, green, yellow];
let sequence = [];
let userSequence = [];
let currentLevel = 0;
function startGame() {
    sequence = [];
    userSequence = [];
    currentLevel = 0;
    nextLevel();
}
function nextLevel() {
    currentLevel++;
    level.textContent = `Szint: ${currentLevel}`;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
    showSequence();
}
function showSequence() {
    let index = 0;
    const interval = setInterval(() => {
        if (index >= sequence.length) {
            clearInterval(interval);
            enableUserInput();
            return;
        }
        const color = sequence[index];
        color.classList.add("active");
        setTimeout(() => {
            color.classList.remove("active");
        }, 500);
        index++;
    }, 1000);
}
function enableUserInput() {
    colors.forEach(color => {
        color.addEventListener("click", handleUserInput);
    });
}
function handleUserInput(event) {
    const clickedColor = event.target;
    userSequence.push(clickedColor);
    clickedColor.classList.add("active");
    setTimeout(() => {
        clickedColor.classList.remove("active");
    }, 300);
    if (userSequence.length === sequence.length) {
        if (userSequence.every((color, index) => color === sequence[index])) {
            userSequence = [];
            setTimeout(nextLevel, 1000);
        } else {
            alert("Játék vége! Próbáld újra.");
            startGame();
        }
    }
}
startGame();
