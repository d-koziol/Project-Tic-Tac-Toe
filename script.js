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

  const winner = document.querySelector(".winnerInfo");
  const playerTurn = document.querySelector(".playerTurn");

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
    document.querySelectorAll("input[type=text]").innerHTML = "";
    gameBoard.createBoard();
    winner.textContent = "Who's gonna win ??";
    playerTurn.textContent = "";
    gameOver = false;
  };

  const handleClick = (e) => {
    if (gameOver) {
      return;
    }
    const index = parseInt(e.target.id.split("-")[1]);
    if (gameBoard.getGameboard()[index] !== "") return;
    gameBoard.update(index, players[currentPlayer].mark);

    if (winCheck(gameBoard.getGameboard(), players[currentPlayer].mark)) {
      gameOver = true;
      winner.textContent = `${players[currentPlayer].name} won!`;
    } else if (tieCheck(gameBoard.getGameboard())) {
      gameOver = true;
      winner.textContent = `It's a tie!`;
    }

    playerTurn.textContent = `${players[currentPlayer].name}'s turn.`;

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
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winsCombo.length; i += 1) {
      const [a, b, c] = winsCombo[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  }

  function tieCheck(board) {
    return board.every((field) => field !== "");
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
