window.onload = function() {
    document.addEventListener('keydown', changeDirection);
    setTimeout(game, speedSnake);
}
let canv = document.getElementById('gameSnake');
let canvCtx = canv.getContext('2d');
let counter = document.getElementById('score');

let score;
let speedSnake = 130;
let currentScore = 0;

let snakeX = 10;
let snakeY = 10;
let directionX = 0;
let directionY = 0;
let foodX = 12;
let foodY = 12; 
let maxStep = 20;
let snake = [];
let tail = 5;
let switchAudio = true;

function game() {
    console.log(speedSnake)
    setTimeout(game, speedSnake);
    
    snakeX += directionX;
    snakeY += directionY;

    if (snakeX < 0) snakeX = maxStep - 1;
    if (snakeY < 0) snakeY = maxStep - 1;
    if (snakeX > maxStep - 1) snakeX = 0;
    if (snakeY > maxStep - 1) snakeY = 0;

    // draw canvas
    canvCtx.fillStyle = 'black';
    canvCtx.fillRect(0,0, canv.width, canv.height);

    canvCtx.fillStyle = 'deepskyblue'; 
    for (let i = 0; i < snake.length; i++) {
        // draw snake
        canvCtx.fillRect(snake[i].x * maxStep, snake[i].y * maxStep, maxStep - 1,maxStep - 1);    
        // game over
        if (snake[i].x == snakeX && snake[i].y == snakeY) {            
            if (tail > 5) {  
                switchAudio = false;                
                audioEfect();
            }
            tail = 5;
            score = 0;  
            counter.innerHTML = score; 
            speedSnake = 130;  
            currentScore = 0;                         
        }
    }
    while (snake.length > tail) {
        snake.shift();
    } 
    snake.push({x:snakeX, y:snakeY});
    
    if (foodX == snakeX && foodY == snakeY) {
        tail++;
        score++;
        currentScore++;        
        counter.innerHTML = score;
        switchAudio = true;
        audioEfect();

        if (currentScore > 4) {
            changeSpeed();
        }
        createNewFood();
    }
    // draw food
    canvCtx.fillStyle = 'red';
    canvCtx.fillRect(foodX * maxStep, foodY * maxStep, maxStep - 2, maxStep - 2);
}

function changeDirection(evn) {
    if (evn.keyCode === 37 && !directionX) { // left
        directionX = -1; directionY = 0;
    }
    if (evn.keyCode === 38 && !directionY) { // top
        directionX = 0; directionY = -1;
    }
    if (evn.keyCode === 39 && !directionX) { // right  
        directionX = 1; directionY = 0;
    }
    if (evn.keyCode === 40 && !directionY) { // bottom
        directionX = 0; directionY = 1;
    }
}

function changeSpeed() {
    speedSnake -= 5;
    currentScore = 0;
}

function createNewFood() {
    foodX = Math.floor(Math.random() * maxStep);
    foodY = Math.floor(Math.random() * maxStep);
    let checkFoodPosition = snake.some((item) => item.x == foodX && item.y == foodY);
    if (checkFoodPosition) return createNewFood();
}

function audioEfect() {
    let audio = document.createElement("AUDIO");
    document.body.appendChild(audio);
    if (switchAudio) {
        audio.src = "sound_efect/chewing.mp3";
        audio.play()
    }
    if (!switchAudio) {
        audio.src = "sound_efect/game-over.wav";
        audio.play()
    }
}








