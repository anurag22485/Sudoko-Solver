# Sudoku Solver

A Sudoku solver built using a backtracking algorithm. This project provides a user-friendly interface for inputting Sudoku puzzles and displays the solved puzzle.
The project is live at: [SudokoSolver]([https://sudoko-solver-cues194su-anurag-singhs-projects-18b7525a.vercel.app/](https://anurag22485.github.io/Sudoko-Solver/))



## Features

- Input Sudoku puzzles in a 9x9 grid format.
- Solves the puzzle using a backtracking algorithm.
- Displays the solved Sudoku grid.

## How It Works

The solver utilizes a backtracking approach, which is a depth-first search algorithm. It places numbers 1-9 in each empty cell, checking for validity against Sudoku rules (each number must be unique in its row, column, and 3x3 subgrid). If a number placement leads to a conflict, the algorithm backtracks and tries the next number.

## Time Complexity

The time complexity of the backtracking algorithm used in this Sudoku solver can be analyzed as follows:

- In the worst case, the algorithm explores all possibilities for each empty cell.
- Since there are 81 cells in a Sudoku grid, and each cell can potentially take values from 1 to 9, the time complexity can be approximated to \(O(9^{m})\), where \(m\) is the number of empty cells.

However, the average case is much more efficient due to early pruning of invalid states.

## Space Complexity

The space complexity of the backtracking algorithm is primarily determined by the recursion stack:

- In the worst case, the maximum depth of the recursion stack can go up to the number of empty cells, \(m\).
- Thus, the space complexity is \(O(m)\), where \(m\) is the number of empty cells.
