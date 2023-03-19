/* eslint-disable quotes */

const gameBoard = (() => {
  const gameBoardArr = ["", "", "", "", "", "", "", "", ""];

  const createBoard = () => {
    let boardElements = "";
    gameBoardArr.forEach((field, index) => {
      boardElements += `<div class="markField" id="field-${index}">${field}</div>`;
    });
    document.querySelector(".gameboard").innerHTML = boardElements;
    const fields = document.querySelectorAll(".markField");
    fields.forEach((field) => {
      field.addEventListener("click", Game.handleClick);
    });
  };

  const update = (index, value) => {
    gameBoardArr[index] = value;
    createBoard();
  };

  const getGameboard = () => gameBoardArr;

  return {
    createBoard,
    update,
    getGameboard,
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
    const fields = document.querySelectorAll(".markField");
    fields.forEach((field) => {
      field.addEventListener("click", handleClick);
    });
  };

  const gameRestart = () => {
    for (let i = 0; i < 9; i += 1) {
      gameBoard.update(i, "");
    }
    gameBoard.createBoard();
  };

  const handleClick = (e) => {
    const index = parseInt(e.target.id.split("-")[1]);
    if (gameBoard.getGameboard()[index] !== "") return;
    gameBoard.update(index, players[currentPlayer].mark);
    currentPlayer = currentPlayer === 0 ? 1 : 0;
  };

  return {
    gameStart,
    gameRestart,
    handleClick,
  };

  function winCheck(board) {
    const winsCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 9],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 9],
      [0, 4, 9],
      [2, 4, 6],
    ];
  }
})();

const restartButton = document.querySelector("#gameReset");
restartButton.addEventListener("click", () => {
  Game.gameRestart();
});
const startButton = document.querySelector("#gameStart");
startButton.addEventListener("click", () => {
  Game.gameStart();
});
