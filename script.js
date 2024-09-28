const submit = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const invalidInputMsg = document.getElementById('invalid-input-msg'); 

submit.addEventListener('click', answer);

function checkInput(board) {
    const N = board.length;

    // Check for row and column uniqueness
    for (let i = 0; i < N; i++) {
        const rowSet = new Set();
        const colSet = new Set();

        for (let j = 0; j < N; j++) {
            // Check rows
            if (board[i][j] !== 0) {
                if (rowSet.has(board[i][j])) return false; // Duplicate in row
                rowSet.add(board[i][j]);
            }

            // Check columns
            if (board[j][i] !== 0) {
                if (colSet.has(board[j][i])) return false; // Duplicate in column
                colSet.add(board[j][i]);
            }
        }
    }

    // Check for 3x3 subgrid uniqueness
    for (let row = 0; row < N; row += 3) {
        for (let col = 0; col < N; col += 3) {
            const boxSet = new Set();

            for (let r = row; r < row + 3; r++) {
                for (let c = col; c < col + 3; c++) {
                    if (board[r][c] !== 0) {
                        if (boxSet.has(board[r][c])) return false; // Duplicate in 3x3 box
                        boxSet.add(board[r][c]);
                    }
                }
            }
        }
    }

    return true; // All checks passed
}

function answer() {
    var A = new Array(81).fill(0); // Initialize the array with zeros
    let isInputValid = true; // Flag to check if input is valid

    for (let i = 0; i < 81; i++) {
        const inputElement = document.getElementsByTagName('input')[i];
        const inputValue = inputElement.value.trim(); // Trim whitespace

        // Check if input is empty
        if (inputValue === '') {
            A[i] = 0; // Set to 0 if empty
            continue; // Skip to the next iteration
        }

        // Convert input to a number and check if it is between 1 and 9
        const numberValue = Number(inputValue);
        if (numberValue >= 1 && numberValue <= 9) {
            A[i] = numberValue; // Set the value in the array
        } else {
            isInputValid = false; // Mark as invalid if outside 1-9 range
            break; // Exit the loop immediately for any invalid input
        }
    }

    // If the input is invalid, show the invalid message
    if (!isInputValid) {
        invalidInputMsg.style.display = 'block';
        return; // Exit the function
    } else {
        invalidInputMsg.style.display = 'none'; // Hide the invalid input message
    }

    // Giving output a different color        
    for (let i = 0; i < 81; i++) {
        if (A[i] === 0) {
            document.getElementsByTagName('input')[i].style.color = 'rgb(89, 89, 231)';
        }
    }

    // Converting 1D input array to a 2D array/board
    var board = [];
    while (A.length > 0) {
        board.push(A.splice(0, 9));
    }

    // Check for no input condition
    if (!checkInput(board)) {
        document.getElementById('alert-msg').style.display = 'block';
        return; // Exit the function
    } else {
        document.getElementById('alert-msg').style.display = 'none'; // Hide alert message
    }

    // Attempt to solve the Sudoku if input is valid
    if (solveSudoku(board, 9)) {
        print(board);
    } else {
        alert('No Solution');
    }
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

function isSafe(board, row, col, value) {
    // Check if row has the value already
    for (let j = 0; j < board.length; j++) {	
        if (board[row][j] == value) {
            return false;
        }
    }

    // Check if column has the value already
    for (let i = 0; i < board.length; i++) {	
        if (board[i][col] == value) {
            return false;
        }
    }

    // Check if the 3x3 matrix has the value already
    let sqrt = Math.floor(Math.sqrt(board.length));
    let boxRowStart = row - row % sqrt;
    let boxColStart = col - col % sqrt;

    for (let i = boxRowStart; i < boxRowStart + sqrt; i++) {
        for (let j = boxColStart; j < boxColStart + sqrt; j++) {
            if (board[i][j] == value) {
                return false;
            }
        }
    }

    // If none of the above conditions satisfied, it's safe
    return true;
}

function solveSudoku(board, n) {
    let row = -1;
    let col = -1;
    let isEmpty = true;
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] == 0) {
                row = i;
                col = j;

                // We still have some remaining missing values in Sudoku
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty) {
            break;
        }
    }

    // No empty space left
    if (isEmpty) {
        return true;
    }

    // Else for each-row backtrack
    for (let num = 1; num <= n; num++) {
        if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board, n)) {
                return true;
            } else {
                board[row][col] = 0; // Backtrack
            }
        }
    }
    return false;
}

function print(board) {
    // Changing 2D back to 1D
    const output = new Array();
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            output.push(board[i][j]);
        }
    }

    for (let k = 0; k < 81; k++) {
        document.getElementsByTagName('input')[k].value = output[k];
    }
}

resetButton.addEventListener('click', resetInputs);

function resetInputs() {
    // Reset input fields
    const inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = ''; // Clear the input
        inputs[i].style.color = ''; // Reset color
    }
    
    // Hide invalid input message and alert message
    invalidInputMsg.style.display = 'none';
    document.getElementById('alert-msg').style.display = 'none';
}
