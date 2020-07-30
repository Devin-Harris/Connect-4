
function WinHandler() {

    //Reset Arrays
    PossibleWinIndexs = [];
    PossibleBlockIndexs = [];

    //Check for wins in all directions
    HorizontalWinCheck();
    VerticalWinCheck();
    DiagonalWinCheck();

}

function HorizontalWinCheck() {
 
    //Initialize the score (if one equals 4 ever that player won)
    let Player_1_Score;
    let Player_2_Score;

    //Find player filled pieces and test horizontally from that piece
    for (let i = 0; i < 4; ++i) {

        //check each column in row
        for (let j = 0; j < 7; ++j) {
            
            //Reset score counter after the next row being checked starts
            Player_1_Score = 0;
            Player_2_Score = 0;

            //check 3 spaces right of current index and current index
            for (let k = 0; k < 4; ++k) {
                
                //Dont exceed the length of the array
                if ((6 * i) + j + (6 * k) < Board_Pieces.length) {

                    
                    //Test for the next 3 positions of the initial filled piece and if another piece is filled increment the player score
                    if (Board_Pieces[(6 * i) + j + (6 * k)].Value == 'Player_1') {
                        ++Player_1_Score;
                    }
                    if (Board_Pieces[(6 * i) + j + (6 * k)].Value == 'Player_2') {
                        ++Player_2_Score;
                    }


                    //If any scores exceed 3 then 4 pieces in a row are the same color meaning that player won
                    if (Player_1_Score > 3) {
                        WonGame(1);
                    }
                    if (Player_2_Score > 3) {
                        WonGame(2);
                    }

                    //If any scores are 3 then a block or win can be made
                    if (Player_2_Score == 3) {
                        for (let k = 0; k < 4; ++k) {
                            if ((6 * i) + j + (6 * k) < Board_Pieces.length) {
                                if (Board_Pieces[(6 * i) + j + (6 * k)].Value == "") {
                                    PossibleWinIndexs.push((6 * i) + j + (6 * k));
                                }
                            }
                        }
                    }
                    if (Player_1_Score == 3) {
                        for (let k = 0; k < 4; ++k) {
                            if ((6 * i) + j + (6 * k) < Board_Pieces.length) {
                                if (Board_Pieces[(6 * i) + j + (6 * k)].Value == "") {
                                    PossibleBlockIndexs.push((6 * i) + j + (6 * k));
                                }
                            }
                        }
                    }

                }
            }

        }

    }

}

function VerticalWinCheck() {

    //Initialize the score (if one equals 4 ever that player won)
    let Player_1_Score;
    let Player_2_Score;

    //Find player filled pieces and test vertically from that piece
    for (let i = 0; i < 3; ++i) {

        //check each row in column
        for (let j = 0; j < 7; ++j) {

            //Reset score counter after the next row being checked starts
            Player_1_Score = 0;
            Player_2_Score = 0;

            //check 3 spaces up of current index and current index
            for (let k = 0; k < 4; ++k) {

                //Dont exceed the length of the array
                if ((6 * j) + i + k < Board_Pieces.length) {


                    //Test for the next 3 positions of the initial filled piece and if another piece is filled increment the player score
                    if (Board_Pieces[(6 * j) + i + k].Value == 'Player_1') {
                        ++Player_1_Score;
                    }
                    if (Board_Pieces[(6 * j) + i + k].Value == 'Player_2') {
                        ++Player_2_Score;
                    }


                    //If any scores exceed 3 then 4 pieces in a row are the same color meaning that player won
                    if (Player_1_Score > 3) {
                        WonGame(1);
                    }
                    if (Player_2_Score > 3) {
                        WonGame(2);
                    }

                    //If any scores are 3 then a block or win can be made
                    if (Player_2_Score == 3) {
                        for (let k = 0; k < 4; ++k) {
                            if ((6 * j) + i + k < Board_Pieces.length) {
                                if (Board_Pieces[(6 * j) + i + k].Value == "") {
                                    PossibleWinIndexs.push((6 * j) + i + k);
                                }
                            }
                        }
                    }
                    if (Player_1_Score == 3) {
                        for (let k = 0; k < 4; ++k) {
                            if ((6 * j) + i + k < Board_Pieces.length) {
                                if (Board_Pieces[(6 * j) + i + k].Value == "") {
                                    PossibleBlockIndexs.push((6 * j) + i + k);
                                }
                            }
                        }
                    }

                }
            }

        }

    }
}

function DiagonalWinCheck() {


    Board_Pieces.forEach((Piece, Index) => {

        //If above middle row
        if (Piece.Row <= 3) {

            if (Piece.Col < 4) {

                //if left of middle column
                RightCheck(Index, 'down');

            } else if (Piece.Col == 4) {

                //if in middle column
                RightCheck(Index, 'down');
                LeftCheck(Index, 'down');

            } else if (Piece.Col > 4) {

                //if right of middle column
                LeftCheck(Index, 'down');

            }


        } else if (Piece.Row >= 4) {
            //If below middle row

            if (Piece.Col < 4) {
                //if left of middle column
                RightCheck(Index, 'up');

            } else if (Piece.Col == 4) {

                //if in middle column
                RightCheck(Index, 'up');
                LeftCheck(Index, 'up');


            } else if (Piece.Col > 4) {

                //if right of middle column
                LeftCheck(Index, 'up');

            }

        }

    });

}

