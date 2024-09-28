const submit = document.getElementById('submit');
const reset = document.getElementById('reset');
const invalidInputMsg = document.getElementById('invalid-input-msg');
const alertMsg = document.getElementById('alert-msg');

// Add event listeners for submit and reset buttons
submit.addEventListener('click', answer);
reset.addEventListener('click', resetGrid);

function answer() {
    var A = new Array(81).fill(0);
    
    for (let i = 0; i < 81; i++) {
        const inputValue = Number(document.getElementsByTagName('input')[i].value);
        
        if (!isNaN(inputValue) && (inputValue === 0 || (inputValue >= 1 && inputValue <= 9))) {
            A[i] = inputValue;
        } else {
            invalidInputMsg.style.display = 'block';
            return;
        }
    }
    invalidInputMsg.style.display = 'none';

    // Giving output a different color
    for (let i = 0; i < 81; i++) {
        if (A[i] === 0) {
            document.getElementsByTagName('input')[i].style.color = 'rgb(89, 89, 231)';
        }
    }

    // Convert 1D array into 2D array
    let board = [];
    while (A.length) {
        board.push(A.splice(0, 9));
    }

    let inputValid = checkInput(board);
    
    if (inputValid) {
        if (solveSudoku(board, 9)) {
            printBoard(board);
        } else {
            alert('No Solution');
        }
    }
}

function checkInput(board) {
    if (isZero(board)) {
        alertMsg.style.display = 'block';
        return false;
    }
    alertMsg.style.display = 'none';
    return true;
}

function isZero(board) {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            sum += board[i][j];
        }
    }
    return sum === 0;
}

function solveSudoku(board, n) {
    let row = -1;
    let col = -1;
    let isEmpty = true;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 0) {
                row = i;
                col = j;
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty) break;
    }

    if (isEmpty) return true;

    for (let num = 1; num <= n; num++) {
        if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board, n)) return true;
            board[row][col] = 0;
        }
    }
    return false;
}

function isSafe(board, row, col, value) {
    for (let j = 0; j < board.length; j++) {
        if (board[row][j] === value || board[j][col] === value) return false;
    }

    let sqrt = Math.floor(Math.sqrt(board.length));
    let boxRowStart = row - row % sqrt;
    let boxColStart = col - col % sqrt;

    for (let i = boxRowStart; i < boxRowStart + sqrt; i++) {
        for (let j = boxColStart; j < boxColStart + sqrt; j++) {
            if (board[i][j] === value) return false;
        }
    }
    return true;
}

function printBoard(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            document.getElementsByTagName('input')[i * 9 + j].value = board[i][j];
        }
    }
}

function resetGrid() {
    for (let i = 0; i < 81; i++) {
        document.getElementsByTagName('input')[i].value = '';
        document.getElementsByTagName('input')[i].style.color = 'black';
    }
    invalidInputMsg.style.display = 'none';
    alertMsg.style.display = 'none';
}
