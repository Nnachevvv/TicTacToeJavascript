const ROWS_COLS_LENGTH = 3;


 function  checkForWin(xPos, yPos, symbol)
{

      matrix[xPos][yPos] = symbol;
    return checkCol(xPos, yPos, symbol) || checkRow(xPos, yPos, symbol) || checkDiagonal(symbol) ||checkAntiDiagonal(symbol);
}


function checkCol(xPos,yPos,symbol)
{
    for (let i = 0; i < ROWS_COLS_LENGTH; i++) {
        if(matrix[i][yPos] !== symbol)
        {
            return false;
        }
    }
    return true;
}


function checkRow (xPos,yPos,symbol)
{
    for (let i = 0; i < ROWS_COLS_LENGTH; i++) {
        if(matrix[xPos][i] !== symbol) {
            return false;
        }
    }
    return true;
}


function checkDiagonal(symbol)
{
    for (let i = 0; i < ROWS_COLS_LENGTH; i++) {
        if(matrix[i][i] !== symbol) {
            return false;
        }
    }
    return true;
}



function checkAntiDiagonal(symbol)
{
    for (let i = 0; i < ROWS_COLS_LENGTH; i++) {

        if(matrix[i][ROWS_COLS_LENGTH-i-1] !== symbol) {
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

