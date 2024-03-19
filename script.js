const wordEl = document.querySelector('.word');
const letterBtnsEl = document.querySelector('.letterBtns');
const hpEl = document.querySelector('.hp');

const game = new Game({ letterBtnsEl, wordEl, hpEl });

game.start();
