let $canvas = document.getElementById("myCanvas");
let ctx = $canvas.getContext('2d');
let x = $canvas.width/2;
let y = $canvas.height - 30;
let score = 0;
let start = confirm("Press OK to start the game.");
if(start == false) {
    alert("Goodbye.");
    document.location.reload();
}

let dx = 2;
let dy = -2;

let ballRadius = 10;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = ($canvas.width-paddleWidth)/2;

let rightPressed = false;
let leftPressed = false;
document.addEventListener('keydown', keydown); // 키보드 왼쪽
document.addEventListener('keyup', keyup); // 키보드 오른쪽
document.addEventListener("touchstart", touchstartHandler);
document.addEventListener("touchend", touchendHandler);

function touchstartHandler(e) {
    let touchX = e.changedTouches[0].clientX;
    let touchY = e.changedTouches[0].clientY;
    if(touchX >= 0 && touchX <= $canvas.width / 2) leftPressed = true;
    else if(touchX > $canvas.width/2 && touchX <= $canvas.width) rightPressed = true;
}
function touchendHandler(e) {
    rightPressed = false;
    leftPressed = false;
}



function keydown(e) {
    // console.log(e.keyCode);
    if(e.keyCode == 39 || e.keyCode == 68) {
        rightPressed = true;
    } else if(e.keyCode == 37 || e.keyCode == 65) {
        leftPressed = true;
    }
}
function keyup(e) {
    if(e.keyCode == 39 || e.keyCode == 68) {
        rightPressed = false;
    } else if(e.keyCode == 37 || e.keyCode == 65) {
        leftPressed = false;
    }
}

function writeText() {
    ctx.beginPath();
    ctx.font = "bold 20px monospace";
    ctx.fillStyle = "black";
    ctx.fillText("Score :", 20, 30);
    ctx.fillText(score, 110, 30);
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX,$canvas.height-paddleHeight,paddleWidth, paddleHeight);
    ctx.fillStyle = "#8a0a8a";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath(); // 새로운 그림 시작
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#1EA4FF";
    ctx.fill();
    ctx.closePath(); // 그림 그리기 마치기
}

function draw() {
    ctx.clearRect(0,0,$canvas.width, $canvas.height);
    drawBall();
    drawPaddle();
    writeText();
    if(x + dx > $canvas.width-ballRadius || x + dx < ballRadius) { // 좌우 튕기기
        dx = -dx;
    }
    if(y + dy < ballRadius) { // 바닥 튕기기
        dy = -dy;
    } else if(y + dy > $canvas.height-ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            score++;
        } else {
            alert("GAME OVER\nScore : " + score);
            clearInterval(set_id);
            document.location.reload();
        }
    }

    if(rightPressed && paddleX < $canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
}


let set_id = setInterval(draw, 10);