/* eslint-disable quotes */

const gameBoard = (() => {
  const gameBoardArr = ["", "", "", "", "", "", "", "", ""];

  const createBoard = () => {
    let boardElements = "";
    gameBoardArr.forEach((field, index) => {
      boardElements += `<div class="markField" id="field-${index}">${field}</div>`;
    });
    document.querySelector(".gameboard").innerHTML = boardElements;
  };

  return {
    createBoard,
  };
})();

const createPlayer = (name, mark) => ({
  name,
  mark,
});

const Game = (() => {
  let players;
  let currentPlayer;
  let gameOver;

  const gameStart = () => {
    players = [
      createPlayer(document.querySelector("#playerName1").value, "X"),
      createPlayer(document.querySelector("#playerName2").value, "O"),
    ];
    currentPlayer = 0;
    gameOver = false;
    gameBoard.createBoard();
  };
  return {
    gameStart,
  };
})();

const startButton = document.querySelector("#gameStart");
startButton.addEventListener("click", () => {
  Game.gameStart();
});
