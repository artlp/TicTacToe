const gameBoard = {
    emptyBoard: [1,2,3,4,5,6,7,8],
    playedBoard: [,,,,,,,,],
    player1: {
        name: "Player 1",
        mark: "X",
    },
    player2: {
        name: "Player 2",
        mark: "O", 
    }
}


const board = document.querySelector('.gameboard');
board.addEventListener('click', () => {
    if (event.target.classList.contains('cell')) {
        let id = event.target.dataset.id;
        addMark(id, event.target);
        // return id;
    }
})
const drawGameBoard = (function() {
    for (let i = 0; i <= gameBoard.emptyBoard.length; i++) {
        const gameCell = document.createElement('div');
        gameCell.classList.add('cell');
        gameCell.setAttribute('data-id', i);
        board.appendChild(gameCell);
    }
})()
const gameCells = document.querySelectorAll('.cell')

const addMark = (id,player) => {
    gameCells[id].innerText = gameBoard.player.mark;
    console.log(id,event)
}