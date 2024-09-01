'use strict';

const body = document.querySelector('body');
const againBtn = document.querySelector('.again');
const number = document.querySelector('.number');
const guess = document.querySelector('.guess');
const checkBtn = document.querySelector('.check');
const scoreCounter = document.querySelector('.score');
const highScoreCounter = document.querySelector('.highscore');

//! States variables
const initScore = 10;
let score = initScore;
let highScore = 0;

//! Generate random number function
const generateSecretNum = function () {
  return Math.trunc(Math.random() * 20) + 1;
};

//! End game function
const endGame = function () {
  guess.setAttribute('disabled', '');
  checkBtn.disabled = true;
};

//! Display message function
const displayMsg = function (message) {
  document.querySelector('.message').textContent = message;
};

//! Update score function
const updateScore = function () {
  score--;
  scoreCounter.textContent = score;
  if (score === 0) {
    displayMsg('💥 You lost the game :(');
    body.style.backgroundColor = '#ed3529';
    endGame();
  }
  highScore = 0;
};

// User starts the game
let secretNum = generateSecretNum();

// User click on check button
checkBtn.addEventListener('click', () => {
  const guessNum = Number(guess.value);
  if (!guessNum || guessNum < 0 || guessNum > 20) {
    displayMsg('❗ Add a valid number');
  } else if (guessNum === secretNum) {
    displayMsg('🥳 Correct number :)');
    number.textContent = secretNum;
    body.style.backgroundColor = '#60b347';
    number.style.width = '25rem';
    if (highScore < score) {
      highScore = score;
      highScoreCounter.textContent = highScore;
    }
    endGame();
  } else {
    updateScore();
    displayMsg(guessNum > secretNum ? '📈 Too high!' : '📉 Too low!');
  }
});

// User clicks on again button > Reset the game
againBtn.addEventListener('click', () => {
  secretNum = generateSecretNum();
  guess.removeAttribute('disabled');
  checkBtn.disabled = false;
  body.style.backgroundColor = '#222';
  number.textContent = '?';
  number.style.width = '15rem';
  displayMsg('Start guessing...');
  score = initScore;
  scoreCounter.textContent = score;
  guess.value = '';
});
