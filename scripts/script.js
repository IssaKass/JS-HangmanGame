const gameModal = document.querySelector(".game-modal");
const gameModalImg = document.querySelector(".game-modal__image");
const gameModalTitle = document.querySelector(".game-modal__title");
const gameModalMessage = document.querySelector(".game-modal__message");
const playAgainButton = document.getElementById("playAgainButton");
const hangmanImage = document.getElementById("hangmanImage");
const wordToGuess = document.getElementById("wordToGuess");
const hintContent = document.getElementById("hintContent");
const incorrectGuesses = document.getElementById("incorrectGuesses");
const keyboard = document.getElementById("keyboard");

let currentWord = "";
let wrongGuessCount = 0;
let correctLetters = [];
const maxGuesses = 5;

function startGame() {
  reset();
  hideModal();
  createKeyboard();

  hangmanImage.src = "images/hangman-0.svg";
  const { word, hint } = getRandom(wordlist);
  currentWord = word;

  wordToGuess.innerHTML = word
    .split("")
    .map(() => `<li class = "word-to-guess__letter"></li>`)
    .join("");
  hintContent.textContent = hint;
}

function reset() {
  wrongGuessCount = 0;
  correctLetters = [];

  gameModal.classList.add("game-modal--hidden");
  incorrectGuesses.textContent = `${wrongGuessCount} / ${maxGuesses}`;
}

function hideModal() {
  gameModal.classList.remove("show");
}

function createKeyboard() {
  keyboard.innerHTML = "";
  for (let i = 97; i < 123; i++) {
    const button = document.createElement("button");
    button.classList.add("key");
    button.textContent = String.fromCharCode(i);
    button.addEventListener("click", (e) => {
      initGame(e.target, String.fromCharCode(i));
    });
    keyboard.appendChild(button);
  }
}

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function initGame(button, clickedLetter) {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordToGuess.querySelectorAll("li")[index].innerText = letter;
      }
    });
  } else {
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  incorrectGuesses.textContent = `${wrongGuessCount} / ${maxGuesses}`;

  if (wrongGuessCount === maxGuesses) {
    return gameOver(false);
  }
  if (correctLetters.length === currentWord.length) {
    return gameOver(true);
  }
}

const gameOver = (isVictory) => {
  setTimeout(() => {
    gameModal.classList.remove("game-modal--hidden");
    gameModalImg.src = `images/${isVictory ? "victory" : "lost"}.gif`;
    gameModalTitle.textContent = isVictory ? "Congrats!" : "Game Over!";
    gameModalMessage.innerHTML = `${
      isVictory ? "You found the word" : "The correct word was"
    }: <b>${currentWord}</b>`;
  }, 500);
};

playAgainButton.addEventListener("click", () => {
  startGame();
});

startGame();