//Diagonal Checks Reused code

function RightCheck(Index, Dir) {

    let Increments = 0;
    //Initialize the score (if one equals 4 ever that player won)
    let Player_1_Score;
    let Player_2_Score;

    //Reset score counter after the next row being checked starts
    Player_1_Score = 0;
    Player_2_Score = 0;

    //check 3 spaces up of current index and current index
    for (let k = 0; k < 4; ++k) {

        //Make sure adding correct amount when indexing
        if (Dir == "up") {
            Increments = Index + (5 * k);
        } else if (Dir == "down") {
            Increments = Index + (7 * k);
        }

        //Dont exceed the length of the array
        if (Increments < Board_Pieces.length) {

            //Test for the next 3 positions of the initial filled piece and if another piece is filled increment the player score
            if (Board_Pieces[Increments].Value == 'Player_1') {
                ++Player_1_Score;
            }
            if (Board_Pieces[Increments].Value == 'Player_2') {
                ++Player_2_Score;
            }

            //If any scores exceed 3 then 4 pieces in a row are the same color meaning that player won
            if (Player_1_Score > 3) {
                WonGame(1);
            }
            if (Player_2_Score > 3) {
                WonGame(2);
            }

            //If any scores are 3 then a block or win can be made
            if (Player_2_Score == 3) {
                for (let k = 0; k < 4; ++k) {

                    //Make sure adding correct amount when indexing
                    if (Dir == "up") {
                        Increments = Index - (7 * k);
                    } else if (Dir == "down") {
                        Increments = Index - (5 * k);
                    }

                    if (Increments < Board_Pieces.length && Increments >= 0) {
                        if (Board_Pieces[Increments].Value == "") {
                            PossibleWinIndexs.push(Increments);
                        }
                    }
                }
            }
            if (Player_1_Score == 3) {
                for (let k = 0; k < 4; ++k) {

                    //Make sure adding correct amount when indexing
                    if (Dir == "up") {
                        Increments = Index - (7 * k);
                    } else if (Dir == "down") {
                        Increments = Index - (5 * k);
                    }

                    if (Increments < Board_Pieces.length && Increments >= 0) {
                        if (Board_Pieces[Increments].Value == "") {
                            PossibleBlockIndexs.push(Increments);
                        }
                    }
                }
            }

        }
    }

}

function LeftCheck(Index, Dir) {

    let Increments = 0;
    //Initialize the score (if one equals 4 ever that player won)
    let Player_1_Score;
    let Player_2_Score;

    //Reset score counter after the next row being checked starts
    Player_1_Score = 0;
    Player_2_Score = 0;

    //check 3 spaces up of current index and current index
    for (let k = 0; k < 4; ++k) {

        //Make sure adding correct amount when indexing
        if (Dir == "up") {
            Increments = Index - (7 * k);
        } else if (Dir == "down") {
            Increments = Index - (5 * k);
        }

        //Dont exceed the length of the array
        if (Increments >= 0) {

            //Test for the next 3 positions of the initial filled piece and if another piece is filled increment the player score
            if (Board_Pieces[Increments].Value == 'Player_1') {
                ++Player_1_Score;
            }
            if (Board_Pieces[Increments].Value == 'Player_2') {
                ++Player_2_Score;
            }

            //If any scores exceed 3 then 4 pieces in a row are the same color meaning that player won
            if (Player_1_Score > 3) {
                WonGame(1);
            }
            if (Player_2_Score > 3) {
                WonGame(2);
            }

            //If any scores are 3 then a block or win can be made
            if (Player_2_Score == 3) {
                for (let k = 0; k < 4; ++k) {

                    //Make sure adding correct amount when indexing
                    if (Dir == "up") {
                        Increments = Index - (7 * k);
                    } else if (Dir == "down") {
                        Increments = Index - (5 * k);
                    }

                    if (Increments < Board_Pieces.length) {
                        if (Board_Pieces[Increments].Value == "") {
                            PossibleWinIndexs.push(Increments);
                        }
                    }
                }
            }
            if (Player_1_Score == 3) {
                for (let k = 0; k < 4; ++k) {

                    //Make sure adding correct amount when indexing
                    if (Dir == "up") {
                        Increments = Index - (7 * k);
                    } else if (Dir == "down") {
                        Increments = Index - (5 * k);
                    }

                    if (Increments < Board_Pieces.length) {
                        if (Board_Pieces[Increments].Value == "") {
                            PossibleBlockIndexs.push(Increments);
                        }
                    }
                }
            }
        }
    }

}

//Game Won Funcitons
function WonGame(Player) {

    //Stop the double log of a player 1 win
    GameOver = true;
    //Computer_Opponent = false;
    let PlayerName = "";

    if (Player == 1) {
        if (Player1 == "") {
            PlayerName = "Player-1";
        } else {
            PlayerName = Player1;
        }
    } else if (Player == 2) {
        if (Player2 == "") {
            PlayerName = "Player-2";
        } else {
            PlayerName = Player2;
        }
    }

    //Setup winning Screen and show it
    $('#Winning_Screen').css({display: 'flex'});
    $('#Winning_Screen h1').text(PlayerName + " wins!");
    //$('#Winning_Btn_Container').css({ display: 'flex' }).width($('#Winning_Screen h1').width());
    

    //Turn off click events of columns
    $('.Col').off();


}