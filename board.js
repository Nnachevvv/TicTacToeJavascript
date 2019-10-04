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

function evaluateRow()
{
     for (let row = 0; row<3; row++)
    {
        if (matrix[row][0]==matrix[row][1] &&
            matrix[row][1]==matrix[row][2])
        {
            if (matrix[row][0]== "X")
                return +10;
            else if (matrix[row][0]=="O")
                return -10;
        }
    }
     return 0;
}

function evaluateCol()
{
     for (let col = 0; col<3; col++)
    {
        if (matrix[0][col]==matrix[1][col] &&
            matrix[1][col]==matrix[2][col])
        {
            if (matrix[0][col]== "X")
                return +10;
            else if (matrix[0][col]=="O")
                return -10;
        }
    }
     return 0;
}

function evaluateDiagonals()
{
        if (matrix[0][0]==matrix[1][1] && matrix[1][1]==matrix[2][2])
    {
        if (matrix[0][0]=="X")
            return +10;
        else if (matrix[0][0]=="O")
            return -10;
    }

    if (matrix[0][2]==matrix[1][1] && matrix[1][1]==matrix[2][0])
    {
        if (matrix[0][2]=="X")
            return +10;
        else if (matrix[0][2]=="O")
            return -10;
    }
    return 0;
}


let matrix = [];
initMatrix();

function  initMatrix() {
    for (let i = 0; i < ROWS_COLS_LENGTH; i++) {
        matrix[i] = new Array(ROWS_COLS_LENGTH);

    }
}

