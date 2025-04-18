/**
 * UI module
 * Handles UI interactions and updates
 */

const SudokuUI = (() => {
    // DOM Elements
    let boardElement;
    let messageElement;
    let errorCountElement;
    let startButtonElement;
    let isGameStarted = false;
    
    // Game state
    let errorCount = 0;
    
    // Initialize the UI
    function initialize() {
        boardElement = document.getElementById('board');
        messageElement = document.getElementById('message');
        errorCountElement = document.getElementById('errors');
        startButtonElement = document.getElementById('start-game-btn');
        
        // Reset error count
        errorCount = 0;
        errorCountElement.textContent = '0';
        
        // Create cells for the board
        createBoardCells();
        
        // Add event listeners for number pad
        setupNumberPad();
        
        // Add keyboard support
        setupKeyboardSupport();
        
        // Add event listener for start button
        setupStartButton();
        
        // Set game as not started initially
        isGameStarted = false;
    }
    
    // Set up start button
    function setupStartButton() {
        startButtonElement.addEventListener('click', () => {
            if (!isGameStarted) {
                isGameStarted = true;
                SudokuTimer.start();
                startButtonElement.textContent = "Reset";
                showMessage("Game started! Good luck!");
            } else {
                // Reset the game if already started
                resetGame();
            }
        });
    }
    
    // Reset the game
    function resetGame() {
        isGameStarted = false;
        SudokuTimer.reset();
        startButtonElement.textContent = "Start";
        // Initialize a new game with the current difficulty
        const difficulty = document.getElementById('difficulty').value;
        const puzzleData = SudokuGenerator.createPuzzle(difficulty);
        SudokuBoard.setBoard(puzzleData);
        updateBoard();
        showMessage("Game reset!");
    }
    
    // Create cells for the board
    function createBoardCells() {
        boardElement.innerHTML = '';
        
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                cell.addEventListener('click', () => {
                    if (!isGameStarted) {
                        showMessage("Press 'Start' to begin the game!", "info");
                        return;
                    }
                    handleCellClick(row, col);
                });
                
                boardElement.appendChild(cell);
            }
        }
    }
    
    // Handle cell click
    function handleCellClick(row, col) {
        // Clear all selections and highlights
        clearHighlights();
        
        // Select this cell
        const cell = getCellElement(row, col);
        cell.classList.add('selected');
        
        // Set the selected cell in the board module
        SudokuBoard.setSelectedCell(row, col);
        
        // Add related cell highlights
        highlightRelatedCells(row, col);
        
        // If this cell has a value, highlight all matching values
        const value = SudokuBoard.getCellValue(row, col);
        if (value !== 0) {
            highlightSameValues(value);
        }
    }
    
    // Clear all highlights
    function clearHighlights() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.remove('selected', 'related', 'same-value', 'number-highlighted');
        });
    }
    
    // Highlight related cells (same row, column, or box)
    function highlightRelatedCells(row, col) {
        const relatedCells = SudokuBoard.getRelatedCells(row, col);
        
        relatedCells.forEach(cellPos => {
            const cell = getCellElement(cellPos.row, cellPos.col);
            cell.classList.add('related');
        });
    }
    
    // Highlight cells with the same value
    function highlightSameValues(value) {
        const matchingCells = SudokuBoard.findCellsWithSameValue(value);
        
        matchingCells.forEach(cellPos => {
            const cell = getCellElement(cellPos.row, cellPos.col);
            cell.classList.add('same-value');
        });
    }
    
    // Highlight all cells with a specific number
    function highlightNumberOnBoard(number) {
        clearHighlights();
        
        if (number === 0) return;
        
        const matchingCells = SudokuBoard.findCellsWithSameValue(number);
        
        matchingCells.forEach(cellPos => {
            const cell = getCellElement(cellPos.row, cellPos.col);
            cell.classList.add('number-highlighted');
        });
    }
    
    // Set up number pad
    function setupNumberPad() {
        const numberButtons = document.querySelectorAll('.number-btn');
        const eraseButton = document.getElementById('erase-btn');
        
        numberButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (!isGameStarted) {
                    showMessage("Press 'Start' to begin the game!", "info");
                    return;
                }
                
                const number = btn.dataset.number;
                if (number) {
                    const numberValue = parseInt(number);
                    // First highlight all cells with this number
                    highlightNumberOnBoard(numberValue);
                    
                    // Then handle input if a cell is selected
                    if (SudokuBoard.getSelectedCell()) {
                        handleNumberInput(numberValue);
                    }
                }
            });
            
            // Add hover effect to show which numbers are on the board
            btn.addEventListener('mouseover', () => {
                const number = btn.dataset.number;
                if (number) {
                    highlightNumberOnBoard(parseInt(number));
                }
            });
            
            btn.addEventListener('mouseout', () => {
                // Restore previous selection if any
                const selectedCell = SudokuBoard.getSelectedCell();
                if (selectedCell) {
                    handleCellClick(selectedCell.row, selectedCell.col);
                } else {
                    clearHighlights();
                }
            });
        });
        
        eraseButton.addEventListener('click', () => {
            if (!isGameStarted) {
                showMessage("Press 'Start' to begin the game!", "info");
                return;
            }
            handleNumberInput(0);
        });
    }
    
    // Set up keyboard support
    function setupKeyboardSupport() {
        document.addEventListener('keydown', event => {
            if (!isGameStarted) {
                if (event.key === 'Enter') {
                    startButtonElement.click();
                }
                return;
            }
            
            // Number keys 1-9
            if (event.key >= '1' && event.key <= '9') {
                const num = parseInt(event.key);
                // First highlight all instances of the number
                highlightNumberOnBoard(num);
                
                // Then input the number if a cell is selected
                handleNumberInput(num);
            } 
            // Delete or Backspace to erase
            else if (event.key === 'Delete' || event.key === 'Backspace') {
                handleNumberInput(0);
            }
            // Arrow keys for navigation
            else if (event.key.startsWith('Arrow')) {
                navigateWithArrowKeys(event.key);
            }
        });
    }
    
    // Handle arrow key navigation
    function navigateWithArrowKeys(key) {
        const selectedCell = SudokuBoard.getSelectedCell();
        if (!selectedCell) return;
        
        let { row, col } = selectedCell;
        
        switch (key) {
            case 'ArrowUp':
                row = (row - 1 + 9) % 9;
                break;
            case 'ArrowDown':
                row = (row + 1) % 9;
                break;
            case 'ArrowLeft':
                col = (col - 1 + 9) % 9;
                break;
            case 'ArrowRight':
                col = (col + 1) % 9;
                break;
        }
        
        handleCellClick(row, col);
    }
    
    // Handle number input
    function handleNumberInput(number) {
        const selectedCell = SudokuBoard.getSelectedCell();
        if (!selectedCell) return;
        
        const { row, col } = selectedCell;
        
        // If the cell is part of the initial board, don't change it
        if (SudokuBoard.isFixedCell(row, col)) {
            showMessage('This number is fixed and cannot be changed', 'error');
            return;
        }
        
        // Update the cell value in the board
        SudokuBoard.setCellValue(row, col, number);
        
        // Update the cell display
        updateCell(row, col);
        
        // If the cell now has a value, highlight matching values
        if (number !== 0) {
            clearHighlights();
            
            // Re-highlight the selected cell
            const cell = getCellElement(row, col);
            cell.classList.add('selected');
            
            // Highlight related cells
            highlightRelatedCells(row, col);
            
            // Highlight same values
            highlightSameValues(number);
            
            // Check if the move is correct
            if (!SudokuBoard.isCellCorrect(row, col)) {
                incrementErrorCount();
                cell.classList.add('incorrect');
            } else {
                cell.classList.remove('incorrect');
                
                // Check if the board is complete
                if (SudokuBoard.isBoardComplete()) {
                    gameComplete();
                }
            }
        } else {
            // If erasing, just clear the cell
            const cell = getCellElement(row, col);
            cell.classList.remove('incorrect');
        }
    }
    
    // Get the DOM element for a cell
    function getCellElement(row, col) {
        return document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    }
    
    // Update a cell's display
    function updateCell(row, col) {
        const cell = getCellElement(row, col);
        const value = SudokuBoard.getCellValue(row, col);
        
        cell.textContent = value === 0 ? '' : value;
        
        if (SudokuBoard.isFixedCell(row, col)) {
            cell.classList.add('fixed');
        } else {
            cell.classList.remove('fixed');
        }
    }
    
    // Update the entire board display
    function updateBoard() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                updateCell(row, col);
            }
        }
    }
    
    // Increment error count
    function incrementErrorCount() {
        errorCount++;
        errorCountElement.textContent = errorCount;
    }
    
    // Show a message
    function showMessage(text, type = 'success') {
        messageElement.textContent = text;
        
        // Set background color based on message type
        switch(type) {
            case 'error':
                messageElement.style.backgroundColor = 'var(--wrong-color)';
                break;
            case 'info':
                messageElement.style.backgroundColor = 'var(--primary-color)';
                break;
            default:
                messageElement.style.backgroundColor = '#4caf50';
        }
        
        messageElement.classList.add('show');
        
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 2000);
    }
    
    // Handle game completion
    function gameComplete() {
        showMessage('Puzzle completed! Great job!');
        SudokuTimer.stop();
        isGameStarted = false;
        startButtonElement.textContent = "New Game";
        
        // Add celebration animation to the board
        boardElement.classList.add('celebration');
        setTimeout(() => {
            boardElement.classList.remove('celebration');
        }, 1000);
    }
    
    // Return public methods
    return {
        initialize,
        updateBoard,
        showMessage,
        resetGame
    };
})();