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

// Init

function init() {
  gameZone.innerHTML += `<div class="player" style="left: ${player.x}px; top: ${player.y}px;"></div>`;
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
  };

  game();