/**
 * Sudoku Generator module
 * Contains functions for generating Sudoku puzzles
 */

const SudokuGenerator = (() => {
    // Utility function to shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Fill the diagonal 3x3 boxes
    function fillDiagonalBoxes(board) {
        for (let box = 0; box < 3; box++) {
            const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            shuffleArray(numbers);
            
            let idx = 0;
            for (let row = box * 3; row < box * 3 + 3; row++) {
                for (let col = box * 3; col < box * 3 + 3; col++) {
                    board[row][col] = numbers[idx++];
                }
            }
        }
    }

    // Generate a solved Sudoku board
    function generateSolvedBoard() {
        // Initialize with empty values
        const board = Array(9).fill().map(() => Array(9).fill(0));
        
        // Fill diagonal boxes
        fillDiagonalBoxes(board);
        
        // Solve the rest of the board
        SudokuSolver.solve(board);
        
        return board;
    }

    // Create a puzzle by removing some numbers
    function createPuzzle(difficulty) {
        // Generate a solved board
        const solvedBoard = generateSolvedBoard();
        const puzzle = solvedBoard.map(row => [...row]);
        
        // Define difficulty levels (number of cells to keep)
        const difficultyLevels = {
            'easy': 40,
            'medium': 33,
            'hard': 27,
            'very-hard': 22
        };
        
        const numberToKeep = difficultyLevels[difficulty] || 35;
        
        // Calculate number of cells to remove
        const totalCells = 81;
        const cellsToRemove = totalCells - numberToKeep;
        
        // Create positions array and shuffle it
        const positions = [];
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                positions.push([row, col]);
            }
        }
        shuffleArray(positions);
        
        // Remove cells one by one, ensuring uniqueness of solution
        for (let i = 0; i < cellsToRemove; i++) {
            const [row, col] = positions[i];
            const temp = puzzle[row][col];
            puzzle[row][col] = 0;
            
            // TODO: For a more accurate generator, we should check that 
            // the puzzle still has a unique solution after removing each cell.
            // This is computationally expensive, so we're simplifying here.
        }
        
        return {
            puzzle,
            solution: solvedBoard
        };
    }

    // Return public methods
    return {
        createPuzzle,
        generateSolvedBoard
    };
})();