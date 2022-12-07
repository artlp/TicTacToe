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

    const markersArray = Object.values(markers);
    const colorsArray = Object.values(colors);

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
    return { boards, drawGameBoard, gameCells, colors, markers, markersArray, colorsArray };
})();

//* players module
const Players = (() => {

    // const Player = (name, marker, color) => {
    //     const turn = id => {
    //         gameBoard.gameCells[id].innerText = marker;
    //         gameBoard.boards.playedBoard[id] = marker;
    //         gameBoard.gameCells[id].classList.add('clicked');
    //         gameBoard.gameCells[id].style.color = color;
    //     };
    //     this.marker = marker;
    //     this.color = color;
    //     return { name, marker, color, turn };
    // };
    // const player1 = Player('Player 1', gameBoard.markersArray[0], gameBoard.colorsArray[0]);
    // const player2 = Player('Player 2', gameBoard.markersArray[1], gameBoard.colorsArray[1]);

    class Player {
        constructor(name, marker, color) {
            this.name = name;
            this.marker = marker;
            this.color = color;
        }
        turn(id) {
            gameBoard.gameCells[id].innerText = this.marker;
            gameBoard.boards.playedBoard[id] = this.marker;
            gameBoard.gameCells[id].classList.add('clicked');
            gameBoard.gameCells[id].style.color = this.color;
        }
    }
    const player1 = new Player("Player 1", gameBoard.markersArray[0], gameBoard.colorsArray[0]);
    const player2 = new Player("Player 2", gameBoard.markersArray[1], gameBoard.colorsArray[1]);

    return { Player, player1, player2 };
})();
message.innerText = `${Players.player1.name}, it's your turn`;

//* game module
const gameController = (() => {
    let activePlayer = Players.player1;
    const gameMode = ["vs", "ai"];
    let winnerDeclared = false;
    let remainingSpots = 9;
    const endScreen = document.querySelector('.endgame');
    const winScreen = document.querySelector('.win');
    const loseScreen = document.querySelector('.lose');
    const drawScreen = document.querySelector('.draw');
    const message = document.querySelector('#message');
    const changeActivePlayer = () => {
        activePlayer === Players.player1 ? activePlayer = Players.player2 : activePlayer = Players.player1;
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
const Interface = (() => {
    const mainscreen = document.querySelector('.mainscreen');
    const squares = document.querySelector('.gameboard');
    const squaresInfo = document.querySelector('.gameboard-info');
    const settingsscreen = document.querySelector('.settingsscreen');
    const btnBackToMain = document.querySelector('.backtomain');
    const playGameBtn = document.querySelector('#playgame');
    const settingsAccept = document.querySelector('.settingsaccept');
    const settingsBtn = document.querySelector('#settings');
    const p1Name = document.querySelector('#player1name');
    const p2Name = document.querySelector('#player2name');
    const p1Marker = document.querySelector('#player1marker');
    const p2Marker = document.querySelector('#player2marker');


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
        p1Name.value ? Players.player1.name = p1Name.value : Players.player1.name = "Player 1";
        p2Name.value ? Players.player2.name = p2Name.value : Players.player2.name = "Player 2";
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

    function selectedOption(option) {
        option.classList.add('selectedOption');
    }

    const marker1Div = document.querySelector('#player1marker');
    const p2MarkersHolder = document.querySelector('#player2markers fieldset');

    for (const mark of gameBoard.markersArray) {
        const marker = document.createElement('div');
        marker.innerText = mark;
        marker.setAttribute("data-mark", mark);
        marker.classList.add("settingsmarker");
        marker1Div.append(marker);
    }
    let p2Marks = marker1Div.cloneNode(true);
    p2Marks.setAttribute("id", "player2marker");
    p2MarkersHolder.append(p2Marks);


    const color1Div = document.querySelector('#player1color');
    const p2ColorsHolder = document.querySelector('#player2colors > fieldset');

    gameBoard.colorsArray.forEach((e, i, ar) => {
        const color = document.createElement('div');
        color.style.backgroundColor = e;
        color.setAttribute("data-color", i);
        color.classList.add("settingscolor");
        color1Div.append(color);
    });
    let p2Colors = color1Div.cloneNode(true);
    p2Colors.setAttribute("id", "player2color");
    p2ColorsHolder.append(p2Colors);

    const color2Div = document.querySelector('#player2color');
    const marker2Div = document.querySelector('#player2marker');
    selectedOption(color1Div.childNodes[0]);
    selectedOption(color2Div.childNodes[1]);
    selectedOption(marker1Div.childNodes[0]);
    selectedOption(marker2Div.childNodes[1]);

    color1Div.childNodes.forEach((e, i, ar) => {
        e.addEventListener('click', () => {
            ar.forEach(x => {
                x.className = "settingscolor";
            })
            Players.player1.color = gameBoard.colorsArray[i];
            e.className = "settingscolor";
            selectedOption(e);
        });
    });
    color2Div.childNodes.forEach((e, i, ar) => {
        e.addEventListener('click', () => {
            ar.forEach(x => {
                x.className = "settingscolor";
            })
            Players.player2.color = gameBoard.colorsArray[i];
            e.className = "settingscolor";
            selectedOption(e);
        });
    });
    marker1Div.childNodes.forEach((e, i, ar) => {
        e.addEventListener('click', () => {
            ar.forEach(x => {
                x.className = "settingscolor";
            })
            Players.player1.marker = gameBoard.markersArray[i];
            e.className = "settingscolor";
            selectedOption(e);
        });
    });
    marker2Div.childNodes.forEach((e, i, ar) => {
        e.addEventListener('click', () => {
            ar.forEach(x => {
                x.className = "settingscolor";
            })
            Players.player2.marker = gameBoard.markersArray[i];
            e.className = "settingscolor";
            selectedOption(e);
        });
    });

    return { marker1Div, color1Div, color2Div };
})();


