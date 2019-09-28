
let player = [{
    symbol: "O",
    score: 0,
    turn: true,
    },
    {
        symbol:"X",
        turn:false,
        score:0,
    }
    ];

function clickTrigger(e)
{
        let x = document.getElementById(e.id);
        document.getElementById(e.id).style.pointerEvents = 'none';
        if(player[0].turn == true)
        {
            playTurn( x, e, player[0], player[1]);
        }
        else{
            playTurn( x, e, player[1], player[0]);
        }

}


function playTurn(x, e, currentPlayer, secondPlayer) {
    x.innerHTML = currentPlayer.symbol;
    currentPlayer.turn = false;
    secondPlayer.turn = true;
     if(checkForWin(e.parentNode.rowIndex,e.cellIndex,currentPlayer.symbol))
     {
            deleteValuesInTable();
            initMatrix();
            ++currentPlayer.score;
            writeScoreInHtml();
     }
     else if(checkDraw())
     {
            deleteValuesInTable();
            initMatrix();
     }
}


function writeScoreInHtml() {
    document.getElementById("firstPlayerScore").innerHTML = player[0].score;
    document.getElementById("secondPlayerScore").innerHTML = player[1].score;

}


function deleteValuesInTable() {
    let table = document.getElementById("table");

    for (let i = 0; i < ROWS_COLS_LENGTH; i++) {

        for (let j = 0; j < ROWS_COLS_LENGTH; j++) {
            table.rows[i].cells[j].innerHTML = null;
            let id = table.rows[i].cells[j].id;
            document.getElementById(id).style.pointerEvents = 'auto';
        }
    }
}


const ROWS_COLS_LENGTH = 3;


 function  checkForWin(xPos, yPos, symbol)
{
    matrix[xPos][yPos] = symbol;
    return checkCol(xPos, yPos, symbol) || checkRow(xPos, yPos, symbol) || checkDiagonal(symbol) ||checkAntiDiagonal(symbol);
}


function checkCol(xPos,yPos,symbol)
{
    for (let i = 0; i < ROWS_COLS_LENGTH; i++) {
        if(matrix[i][yPos] != symbol)
        {
            return false;
        }
    }
    return true;
}


function checkRow (xPos,yPos,symbol)
{
    for (let i = 0; i < ROWS_COLS_LENGTH; i++) {
        if(matrix[xPos][i] != symbol)
        {
            return false;
        }
    }
    return true;
}


function checkDiagonal(symbol)
{
    for (let i = 0; i < ROWS_COLS_LENGTH; i++) {
        if(matrix[i][i] != symbol)
        {
            return false;
        }
    }
    return true;
}


function checkAntiDiagonal(symbol)
{
    for (let i = 0; i < ROWS_COLS_LENGTH; i++) {
        if(matrix[i][ROWS_COLS_LENGTH-i-1] != symbol)
        {
            return false;
        }
    }
    return true;
}


function checkDraw()
{
    for(let i = 0; i <ROWS_COLS_LENGTH; i++)
    {
        for (let j = 0; j < ROWS_COLS_LENGTH; j++) {
            if(!matrix[i][j])
            {
                return false;
            }
        }
    }
    return true;
}


let matrix = [];
initMatrix();

function  initMatrix() {
    for (let i = 0; i < ROWS_COLS_LENGTH; i++) {
        matrix[i] = new Array(ROWS_COLS_LENGTH);

    }
}


