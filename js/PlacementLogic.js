function ColumnClick(e) {

    let ColumnID = e.currentTarget.classList[0];

    //If its player 1s turn
    if (Player_1_Turn) {

        //Make it other persons turn
        Player_1_Turn = false;
        //Make sure bot can move
        BotHasMoved = false;

        //Find lowest unfilled row
        FindLowestPos(ColumnID, 1);

        //Check if player one already won
        WinHandler();

        //If computer is opponent, make bot move after player 1 move
        if (!(BotHasMoved) && Computer_Opponent && !(GameOver)) {
            setTimeout(() => {

                //Make it other persons turn
                Player_1_Turn = true;

                //BotPlacement();
                if (!(BotHasMoved)) {
                    BotAI();
                }

                //Check if player one already won
                WinHandler();
            }, 100);
        }
        
    } else if (!(Computer_Opponent)) {

        //If its player 2s turn

        //Make it other persons turn
        Player_1_Turn = true;

        //Find lowest unfilled row
        FindLowestPos(ColumnID, 2);

    }

    if (!(GameOver)) {
        //Check for if anyone won
        WinHandler();
    }
}

function FindLowestPos(ColumnID, Player) {
    
    //Determine colors and value of object
    let Player_Color;
    let Player_Value;

    if (Player == 1) {

        Player_Color = '#FFB900';
        Player_Value = "Player_1";

    } else if (Player == 2) {

        Player_Color = '#E81123';
        Player_Value = "Player_2";

    }

    //Get the number of the col not the name
    let ColumnPos = ColumnID.split('-').pop();

    //Declare variable of piece to fill
    let PieceFound = false;

    //Search through board pieces and find highest Row with matching col
    for (let i = 6; i >= 1; --i) {

        //Set piece to fill
        Board_Pieces.find((Piece, index) => {

            //If Columns match, if row matches iteration to for loop, and if value isnt filled return true
            if (Piece.Col == ColumnPos && Piece.Row == i && Piece.Value == "") {
                
                //Set piece to have filled color
                $('.Col:nth-child(' + ColumnPos + ') .Piece:nth-child(' + (Piece.Row) + ')').css({ backgroundColor: Player_Color});
                
                //Change value property of piece
                Piece.Value = Player_Value;

                //Allow break to happen
                PieceFound = true;

                //Exit find
                return true;
            } 

        });

        //make sure only one piece is set to be filled
        if (PieceFound) {
            break;
        }

    }

    if (!(PieceFound)) {
        Player_1_Turn = !(Player_1_Turn);

        if (Computer_Opponent) {
            BotHasMoved = !(BotHasMoved);
        }
    }

}