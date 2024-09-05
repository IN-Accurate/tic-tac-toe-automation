const { Given } = require('@wdio/cucumber-framework');
const { $ } = require('@wdio/globals');

const symbols = ['X', 'O'];

const tiles = ['00', '01', '02', '10', '11', '20', '21', '22'];

const editPlayerButton = (symbol) =>
  `//button[@data-hook="editButton-${symbol}"]`;

const playerNameInput = (symbol) => `//input[@data-hook="player-${symbol}"]`;

const savePlayerButton = (symbol) =>
  `//button[@data-hook="saveButton-${symbol}"]`;

const tileButton = (tile) => `//button[@data-hook="tile-${tile}"]`;

const gameOverScreen = '//div[@id="game-over"]';
const winnerText = '//p[@data-hook="winner"]';
const drawText = '//p[@data-hook="draw"]';

async function clickRandomTile() {
  const randomIndex = Math.floor(Math.random() * tiles.length);
  const tileToClick = tiles[randomIndex];
  await $(tileButton(tileToClick)).click();
  tiles.splice(randomIndex, 1);
}

Given(/^I am on the homepage$/, async () => {
  await browser.url('http://localhost:5173/');
  await browser.maximizeWindow();

  await browser.pause(1000);
  await $(editPlayerButton(symbols[0])).click();
  await browser.pause(600);
  await $(playerNameInput(symbols[0])).setValue('Vishal');
  await browser.pause(600);
  await $(savePlayerButton(symbols[0])).click();
  await browser.pause(600);

  await $(editPlayerButton(symbols[1])).click();
  await browser.pause(600);
  await $(playerNameInput(symbols[1])).setValue('Sankar');
  await browser.pause(600);
  await $(savePlayerButton(symbols[1])).click();
  await browser.pause(600);

  for (let i = 0; i < 9; i++) {
    if ((await $(gameOverScreen).isDisplayed()) || tiles.length === 0) break;
    await clickRandomTile();
    await browser.pause(800);
  }

  if ((await $(winnerText)).isDisplayed())
    console.log('Match Result : ' + (await $(winnerText).getText()));
  else console.log('Match Result : ' + (await $(drawText).getText()));

  await browser.pause(1000);
});
