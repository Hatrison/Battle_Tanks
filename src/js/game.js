// Init

function init() {
  gameZone.innerHTML += `<div class="player" style="left: ${player.x}px; top: ${player.y}px;"></div>`;
  player.element = document.querySelector('.player');
};

// Random

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

// Intervals

function intervals() {
  interval.run = setInterval(() => {
    if (player.run) {
      switch (player.direction) {
        case 'top':
          if (player.y > 0) {
            player.y -= player.step;
            player.element.style.top = `${player.y}px`;
          };
          break;
        case 'right':
          if (player.x < gameZone.getBoundingClientRect().right - player.width - 6) {
            player.x += player.step;
            player.element.style.left = `${player.x}px`;
          };
          break;
        case 'bottom':
          if (player.y < gameZone.getBoundingClientRect().bottom - player.height - 7) {
           player.y += player.step;
           player.element.style.top = `${player.y}px`; 
          };
          break;
        case 'left':
          if (player.x > 0) {
            player.x -= player.step;
            player.element.style.left = `${player.x}px`;
          };
          break;
      };
    };
  }, fps);
  interval.bullet = setInterval(() => {
    let bullets = document.querySelectorAll('.bullet');
    bullets.forEach((bullet) => {
      let direction = bullet.getAttribute('direction');
      switch (direction) {
        case 'up':
          if (bullet.getBoundingClientRect().top < 0) {
            bullet.parentNode.removeChild(bullet);
          } else {
            bullet.style.top = bullet.getBoundingClientRect().top - bulletModel.speed + 'px';
          };
          break;
        case 'right':
          if (bullet.getBoundingClientRect().right > gameZone.getBoundingClientRect().width) {
            bullet.parentNode.removeChild(bullet);
          } else {
            bullet.style.left = bullet.getBoundingClientRect().left + bulletModel.speed + 'px';
          };
          break;
        case 'down':
          if (bullet.getBoundingClientRect().top > gameZone.getBoundingClientRect().height) {
            bullet.parentNode.removeChild(bullet);
          } else {
            bullet.style.top = bullet.getBoundingClientRect().top + bulletModel.speed + 'px';
          };
          break;
        case 'left':
          if (bullet.getBoundingClientRect().left < 0) {
            bullet.parentNode.removeChild(bullet);
          } else {
            bullet.style.left = bullet.getBoundingClientRect().left - bulletModel.speed + 'px';
          };
          break;
      };
    });
  }, fps);
  interval.enemy = setInterval(() => {
    let enemies = document.querySelectorAll('.enemy');
    enemies.forEach((enemy) => {

      let bullets = document.querySelectorAll('.bullet');
      bullets.forEach((bullet) => {
        if (
          bullet.getBoundingClientRect().top < enemy.getBoundingClientRect().bottom &&
          bullet.getBoundingClientRect().left < enemy.getBoundingClientRect().right &&
          bullet.getBoundingClientRect().right > enemy.getBoundingClientRect().left &&
          bullet.getBoundingClientRect().bottom > enemy.getBoundingClientRect().top
        ) {
          enemy.parentNode.removeChild(enemy);
          bullet.parentNode.removeChild(bullet);
        };
      });

      let direction = enemy.getAttribute('direction');
      switch (direction) {
        case 'top':
          if (enemy.getBoundingClientRect().top <= 0) {
            enemy.parentNode.removeChild(enemy);
          } else {
            enemy.style.top = enemy.getBoundingClientRect().top - enemyModel.speed + 'px';
          };
          break;
        case 'right':
          if (enemy.getBoundingClientRect().right >= gameZone.getBoundingClientRect().width - 6) {
            enemy.parentNode.removeChild(enemy);
          } else {
            enemy.style.left = enemy.getBoundingClientRect().left + enemyModel.speed + 'px';
          };
          break;
        case 'bottom':
          if (enemy.getBoundingClientRect().bottom >= gameZone.getBoundingClientRect().height - 6) {
            enemy.parentNode.removeChild(enemy);
          } else {
            enemy.style.top = enemy.getBoundingClientRect().top + enemyModel.speed + 'px';
          };
          break;
        case 'left':
          if (enemy.getBoundingClientRect().right <= enemyModel.width) {
            enemy.parentNode.removeChild(enemy);
          } else {
            enemy.style.left = enemy.getBoundingClientRect().left - enemyModel.speed + 'px';
          };
          break;
      };
    });
  }, fps);
  interval.generateEnemy = setInterval(() => {
    let direction = random(1, 4);
    switch (direction) {
      case 1: // top
        gameZone.innerHTML += `<div class="enemy" style="transform: rotate(-90deg); top: ${gameZone.getBoundingClientRect().height - player.height}px; left: ${random(0, (gameZone.getBoundingClientRect().width - enemyModel.width))}px;" direction="top"></div>`;
        break;
      case 2: // right
        gameZone.innerHTML += `<div class="enemy" style="top: ${random(0, (gameZone.getBoundingClientRect().height - enemyModel.height))}px; left: 0px;" direction="right"></div>`;
        break;
      case 3:  // bottom
        gameZone.innerHTML += `<div class="enemy" style="transform: rotate(90deg); top: 0px; left: ${random(0, (gameZone.getBoundingClientRect().width - enemyModel.width))}px;" direction="bottom"></div>`;
        break;
      case 4: // left
        gameZone.innerHTML += `<div class="enemy" style="transform: rotate(180deg); top: ${random(0, (gameZone.getBoundingClientRect().height - enemyModel.height))}px; left: ${gameZone.getBoundingClientRect().width - enemyModel.width}px;" direction="left"></div>`;
        break;
    };

    player.element = document.querySelector('.player');
  }, 1000);
};

