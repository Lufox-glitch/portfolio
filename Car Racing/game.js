// DOM Elements
const score = document.querySelector('.score');
const highScore = document.querySelector('.highScore');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const ClickToStart = document.querySelector('.ClickToStart');

// Event Listeners
ClickToStart.addEventListener('click', Start);
document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);

// Game Variables
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
};

let player = {
  speed: 5,
  score: 0,
  highScore: 0,
  isStart: false,
  x: 175,
  y: 520
};

// Key Handlers
function keydown(e) {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = true;
  }
}

function keyup(e) {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = false;
  }
}

// Color Generator
function getRandomCarColor() {
  const colors = [
    'red',    // #FF0000
    'blue',   // #0066FF
    'green',  // #00C000
    'purple', // #FF00FF
    'orange'  // #FFA500
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Start Game
function Start() {
  gameArea.innerHTML = '';
  startScreen.classList.add('hide');
  player.isStart = true;
  player.score = 0;
  player.speed = 5;

  // Create road lines
  for (let i = 0; i < 5; i++) {
    const roadLine = document.createElement('div');
    roadLine.classList.add('roadLines');
    roadLine.y = i * 140;
    roadLine.style.top = roadLine.y + 'px';
    gameArea.appendChild(roadLine);
  }

  // Create opponent cars (with random colors)
  for (let i = 0; i < 3; i++) {
    const opponent = document.createElement('div');
    opponent.classList.add('Opponents', getRandomCarColor());
    opponent.y = i * -300;
    opponent.style.top = opponent.y + 'px';
    opponent.style.left = Math.floor(Math.random() * 350) + 'px';
    gameArea.appendChild(opponent);
  }

  // Create player car
  const car = document.createElement('div');
  car.classList.add('car');
  car.style.left = player.x + 'px';
  car.style.top = player.y + 'px';
  gameArea.appendChild(car);

  window.requestAnimationFrame(Play);
}

// Game Loop
function Play() {
  if (!player.isStart) return;

  const car = document.querySelector('.car');
  const road = gameArea.getBoundingClientRect();

  // Move player
  if (keys.ArrowUp && player.y > road.top + 70) player.y -= player.speed;
  if (keys.ArrowDown && player.y < road.bottom - 75) player.y += player.speed;
  if (keys.ArrowRight && player.x < 350) player.x += player.speed;
  if (keys.ArrowLeft && player.x > 0) player.x -= player.speed;

  car.style.top = player.y + 'px';
  car.style.left = player.x + 'px';

  // Update score
  player.score++;
  score.textContent = "Score: " + player.score;
  
  if (player.score > player.highScore) {
    player.highScore = player.score;
    highScore.textContent = "High Score: " + player.highScore;
  }

  // Increase difficulty
  player.speed += 0.01;

  // Move elements
  moveLines();
  moveOpponents(car);

  window.requestAnimationFrame(Play);
}

// Move road lines
function moveLines() {
  const lines = document.querySelectorAll('.roadLines');
  lines.forEach(line => {
    if (line.y >= 700) line.y = -100;
    line.y += player.speed;
    line.style.top = line.y + 'px';
  });
}

// Move opponent cars
function moveOpponents(car) {
  const opponents = document.querySelectorAll('.Opponents');
  opponents.forEach(opponent => {
    if (isCollide(car, opponent)) {
      endGame();
    }
    if (opponent.y >= 750) {
      opponent.y = -300;
      opponent.style.left = Math.floor(Math.random() * 350) + 'px';
      // Change color when respawning
      opponent.className = 'Opponents ' + getRandomCarColor();
    }
    opponent.y += player.speed;
    opponent.style.top = opponent.y + 'px';
  });
}

// Collision detection
function isCollide(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
    );
}

// End game
function endGame() {
  player.isStart = false;
  startScreen.classList.remove('hide');
}
