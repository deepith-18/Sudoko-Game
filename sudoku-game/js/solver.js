/**
 * Sudoku Solver module
 * Contains functions for solving Sudoku puzzles
 */

const SudokuSolver = (() => {
    // Check if a number is valid in the given position
    function isValid(board, row, col, num) {
        // Check row
        for (let c = 0; c < 9; c++) {
            if (board[row][c] === num) return false;
        }
        
        // Check column
        for (let r = 0; r < 9; r++) {
            if (board[r][col] === num) return false;
        }
        
        // Check 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (board[boxRow + r][boxCol + c] === num) return false;
            }
        }
        
        return true;
    }

    // Find an empty cell (with value 0)
    function findEmptyCell(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    return [row, col];
                }
            }
        }
        return null; // No empty cells (board is solved)
    }

    // Solve the Sudoku using backtracking algorithm
    function solve(board) {
        const emptyCell = findEmptyCell(board);
        if (!emptyCell) return true; // Board is solved
        
        const [row, col] = emptyCell;
        
        // Try numbers 1-9
        for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
                board[row][col] = num;
                
                // Recursively try to solve the rest
                if (solve(board)) {
                    return true;
                }
                
                // If we get here, we need to backtrack
                board[row][col] = 0;
            }
        }
        
        return false; // Trigger backtracking
    }

    // Check if a solution is valid
    function isSolutionValid(board) {
        // Check rows
        for (let row = 0; row < 9; row++) {
            const seen = new Set();
            for (let col = 0; col < 9; col++) {
                const num = board[row][col];
                if (num !== 0) {
                    if (seen.has(num)) return false;
                    seen.add(num);
                }
            }
        }

        // Check columns
        for (let col = 0; col < 9; col++) {
            const seen = new Set();
            for (let row = 0; row < 9; row++) {
                const num = board[row][col];
                if (num !== 0) {
                    if (seen.has(num)) return false;
                    seen.add(num);
                }
            }
        }

        // Check 3x3 boxes
        for (let boxRow = 0; boxRow < 9; boxRow += 3) {
            for (let boxCol = 0; boxCol < 9; boxCol += 3) {
                const seen = new Set();
                for (let r = 0; r < 3; r++) {
                    for (let c = 0; c < 3; c++) {
                        const num = board[boxRow + r][boxCol + c];
                        if (num !== 0) {
                            if (seen.has(num)) return false;
                            seen.add(num);
                        }
                    }
                }
            }
        }

        return true;
    }

    // Return public methods
    return {
        isValid,
        solve,
        isSolutionValid
    };
})();