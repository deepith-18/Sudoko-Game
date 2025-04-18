# Modern Sudoku Game

A beautiful, interactive Sudoku puzzle game built with HTML, CSS, and JavaScript.

## Features

- Clean and modern UI
- Multiple difficulty levels
- Timer to track your speed
- Error counting
- Number highlighting to improve gameplay
- Mobile responsive design
- Keyboard navigation support

## File Structure

```
sudoku-game/
│
├── index.html         # Main HTML file
├── assets/            # Assets folder
│   ├── favicon.ico    # Website favicon
│   └── images/        # For potential images
│       └── logo.svg   # Optional logo
│
├── css/               # Separated CSS
│   └── styles.css     # Main stylesheet
│
├── js/                # Separated JavaScript
│   ├── app.js         # Main application file and initialization
│   ├── board.js       # Board creation and management
│   ├── generator.js   # Puzzle generation algorithms
│   ├── solver.js      # Solver algorithms
│   ├── ui.js          # UI interaction handling
│   └── timer.js       # Timer functionality
│
├── README.md          # Project documentation
└── .gitignore         # Git ignore file
```

## How to Play

1. Select a difficulty level from the dropdown menu
2. Click "New Game" to start a fresh puzzle
3. Click on a cell to select it
4. Click on a number in the number pad or use keyboard keys 1-9 to input a value
5. Use the "✕" button or Delete/Backspace key to erase a value
6. Use arrow keys to navigate between cells
7. Complete the puzzle by filling all cells correctly

## Special Features

### Number Highlighting

- When you select a cell, all cells in the same row, column, and box are highlighted in light blue
- All cells with the same value are highlighted in a different color
- This helps you quickly see related cells and avoid errors

### Error Tracking

- The game keeps track of how many incorrect numbers you've entered
- Incorrect numbers are displayed in red

### Responsive Design

- The game adapts to different screen sizes and works well on both desktop and mobile devices

## Development

This project uses vanilla JavaScript with a modular approach for better code organization:

- **solver.js**: Contains the Sudoku solving algorithm
- **generator.js**: Contains functions for generating puzzles
- **board.js**: Manages the game board data
- **timer.js**: Handles the game timer
- **ui.js**: Manages UI interactions and updates
- **app.js**: Main application initialization

## Future Improvements

- Save game progress in local storage
- Add themes and customization options
- Implement hint system
- Add achievements and statistics
- Add touch gesture support for mobile

## License

MIT License