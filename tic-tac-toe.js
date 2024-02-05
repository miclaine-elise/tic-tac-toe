
function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push("");
        }
    }
    return board;
}

function GameController() {
    const board = Gameboard();
    console.table(board);
    const players = [
        {
            name: "Player One",
            marker: "X"
        },
        {
            name: "Player Two",
            marker: "O"
        }];
    let currentPlayer = players[0];
    function playTurn(currentPlayer) {
        console.log(currentPlayer.name + "'s turn");
        column = prompt("Enter which column to place your marker.");
        row = prompt("Enter which row to place your marker.");
        board[row - 1][column - 1] = currentPlayer.marker;
        console.table(board);
    }
    const switchPlayerTurn = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };
    function checkForWinner(currentPlayer) {
        checkVertical(currentPlayer);
        function checkVertical(currentPlayer) {
            if (board[0][0] === currentPlayer.marker && board[1][0] === currentPlayer.marker && board[2][0] === currentPlayer.marker) {
                console.log("Gameover." + currentPlayer.name + "wins");
                gameover = true;
            }
        }
    }
    let gameover = false;
    const getCurrentPlayer = () => currentPlayer;
    while (gameover == false) {
        playTurn(currentPlayer);
        checkForWinner(currentPlayer);
        switchPlayerTurn();
    }

}
GameController();
