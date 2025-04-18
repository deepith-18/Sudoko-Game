/**
 * Main application module
 * Initializes and connects all components
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize timer
    const timerElement = document.getElementById('timer');
    SudokuTimer.initialize(timerElement);
    
    // DOM elements
    const difficultySelect = document.getElementById('difficulty');
    const newGameButton = document.getElementById('new-game-btn');
    
    // Start a new game
    function startNewGame() {
        // Initialize the board data
        SudokuBoard.initialize();
        
        // Initialize the UI
        SudokuUI.initialize();
        
        // Generate a new puzzle
        const difficulty = difficultySelect.value;
        const puzzleData = SudokuGenerator.createPuzzle(difficulty);
        
        // Set the board with the new puzzle
        SudokuBoard.setBoard(puzzleData);
        
        // Update the UI
        SudokuUI.updateBoard();
        
        // Reset and start timer
        SudokuTimer.reset();
        SudokuTimer.start();
        
        // Show a message
        SudokuUI.showMessage(`New ${difficulty} game started`);
    }
    
    // Event listeners
    newGameButton.addEventListener('click', startNewGame);
    
    // Start a new game immediately
    startNewGame();
});