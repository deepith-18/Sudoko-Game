/**
 * Sudoku Board module
 * Handles board data and operations
 */

const SudokuBoard = (() => {
    // Private board data
    let boardData = {
        puzzle: [],         // Current puzzle state
        solution: [],       // Solution for checking correctness
        selectedCell: null, // Currently selected cell coordinates
        initialState: []    // To track original cells (fixed)
    };

    // Initialize a new board
    function initialize() {
        boardData.puzzle = Array(9).fill().map(() => Array(9).fill(0));
        boardData.solution = Array(9).fill().map(() => Array(9).fill(0));
        boardData.initialState = Array(9).fill().map(() => Array(9).fill(false));
        boardData.selectedCell = null;
    }

    // Set the board from a generated puzzle
    function setBoard(puzzleData) {
        boardData.puzzle = puzzleData.puzzle.map(row => [...row]);
        boardData.solution = puzzleData.solution.map(row => [...row]);
        
        // Mark initial cells
        boardData.initialState = Array(9).fill().map((_, row) => 
            Array(9).fill().map((_, col) => boardData.puzzle[row][col] !== 0)
        );
    }

    // Get cell value
    function getCellValue(row, col) {
        return boardData.puzzle[row][col];
    }

    // Get if cell is part of initial board (fixed)
    function isFixedCell(row, col) {
        return boardData.initialState[row][col];
    }

    // Check if cell value is correct (matches solution)
    function isCellCorrect(row, col) {
        return boardData.puzzle[row][col] === boardData.solution[row][col];
    }

    // Set a value in a cell
    function setCellValue(row, col, value) {
        if (!isFixedCell(row, col)) {
            boardData.puzzle[row][col] = value;
            return true;
        }
        return false;
    }

    // Check if board is complete and correct
    function isBoardComplete() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (boardData.puzzle[row][col] !== boardData.solution[row][col]) {
                    return false;
                }
            }
        }
        return true;
    }

    // Set the selected cell
    function setSelectedCell(row, col) {
        boardData.selectedCell = { row, col };
    }

    // Get the selected cell
    function getSelectedCell() {
        return boardData.selectedCell;
    }

    // Find cells with the same value
    function findCellsWithSameValue(value) {
        if (!value || value === 0) return [];
        
        const cells = [];
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (boardData.puzzle[row][col] === value) {
                    cells.push({ row, col });
                }
            }
        }
        return cells;
    }

    // Get related cells (same row, column, or box)
    function getRelatedCells(row, col) {
        const related = [];
        
        // Same row
        for (let c = 0; c < 9; c++) {
            if (c !== col) {
                related.push({ row, col: c });
            }
        }
        
        // Same column
        for (let r = 0; r < 9; r++) {
            if (r !== row) {
                related.push({ row: r, col });
            }
        }
        
        // Same 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const newRow = boxRow + r;
                const newCol = boxCol + c;
                if (newRow !== row || newCol !== col) {
                    related.push({ row: newRow, col: newCol });
                }
            }
        }
        
        return related;
    }

    // Return public methods
    return {
        initialize,
        setBoard,
        getCellValue,
        isFixedCell,
        isCellCorrect,
        setCellValue,
        isBoardComplete,
        setSelectedCell,
        getSelectedCell,
        findCellsWithSameValue,
        getRelatedCells
    };
})();