// Controllers

function controllers() {
  document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
      case 87: //top
        player.element.style.backgroundImage = `url(${player.styles.top})`;
        player.run = true;
        player.direction ='top';
        break;
      case 68: //right
        player.element.style.backgroundImage = `url(${player.styles.right})`;
        player.run = true;
        player.direction = 'right';
        break;
      case 83: //bottom
        player.element.style.backgroundImage = `url(${player.styles.bottom})`;
        player.run = true;
        player.direction = 'bottom';
        break;
      case 65: //left
        player.element.style.backgroundImage = `url(${player.styles.left})`;
        player.run = true;
        player.direction = 'left';
        break;
      case 32: //shot
        shot();
        break;
    };
  });

  document.addEventListener('keyup', (event) => {
    switch (event.keyCode) {
      case 87: //top
        player.run = false;
        break;
      case 68: //right
        player.run = false;
        break;      
      case 83: //bottom
        player.run = false;
        break;
      case 65: //left
        player.run = false;
        break;
    };
  });
};

// Shot

function shot() {
  switch (player.direction) {
    case 'top':
      gameZone.innerHTML += `<div class="bullet" direction="up" style="left: ${player.x + player.width/2 - bulletModel.width/2}px; top: ${player.y - bulletModel.height}px"></div>`;
      break;
    case 'right':
      gameZone.innerHTML += `<div class="bullet" direction="right" style="left: ${player.x + player.width}px; top: ${player.y + player.height/2 - bulletModel.height/2}px"></div>`;
      break;
    case 'bottom':
      gameZone.innerHTML += `<div class="bullet" direction="down" style="left: ${player.x + player.width/2 - bulletModel.width/2}px; top: ${player.y + player.width}px"></div>`;
      break;
    case 'left':
      gameZone.innerHTML += `<div class="bullet" direction="left" style="left: ${player.x - bulletModel.width}px; top: ${player.y + player.height/2 - bulletModel.height/2}px"></div>`;
      break;
  }
  player.element = document.querySelector('.player');
};

// Start game

function game() {
  init();
  controllers();
  intervals();
};

let gameZone = document.querySelector('.game-zone'),
  fps = 1000 / 60,
  player = {
    styles: {
      top: 'images/tank-my-top.png',
      right: 'images/tank-my-right.png',
      bottom: 'images/tank-my-bottom.png',
      left: 'images/tank-my-left.png',
    },
    element: undefined,
    x: 700,
    y: 300,
    step: 10,
    run: false,
    direction: top, // top, rihgt, bottom, left
    width: 80,
    height: 80,
  },
  interval = {
    run: undefined,
    bullet: undefined,
    enemy: undefined,
    generateEnemy: undefined,
  },
  bulletModel = {
   speed: 10,
   width: 12,
   height: 12,
  },
  enemyModel = {
    speed: 3,
    width: 80,
    height: 80,
  };

  game();
