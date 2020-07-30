
//Initialize lowest column array
let ColumnLowest = [0, 0, 0, 0, 0, 0, 0];
let Pos_Above_Placement = 0;
let PossibleWinIndexs = [];
let PossibleBlockIndexs = [];

function BotAI() {

    let ColumnNumber = (Math.floor(Math.random() * 7) + 1);
    let ColumnID = "Column-" + ColumnNumber;
    let PieceAdded = false;
    BotHasMoved = false;
    let InvalidPreMove = true;
    let Must_Invalid_Move = false;
    let BadMovesCounter = 0;

    //Find lowest column for each column
    for (let i = 0; i < ColumnLowest.length; ++i) {

        PieceAdded = false;

        for (let j = 6; j >= 1; --j) {
            //Set lowest piece
            Board_Pieces.find((Piece, index) => {

                if ((Piece.Col == (i + 1)) && (Piece.Row == j) && (Piece.Value == "")) {

                    //add piece to array in corresponding column
                    ColumnLowest[i] = Piece.Row + (i * 6) - 1;

                    //Allow break to happen
                    PieceAdded = true;

                    //Exit find
                    return true;

                //If column is filled make top item lowest    
                } else if ((Piece.Col == (i + 1)) && (Piece.Row == 1)) {
                    //add piece to array in corresponding column
                    ColumnLowest[i] = (i * 6);
                }


            });

            //make sure only one piece is set to be filled
            if (PieceAdded) {
                break;
            }

        }
    }

    console.log(PossibleBlockIndexs);

    //Check all possible win indexs and see if they are in the column lowest array
    for (let i = 0; i < ColumnLowest.length; ++i) {
        for (let j = 0; j < PossibleWinIndexs.length; ++j) {
            if (PossibleWinIndexs[j] == ColumnLowest[i]) {
                ColumnID = "Column-" + (i + 1);
                BotHasMoved = true;
            }
        }
    }

    //If no win indexs in column lowest Check all possible block indexs and see if they are in the column lowest array
    if (!(BotHasMoved)) {
        for (let i = 0; i < ColumnLowest.length; ++i) {
            for (let j = 0; j < PossibleBlockIndexs.length; ++j) {
                if (PossibleBlockIndexs[j] == ColumnLowest[i]) {
                    ColumnID = "Column-" + (i + 1);
                    BotHasMoved = true;
                }
            }
        }
    }


    //If no block or win choose a random valid position to place in and check if we are allowing Player 1 to win
    if (!(BotHasMoved)) {

        BadMovesCounter = 0;
        
        while (InvalidPreMove && !(Must_Invalid_Move)) {

            //Make sure new move is set every time this loop runs
            ColumnNumber = (Math.floor(Math.random() * 7) + 1);

            //Generate a new column to fill that isnt out of board and isnt a move that will allow player 1 to win
            while ((ColumnLowest[ColumnNumber - 1] % 6) == 0) {
                ColumnNumber = (Math.floor(Math.random() * 7) + 1);
            }

            ++BadMovesCounter;

            //Edge case for if every column is filled and the only valid place is a move that will allow player 1 to win
            if (BadMovesCounter >= 200) {
                Must_Invalid_Move = true;
                break;
            } else {

                //Get position above current placement
                let Pos_Above_Placement = ColumnLowest[ColumnNumber - 1] - 1;
                //Check if Placement above could give player 1 the win
                InvalidPreMove = PreMoveCheck(Pos_Above_Placement);

            }

            ColumnID = "Column-" + ColumnNumber;
            BotHasMoved = true;
        }

    }

    //Fill Column as player 2
    FindLowestPos(ColumnID, 2);

    //Reset Arrays
    PossibleWinIndexs = [];
    PossibleBlockIndexs = [];
    
}

//Make sure our move doesnt allow player 1 to win
function PreMoveCheck(Pos_Above_Placement) {

    for (let i = 0; i < PossibleBlockIndexs.length; ++i) {
        if (PossibleBlockIndexs[i] == Pos_Above_Placement) {
            return true;
        }
    }

    return false;

}