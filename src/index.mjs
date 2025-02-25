import "./styles.css";

// Initialize the game board
function createBoard(boardSize) {
  board.innerHTML = ""; // Clear the board
  gameState = new Array(boardSize).fill(""); // Reset game state
  gameActive = true;
  currentPlayer = "X";
  turnDisplay.textContent = "Current Player : " + currentPlayer;

  //   // Set up a grid layout for the board (dynamic)
  //   board.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;

  for (let i = 0; i < boardSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i; // Assign index to each cell
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

// Check for a win
function checkWin() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => gameState[index] === currentPlayer);
  });
}

// handle click
// Steps:
// 1. Before updating the cell check if cell is empty or game is still on
// 2. Update the cell
// 3. Check for the winner
// 4. Check for Draw
// 5. change the currentPlayer to next
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (gameState[index] !== "" || !gameActive) {
    return; // Ignore click if the cell is already taken or the game is over
  }

  gameState[index] = currentPlayer; // Update game state
  cell.textContent = currentPlayer; // Display player's mark
  cell.classList.add("taken");

  if (checkWin()) {
    gameActive = false;
    turnDisplay.textContent = currentPlayer + " has Won the game!!";
    return;
  }

  // All cells are filled but no winner
  if (gameState.every((cell) => cell !== "")) {
    turnDisplay.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  turnDisplay.textContent = "Current Player : " + currentPlayer;
}

const board = document.getElementById("board");
const turnDisplay = document.getElementById("turn");
const resetButton = document.getElementById("reset-button");

let currentPlayer = "X"; // Tracks the current player
let gameActive = true; // Tracks if the game is active
let gameState = new Array(9).fill(""); // Tracks the board state

// Winning combinations
const winningCombinations = [
  //rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //diagonals
  [0, 4, 8],
  [2, 4, 6],
];

// // Generate winning combinations
// function getWinningCombinations(boardSize) {
//   const combinations = [];

//   // Rows
//   for (let i = 0; i < boardSize; i++) {
//     const row = [];
//     for (let j = 0; j < boardSize; j++) {
//       row.push(i * boardSize + j);
//     }
//     combinations.push(row);
//   }

//   // Columns
//   for (let i = 0; i < boardSize; i++) {
//     const col = [];
//     for (let j = 0; j < boardSize; j++) {
//       col.push(i + j * boardSize);
//     }
//     combinations.push(col);
//   }

//   // Diagonal (top-left to bottom-right)
//   const diag1 = [];
//   for (let i = 0; i < boardSize; i++) {
//     diag1.push(i * boardSize + i);
//   }
//   combinations.push(diag1);

//   // Diagonal (top-right to bottom-left)
//   const diag2 = [];
//   for (let i = 0; i < boardSize; i++) {
//     diag2.push((i + 1) * boardSize - (i + 1));
//   }
//   combinations.push(diag2);

//   return combinations;
// }
// const dynamicCombinations = getWinningCombinations(4);
// console.log(dynamicCombinations);

// Initialize the game
createBoard(9);

// Reset game
// here immediately createBoard is called on click
// so wrap it in arrow function
resetButton.addEventListener("click", () => createBoard(9));
