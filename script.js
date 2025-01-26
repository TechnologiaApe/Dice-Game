'use strict';

// selecting elements
const scoreEls = [
  document.querySelector('#score--0'),
  document.getElementById('score--1'),
];
const currentScoreEls = [
  document.getElementById('current--0'),
  document.getElementById('current--1'),
];
const players = [
  document.querySelector('.player--0'),
  document.querySelector('.player--1'),
];
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// functions
const resetScores = () => {
  currentPlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  diceEl.classList.add('hidden');
  firstRoll = true;
  btnHold.disabled = false;
  btnRoll.disabled = false;
  scoreEls.forEach(ech => (ech.textContent = 0));
  currentScoreEls.forEach(ech => (ech.textContent = 0));
  players.forEach(ech =>
    ech.classList.remove('player--active', 'player--winner')
  );
  players[0].classList.add('player--active');
};

const switchPlayer = () => {
  currentScoreEls[currentPlayer].textContent = 0;
  currentScore = 0;
  firstRoll = true;
  players[currentPlayer].classList.toggle('player--active');
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  players[currentPlayer].classList.toggle('player--active');
};

let firstRoll = true; // Tracks whether it's the first roll of the current player's turn

const rollDice = () => {
  let dice;
  do {
    dice = Math.trunc(Math.random() * 6) + 1; // Roll the dice
  } while (dice === 1 && firstRoll); // Re-roll if it's the first try and dice is 1
  firstRoll = false; // After the first try, allow 1
  return dice;
};

let scores, currentScore, currentPlayer;
resetScores();
diceEl.classList.add('hidden');

btnRoll.addEventListener('click', function () {
  const numberRolled = rollDice(); // Get a dice roll that isn’t 1 at first try
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${numberRolled}.png`;

  if (numberRolled !== 1) {
    currentScore += numberRolled;
    currentScoreEls[currentPlayer].textContent = currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (Number(currentScoreEls[currentPlayer].textContent) === 0) {
    return;
  }
  scores[currentPlayer] += currentScore;
  scoreEls[currentPlayer].textContent = scores[currentPlayer];
  currentScoreEls[currentPlayer].textContent = 0;
  currentScore = 0;

  if (scores[currentPlayer] >= 100) {
    players[currentPlayer].classList.add('player--winner');
    diceEl.classList.add('hidden');
    btnHold.disabled = true;
    btnRoll.disabled = true;
    setTimeout(() => {
      alert(`Player ${currentPlayer + 1} won! 🎉🥳`);
    }, 800); // 800 milliseconds = 0.8 seconds
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', resetScores);
