//Declare global empty array
let Board_Pieces = [];
let Player_1_Turn = true;
let Computer_Opponent = false;
let GameOver = false;
let Bot_Move_Check = false;
let BotHasMoved = false;

//On document load
$(document).ready(() => {

    //Hide Board
    $('#Game_Container').slideUp();
    $('#Players').slideUp();

    Player_1_Turn = true;
    
    //Check whether person is playing with another player or wants to play bot
    $('#PlayerBtn-2').click(() => {
        StartGame(2);
    });

    $('#PlayerBtn-1').click(() => {
        Computer_Opponent = true;
        StartGame(1);
    });

    $('#PlayAgainBtn').click(() => {

        //Hide Winning screen
        $('#Winning_Screen').slideUp();

        //Reinitialize variables
        Player_1_Turn = true;
        GameOver = false;
        Bot_Move_Check = false;
        BotHasMoved = false;

        //Start same game as first game
        if (Computer_Opponent) {
            StartGame(1);
        } else {
            StartGame(2);
        }
    });

    $('#HomeAgainBtn').click(() => {

        //Hide Winning screen
        $('#Winning_Screen').slideUp();

        //Hide Board
        $('#Game_Container').slideUp();
        $('#Players').slideUp();

        //Show Intro Screen
        $('#Intro_Screen').slideDown();

        //Reinitialize variables
        Player_1_Turn = true;
        GameOver = false;
        Bot_Move_Check = false;
        BotHasMoved = false;
        Computer_Opponent = false;

    });

});

//Start Game Function
function StartGame(Player_Count) {

    //Initialize board to empty
    Board_Pieces = [];

    //Hide Intro Screen
    $('#Intro_Screen').slideUp();

    //Make sure gameboard is empty
    $('.Col').empty();

    //Load different functions based on playercount
    if (Player_Count == 2) {

        //Get both players names
        AskForPlayersNames();

    } else if (Player_Count == 1) {

        //Load Bot
        SetupBotPlayer2();

    }

    //Hover Checker over column when you move mouse
    $('.Col').mousemove((e) => {
        let currCol = e.currentTarget.classList[0];

        if (Player_1_Turn) {

            //Hide Player 2 hover
            $('#Player2_Hover').slideUp();

            //Show player 1 hover
            $('#Player1_Hover').slideDown().css({
                left: $('.' + currCol).position().left,
            });

        } else {
            //Hide Player 1 hover
            $('#Player1_Hover').slideUp();

            //Show player 2 hover
            $('#Player2_Hover').slideDown().css({
                left: $('.' + currCol).position().left,
            });
        }
    });

    //Loads the board pieces
    LoadBoard();

    //Check if player one places a piece
    $('.Col').click((e) => {
        ColumnClick(e);
    });

}

//Declare players names variables globally
let Player1 = "";
let Player2 = "";

function AskForPlayersNames() {

    //Prompt for player names
    Player1 = prompt("Please enter Player-1's name:");
    //Make sure name is filled
    while (Player1 == "") {
        Player1 = prompt("Error! Please enter a valid name for Player-1:");
    }

    Player2 = prompt("Please enter Player-2's name:");
    //Make sure name is filled
    while (Player2 == "") {
        Player2 = prompt("Error! Please enter a valid name for Player-2:");
    }

    //Fill Players h2 tags to names
    $('#Player1 span').html(Player1);
    $('#Player2 span').html(Player2);

}

function SetupBotPlayer2() {

    //Prompt for player names
    Player1 = prompt("Please enter your name:");
    //Make sure name is filled
    while (Player1 == "") {
        Player1 = prompt("Error! Please enter a valid name:");
    }

    Player2 = 'Computer';

    //Fill Players h2 tags to names
    $('#Player1 span').html(Player1);
    $('#Player2 span').html(Player2);
}

function LoadBoard() {

    //Show players
    $('#Players').slideDown();

    //Fill Players div tags to colors
    $('#Player1 div').css({
        backgroundColor: '#FFB900',
    }).height($('#Player1').height()).width($('#Player1').height());

    $('#Player2 div').css({
        backgroundColor: '#E81123',
    }).height($('#Player2').height()).width($('#Player2').height());

    //Columns
    for (let i = 1; i <= 7; ++i) {
        //Rows
        for (let j = 1; j <= 6; ++j) {
            let New_Piece = {Col: i, Row: j, Index: (Board_Pieces.length), Value: ""};
            Board_Pieces.push(New_Piece);
        }
    }
    
    //Loop through board pieces and add them to screen
    Board_Pieces.forEach((Piece) => {

        let Row_Piece = document.createElement('div'); 
        let Col_Var = "";
        
        //add corresponding piece to correct column
        switch (Piece.Col) {
            case 1:
                Col_Var = "Col-1";
                break;
            case 2:
                Col_Var = "Col-2";
                break;
            case 3:
                Col_Var = "Col-3";
                break;
            case 4:
                Col_Var = "Col-4";
                break;
            case 5:
                Col_Var = "Col-5";
                break;
            case 6:
                Col_Var = "Col-6";
                break;
            case 7:
                Col_Var = "Col-7";
                break;
            default: 
                break;
        }

        //Add classes to items so located them for style change is easier
        Row_Piece.classList.add('Row-' + Piece.Row);
        Row_Piece.classList.add("Piece-" + Piece.Index);
        Row_Piece.classList.add("Piece");

        //Append item to correct col
        document.querySelector('.' + Col_Var).append(Row_Piece);

        //Set width of board to height of board
        $('#Game_Container').width($('#Game_Container').height());

        //Show Board
        $('#Game_Container').slideDown();

        //Set Player Hover Pieces
        $('#Player1_Hover').css({
            backgroundColor: '#FFB900',
            width: $('.Col').width(),
            height: $('.Col').width(),
        })
        $('#Player2_Hover').css({
            backgroundColor: '#E81123',
            width: $('.Col').width(),
            height: $('.Col').width(),
        })

    });

    //Set pieces height to the width;
    $('.Piece').height($('.Piece').width());

}