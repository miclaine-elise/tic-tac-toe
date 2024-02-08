
function Gameboard() {
    const rows = 3;
    const columns = 3;
    let board = [];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push("");
        }
    }
    const getBoard = () => board;
    const addMarker = (row, column, marker) => board[row][column] = marker;
    return { getBoard, addMarker };

}

function GameController() {
    const players = [
        {
            name: "Player One",
            marker: "X"
        },
        {
            name: "Player Two",
            marker: "O"
        }];
    let currentPlayer = players[0]; //Initiliaze current player to player[0]
    const getCurrentPlayer = () => currentPlayer;
    let gameover = false;
    let tieGame = false;
    const getGameStatus = () => gameover;
    const getTieGameStatus = () => tieGame;
    let board = Gameboard();
    function playTurn(row, column) {
        board.addMarker(row - 1, column - 1, currentPlayer.marker);
        console.table(board.getBoard());
        checkForWinner();
        checkForTie();
    }
    const switchPlayerTurn = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };
    function checkForWinner() {
        const currentMarker = currentPlayer.marker;
        if (checkRows() || checkColumns() || checkDiagonals()) {
            gameover = true;
        };
        function checkMarkers(marker) {
            return marker === currentMarker;
        }
        function checkRows() {
            for (let row = 0; row < 3; row++) {
                const boardRow = board.getBoard()[row];
                if (boardRow.every(checkMarkers)) {
                    return true;
                }
            }
            return false;
        }

        function checkColumns() {
            for (let column = 0; column < 3; column++) {
                const boardColumn = board.getBoard().map(d => d[column]);
                if (boardColumn.every(checkMarkers)) {
                    return true;
                }
            }
            return false;
        }

        function checkDiagonals() {
            let diagonal1 = [];
            diagonal1[0] = board.getBoard()[0][0];
            diagonal1[1] = board.getBoard()[1][1];
            diagonal1[2] = board.getBoard()[2][2];
            let diagonal2 = [];
            diagonal2[0] = board.getBoard()[0][2];
            diagonal2[1] = board.getBoard()[1][1];
            diagonal2[2] = board.getBoard()[2][0];
            if (diagonal1.every(checkMarkers)) {
                return true;
            } else if (diagonal2.every(checkMarkers)) {
                return true;
            }
        }
    }
    function checkForTie() {
        const currentBoard = board.getBoard();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (currentBoard[i][j] === '') {
                    tieGame = true;
                    return false;
                }
            }
        }
        gameover = true;
        return true;
    }
    return { getCurrentPlayer, playTurn, switchPlayerTurn, getGameStatus, getTieGameStatus }
}

function displayBoard() {
    const gameOverWindow = document.querySelector('dialog');
    const winnerMessage = document.querySelector('#winner-message');
    const restartBtn = document.querySelector('#restart');
    const cells = document.querySelectorAll('.cell');
    const controller = GameController();
    currentPlayer = controller.getCurrentPlayer();
    for (let i = 1; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            eval("var row" + i + "col" + j + " = " + "document.querySelector('.row" + i + ".column" + j + "')");
        }
    }

    for (i = 0; i <= cells.length - 1; i++) {
        cells[i].textContent = '';
        cells[i].style.color = "gray";
        cells[i].addEventListener('mouseenter', mouseEnter);
        cells[i].addEventListener('mouseleave', mouseLeave);
        cells[i].addEventListener('mousedown', placeMarker);
    }
    function updateBoard(cell, marker) {
        cell.removeEventListener('mouseenter', mouseEnter);
        cell.removeEventListener('mouseleave', mouseLeave);
        cell.removeEventListener('mousedown', placeMarker);
        cell.textContent = marker;
        cell.style.color = "black";
    }
    function mouseEnter() {
        this.textContent = currentPlayer.marker;
    }
    function mouseLeave() {
        this.textContent = '';
    }
    function placeMarker() {
        currentPlayer = controller.getCurrentPlayer();
        controller.playTurn(this.dataset.row, this.dataset.column);
        updateBoard(this, currentPlayer.marker);
        checkGameOver();
        controller.switchPlayerTurn();
        currentPlayer = controller.getCurrentPlayer();
    }
    function restartGame() {
        gameOverWindow.close();
        restartBtn.removeEventListener("mousedown", restartGame);
        displayBoard();
    }
    function checkGameOver() {
        let gameOver = controller.getGameStatus();
        if (gameOver) {
            let tieGame = controller.getTieGameStatus();
            if (tieGame) {
                winnerMessage.textContent = "Tie Game!"
            } else {
                let winner = controller.getCurrentPlayer();
                winnerMessage.textContent = winner.marker + "'s win!";
            }
            gameOverWindow.show();
            restartBtn.addEventListener("mousedown", restartGame);
        }
    }
    return { updateBoard }
};

displayBoard();