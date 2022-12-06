//* board arrays and drawing board
const gameBoard = (() => {
    let boards = {
        playedBoard: [,],
        winningBoards: [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
    };
    const colors = {
        black: "hsl(0, 80%, 0%)",
        white: "hsl(0, 100%, 100%)",
        red: "hsl(1, 77%, 55%)",
        blue: "hsl(200, 97%, 45%)",
        yellow: "hsl(65, 100%, 63%)",
        green: "hsl(88, 100%, 67%)",
        orange: "hsl(36, 100%, 50%)",
    };
    const markers = {
        cross: "⤫",
        circle: "●",
        star: "★",
        heart: "🎔",
        note: "♪",
    };
    const drawGameBoard = () => {
        const board = document.querySelector('.gameboard');
        for (let i = 0; i < 9; i++) {
            const gameCell = document.createElement('div');
            gameCell.classList.add('cell');
            gameCell.setAttribute('data-id', i);
            board.appendChild(gameCell);
        }
        board.addEventListener('click', (e) => {
            gameController.gameTurn(e);
        });
    };
    drawGameBoard();
    const gameCells = document.querySelectorAll('.cell');
    return { boards, drawGameBoard, gameCells, colors, markers };
})();


const Player = (name, marker, color) => {
    const turn = id => {
        gameBoard.gameCells[id].style.color = color;
        // gameBoard.gameCells[id].style.backgroundColor = color;
        gameBoard.gameCells[id].classList.add('clicked');
        gameBoard.gameCells[id].innerText = marker;
        gameBoard.boards.playedBoard[id] = marker;
    };
    return { name, marker, color, turn };
};
const player1 = Player('Player 1', gameBoard.markers.cross, gameBoard.colors.black);
const player2 = Player('Player 2', gameBoard.markers.circle, gameBoard.colors.white);


//* game module
const gameController = (() => {
    let activePlayer = player1;
    const gameMode = ["vs", "ai"];
    let winnerDeclared = false;
    let remainingSpots = 9;
    const endScreen = document.querySelector('.endgame');
    const winScreen = document.querySelector('.win');
    const loseScreen = document.querySelector('.lose');
    const drawScreen = document.querySelector('.draw');
    const message = document.querySelector('#message');
    const changeActivePlayer = () => {
        activePlayer === player1 ? activePlayer = player2 : activePlayer = player1;
        message.innerText = `${activePlayer.name}, it's your turn`;
    };

    const checkWinner = (player) => {
        gameBoard.boards.winningBoards.forEach((e) => {
            if (gameBoard.boards.playedBoard[e[0]] === player.marker && gameBoard.boards.playedBoard[e[1]] === player.marker && gameBoard.boards.playedBoard[e[2]] === player.marker) {
                endScreen.classList.remove('hidden');
                winScreen.classList.remove('hidden');
                winScreen.innerText = `winner is ${player.name}`;
                winnerDeclared = true;
            }
        });
        if (remainingSpots === 0 && !winnerDeclared) {
            endScreen.classList.remove('hidden');
            drawScreen.classList.remove('hidden');
            winnerDeclared = true;
        };
    };
    const gameTurn = (event) => {
        if (event.target.classList.contains('cell') && !winnerDeclared) {
            remainingSpots--;
            let id = event.target.dataset.id;
            activePlayer.turn(id);
            checkWinner(activePlayer);
            changeActivePlayer();
        }
    };
    return { changeActivePlayer, gameTurn, endScreen, winScreen, loseScreen, drawScreen };
})();

//*settings and buttons module 
const interface = (() => {
    const mainscreen = document.querySelector('.mainscreen');
    const squares = document.querySelector('.gameboard');
    const squaresInfo = document.querySelector('.gameboard-info');
    const settingsscreen = document.querySelector('.settingsscreen');
    const btnBackToMain = document.querySelector('.backtomain');
    const playGameBtn = document.querySelector('#playgame');
    const settingsAccept = document.querySelector('.settingsaccept');
    const settingsCancel = document.querySelector('.settingscancel');
    const settingsBtn = document.querySelector('#settings');

    playGameBtn.addEventListener('click', () => {
        mainscreen.classList.toggle('hideleft');
        squares.classList.toggle('showleft');
        squaresInfo.classList.toggle('showleft');

    });
    settingsBtn.addEventListener('click', () => {
        mainscreen.classList.toggle('hideright');
        settingsscreen.classList.toggle('showright');

    });
    settingsAccept.addEventListener('click', () => {
        mainscreen.classList.remove('hideright');
        mainscreen.classList.add('showleft');
        settingsscreen.classList.remove('showright');
        settingsscreen.classList.add('hideleft');
        defaultClasses();

    });
    settingsCancel.addEventListener('click', () => {
        mainscreen.classList.remove('hideright');
        mainscreen.classList.add('showleft');
        settingsscreen.classList.remove('showright');
        settingsscreen.classList.add('hideleft');
        defaultClasses();
    });
    btnBackToMain.addEventListener('click', () => {
        mainscreen.classList.remove('hideleft');
        squares.classList.remove('showleft');
        squaresInfo.classList.remove('showleft');
        mainscreen.classList.add('showright');
        squares.classList.add('hideright');
        squaresInfo.classList.add('hideright');
        defaultClasses();
    });

    function defaultClasses() {
        gameController.endScreen.className = "endgame hidden";
        gameController.winScreen.className = "win hidden";
        gameController.loseScreen.className = "lose hidden";
        gameController.drawScreen.className = "draw hidden";
        setTimeout(() => {
            squares.className = "gameboard";
            squaresInfo.className = "gameboard-info";
            mainscreen.className = "mainscreen";
            settingsscreen.className = "settingsscreen";
        }, 720);
    }

    const marker1Div = document.querySelector('#player1marker');
    const marker2Div = document.querySelector('#player2markers fieldset > div');

    let markersArray = Object.values(gameBoard.markers);
    for (const mark of markersArray) {
        const marker = document.createElement('div');
        marker.innerText = mark;
        marker.setAttribute("data-mark", mark);

        marker.classList.add("settingsmarker");
        marker1Div.append(marker);
    }
    let p2Marks = marker1Div.cloneNode(true);
    p2Marks.setAttribute("id", "player2marker");
    marker2Div.append(p2Marks);


    const color1Div = document.querySelector('#player1color');
    const color2Div = document.querySelector('#player2colors fieldset > div');

    for (const [key, value] of Object.entries(gameBoard.colors)) {
        console.log(key)
        const color = document.createElement('div');
        color.innerText = "";
        color.style.backgroundColor = value;
        color.setAttribute("data-mark", key)
        color.classList.add("settingscolor");
        color1Div.append(color);
    }
    let p2Colors = color1Div.cloneNode(true);
    p2Colors.setAttribute("id", "player2color");
    color2Div.append(p2Colors);

    return { marker1Div };
})();


