const websocket = new WebSocket('ws://localhost:6789');

websocket.onopen = () => {
    console.log('Connected to server');
};

websocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'state_update') {
        renderGameState(data.game_state);
    }
};

function renderGameState(gameState) {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';  // Clear existing cells

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';

            const content = gameState[row][col];
            if (content) {
                cell.classList.add(content.startsWith('A') ? 'player-A' : 'player-B');
                cell.textContent = content;
            }

            gameBoard.appendChild(cell);
        }
    }
}

function sendMove(character, move) {
    const moveData = {
        type: 'move',
        character: character,
        move: move
    };
    websocket.send(JSON.stringify(moveData));
}

// Example: send a move when a button is clicked (to be implemented with actual buttons)
document.addEventListener('click', () => {
    sendMove('A-P1', 'L');
});
