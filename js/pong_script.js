var canvas;
var canvasContext;
var ballX,
    ballY;
var ballSpeedX = 8,
    ballSpeedY = Math.floor((Math.random() - .5) * Math.floor(4));
var trailX = [0,0,0,0,0,0,0,0];
var trailY = [0,0,0,0,0,0,0,0];
var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;


var showWinScreen = false;
var firstGameStarted = false;

var ballRadius = 10;
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 75;
const PADDLE_THICKNESS = 10;
const PADDLE_COLOR = 'rgb(255,100,0)';
const BALL_COLOR = 'rgb(255,100,0)';

// Handler for a mouse click
function handleMouseClick()
{
    if (!firstGameStarted)
    {
        firstGameStarted = true;
    }

    if(showWinScreen)
    {
        player1Score = 0;
        player2Score = 0;
        showWinScreen = false;
    }
}

// Calculates the mouse position inside the canvas
function calculateMousePosition(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top;
    return{
        x:mouseX,
        y:mouseY
    };
}

window.onload = function() {
    canvas = document.getElementById('GameCanvas');
    canvasContext = canvas.getContext('2d');

    //set initial ball location
    ballX = canvas.width/2;
    ballY = canvas.height/2;

    var framesPerSecond = 60;
    setInterval(function(){
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove',
            function(evt){
                    var mousePos = calculateMousePosition(evt);
                    paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
            });
}

function drawNet() {
    for (var i = 0; i < canvas.height; i+= 40)
    {
        colorRect(canvas.width/2 - 1, i, 2, 20, 'rgba(200,200,200, .5)');
    }
}

function drawEverything(){
    //gives screen radial gradient background
    var grd = canvasContext
        .createRadialGradient(canvas.width/2,canvas.height/2,5,canvas.width/2,canvas.height/2,400);
    grd.addColorStop(0,'rgb(14,94,120)');
    grd.addColorStop(1,'rgb(10,41,51)');
    colorRect(0, 0, canvas.width, canvas.height, grd);

    //set font and size
    canvasContext.font = "30px Arial";

    //set glow effect
    canvasContext.shadowBlur = 15;
    canvasContext.shadowColor = PADDLE_COLOR;

    if(!firstGameStarted)
    {
        canvasContext.fillStyle = 'white';
        canvasContext.fillText("Click To Test Your Skill", 250, 400);
    }

    if(showWinScreen)
    {
        canvasContext.fillStyle = 'white';


        if(player1Score >= WINNING_SCORE)
        {
            canvasContext.fillText("YOU ARE A", 125, 200);
            canvasContext.fillText("TRUE MASTER", 100, 250);
        }

        if(player2Score >= WINNING_SCORE)
        {
            canvasContext.fillText("YOU ARE WEAK", 92, 200);
            canvasContext.fillText("AND HAVE FAILED", 78, 250);
        }

        canvasContext.fillText("Click To Play Again", 80, 400);
    }

    drawNet();

    //left player paddle
    colorRect(10, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, PADDLE_COLOR);

    //computer paddle
    colorRect(canvas.width - (10 + PADDLE_THICKNESS), paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, PADDLE_COLOR);

    //draws ball trail
    var ballSize = 9;
    var trailOpacity = .8;
    for(var i = 0; i < trailX.length; i++){
        colorTrail(trailX[i], trailY[i], ballSize, 'rgba(255,255,255,'+ trailOpacity + ')');
        ballSize = ballSize - .5;
        trailOpacity = trailOpacity - .1;
    }

    //calculate trail for next frame
    for(var i = trailX.length - 1; i > 0; i--){
        trailX[i] = trailX[i-1];
        trailY[i] = trailY[i-1];
    }
    trailX[0] = ballX;
    trailY[0] = ballY;


    //draw score
    canvasContext.fillStyle = 'white';
    canvasContext.fillText("YOU     " + player1Score, 142, 100);
    canvasContext.fillText("ENEMY     " +player2Score, canvas.width - 270, 100);

     //draws ball
    colorCircle(ballX, ballY, ballRadius, BALL_COLOR);
}

function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

function colorCircle(centerX, centerY, radius, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function colorTrail(centerX, centerY, radius, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

//reset ball to middle of canvas
function ballReset()
{
    if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE)
    {
        showWinScreen = true;
    }

    ballX = canvas.width/2;
    ballY = canvas.height/2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = Math.floor((Math.random() - .5) * Math.floor(4));

}


function computerMovement()
{
    var paddle2YCenter = paddle2Y + PADDLE_HEIGHT/2;

    if(paddle2YCenter < ballY - 35)
    {
        paddle2Y = paddle2Y + 9;
    }
    else if(paddle2YCenter > ballY + 35)
    {
        paddle2Y = paddle2Y - 9;
    }
}

function moveEverything(){

    // if the game is not active don't move anything.
    if(showWinScreen)
    {
        return;
    }

    if(!firstGameStarted)
    {
        return;
    }

    computerMovement();

    //move ball
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    //change direction X
    if(ballX < (10 + PADDLE_THICKNESS))
    {
        if ((ballY + ballRadius) > paddle1Y && (ballY - ballRadius) < paddle1Y + PADDLE_HEIGHT)
        {
            ballSpeedX = -ballSpeedX;

            //Change vertical speed based on how close to edge ball is hit
            var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * .3;
        }
        else
        {
            player2Score++; //Must count score before resetting ball
            ballReset();
        }
    }

    if(ballX > (canvas.width - 10 - PADDLE_THICKNESS))
    {
        if ((ballY + ballRadius) > paddle2Y && (ballY - ballRadius) < paddle2Y + PADDLE_HEIGHT)
        {
            ballSpeedX = -ballSpeedX;

            //Change vertical speed based on how close to edge ball is hit
            var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * .3;
        }
        else
        {
            player1Score++; //Must count score before resetting ball
            ballReset();
        }
    }

    //change direction Y
    if(ballY < 10)
    {
        ballSpeedY = -ballSpeedY;
    }
    if(ballY > canvas.height-10)
    {
        ballSpeedY = -ballSpeedY;
    }
}


