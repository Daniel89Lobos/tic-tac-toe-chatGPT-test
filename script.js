const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cells = Array.from(document.querySelectorAll('.cell'));
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

function handleCellClick(event) {
  const index = Number(event.currentTarget.dataset.cell);

  if (!gameActive || board[index] !== '') {
    return;
  }

  board[index] = currentPlayer;
  event.currentTarget.textContent = currentPlayer;
  event.currentTarget.setAttribute('aria-label', `Row ${Math.floor(index / 3) + 1} Column ${(index % 3) + 1} ${currentPlayer}`);

  if (isWinner(currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    disableBoard();
    return;
  }

  if (board.every((cell) => cell !== '')) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function isWinner(player) {
  return winningLines.some((line) => line.every((index) => board[index] === player));
}

function disableBoard() {
  cells.forEach((cell) => {
    cell.disabled = true;
  });
}

function enableBoard() {
  cells.forEach((cell) => {
    cell.disabled = false;
  });
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = "Player X's turn";

  cells.forEach((cell, index) => {
    cell.textContent = '';
    cell.disabled = false;
    cell.setAttribute('aria-label', `Row ${Math.floor(index / 3) + 1} Column ${(index % 3) + 1}`);
  });

  enableBoard();
}

cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
