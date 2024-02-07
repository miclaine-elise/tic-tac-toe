
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
    const board = Gameboard();
    console.table(board.getBoard());
    function playTurn(row, column) {
        console.log(currentPlayer.name + "'s turn");
        board.addMarker(row - 1, column - 1, currentPlayer.marker);
        console.table(board.getBoard());
        checkForWinner();
        checkForTie();
        console.log(currentPlayer);
    }
    const switchPlayerTurn = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };
    function checkForWinner() {
        const currentMarker = currentPlayer.marker;
        if (checkRows() || checkColumns() || checkDiagonals()) {
            gameover = true;
            console.log("Gameover" + currentPlayer.name + " wins");
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
        console.log(currentBoard);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (currentBoard[i][j] === '') {
                    return false;
                }
            }
        }
        console.log("Tie Game!")
        gameover = true;
        return true;
    }
    return { getCurrentPlayer, playTurn, switchPlayerTurn }
}

function displayBoard() {
    const controller = GameController();
    // const board = GameBoard();
    let currentPlayer = controller.getCurrentPlayer();
    for (let i = 1; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            eval("var row" + i + "col" + j + " = " + "document.querySelector('.row" + i + ".column" + j + "')");
        }
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
        controller.switchPlayerTurn();
        currentPlayer = controller.getCurrentPlayer();
    }
    const cells = document.querySelectorAll('.cell');
    for (i = 0; i <= cells.length - 1; i++) {
        if (cells[i].textContent === '') {
            cells[i].addEventListener('mouseenter', mouseEnter);
            cells[i].addEventListener('mouseleave', mouseLeave);
            cells[i].addEventListener('mousedown', placeMarker);
        }

    }
    return { updateBoard }
};

let startBtn = document.querySelector('button');
startBtn.addEventListener('click', function () {
    displayBoard();
});