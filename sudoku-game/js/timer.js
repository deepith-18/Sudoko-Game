/**
 * Timer module
 * Handles game timer functionality
 */

const SudokuTimer = (() => {
    let startTime = 0;
    let timerInterval = null;
    let isRunning = false;
    let elapsedSeconds = 0;
    let timerElement = null;

    // Initialize timer with DOM element
    function initialize(element) {
        timerElement = element;
        reset();
    }

    // Start the timer
    function start() {
        if (isRunning) return;
        
        startTime = new Date().getTime() - (elapsedSeconds * 1000);
        isRunning = true;
        
        timerInterval = setInterval(() => {
            updateTimer();
        }, 1000);
    }

    // Stop the timer
    function stop() {
        if (!isRunning) return;
        
        clearInterval(timerInterval);
        isRunning = false;
    }

    // Reset the timer
    function reset() {
        stop();
        elapsedSeconds = 0;
        updateDisplay();
    }

    // Update the timer
    function updateTimer() {
        const currentTime = new Date().getTime();
        elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
        updateDisplay();
    }

    // Format time as MM:SS
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${secs}`;
    }

    // Update the timer display
    function updateDisplay() {
        if (timerElement) {
            timerElement.textContent = formatTime(elapsedSeconds);
        }
    }

    // Get elapsed time in seconds
    function getElapsedTime() {
        return elapsedSeconds;
    }

    // Return public methods
    return {
        initialize,
        start,
        stop,
        reset,
        getElapsedTime
    };
})();