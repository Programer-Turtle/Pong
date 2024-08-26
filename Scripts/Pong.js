var canvas = document.getElementById("game");
var context = canvas.getContext('2d');

var PlayerLeftUp = false, PlayerLeftDown = false, PlayerRightUp = false, PlayerRightDown = false
let grid = 16
let speed = 5
const PlayerLeftText = document.getElementById('1');
const PlayerRightText = document.getElementById('2');

let PlayerLeft = 
{
    Score:0,
    x:grid,
    y:canvas.height /2
}

let PlayerRight = 
{
    Score:0,
    x:canvas.width - grid*2,
    y:canvas.height /2
}

let Ball = 
{
    XSpeed:2,
    YSpeed:1.75,
    x:canvas.width/2,
    y:canvas.height/2,
    XVelocity:0,
    YVelocity:0
}

if (Math.round(Math.random())){
    Ball.XVelocity = Ball.XSpeed
    Ball.YVelocity = Ball.YSpeed
}
else {
    Ball.XVelocity = Ball.XSpeed * -1
    Ball.YVelocity = Ball.YSpeed * -1
}

function Draw(){
    context.clearRect(0,0,canvas.width,canvas.height)
    PlayerLeftText.innerText = PlayerLeft.Score
    PlayerRightText.innerText = PlayerRight.Score
    context.fillStyle = "white"
    context.fillRect(Ball.x, Ball.y, grid, grid) 
    context.fillStyle = "blue"
    context.fillRect(PlayerLeft.x, PlayerLeft.y, grid, grid*4)
    context.fillStyle = "red"
    context.fillRect(PlayerRight.x, PlayerRight.y, grid, grid*4)
}

//Get Key Input
document.addEventListener("keydown", function(event)
{
    if(event.key == "ArrowUp")
    {
        PlayerRightUp = true
    }
    if(event.key == "ArrowDown")
    {
        PlayerRightDown = true
    }
    if(event.key == "w")
    {
        PlayerLeftUp = true
    }
    if(event.key == "s")
    {
        PlayerLeftDown = true
    }
})

document.addEventListener("keyup", function(event)
{
    if(event.key == "ArrowUp")
    {
        PlayerRightUp = false
    }
    if(event.key == "ArrowDown")
    {
        PlayerRightDown = false
    }
    if(event.key == "w")
    {
        PlayerLeftUp = false
    }
    if(event.key == "s")
    {
        PlayerLeftDown = false
    }
})

function MoveBall(){
    Ball.x += Ball.XVelocity
    Ball.y += Ball.YVelocity

    if(Ball.y <= 0 || Ball.y >= (canvas.height - grid)){
        Ball.YVelocity *= -1
    }
    if(Ball.x <= (PlayerLeft.x + grid)){
        if((PlayerLeft.y - grid) <= Ball.y && Ball.y <= (PlayerLeft.y + (grid*4))){
            Ball.XVelocity *= -1
        }
    }
    if(Ball.x >= (PlayerRight.x - grid)){
        if((PlayerRight.y - grid) <= Ball.y && Ball.y <= (PlayerRight.y + (grid*4))){
            Ball.XVelocity *= -1
        }
    }

    if(Ball.x <= grid){
        Ball.x = canvas.width/2
        Ball.y = canvas.height/2
        Ball.XVelocity *= -1
        PlayerRight.Score += 1
    }
    else if(Ball.x >= (canvas.width - grid*2)){
        Ball.x = canvas.width/2
        Ball.y = canvas.height/2
        Ball.XVelocity *= -1
        PlayerLeft.Score += 1
    }
}

function Move()
{
    if(PlayerRightUp == true)
    {
        if(PlayerRight.y != 0)
        {
            PlayerRight.y -= speed
        }
    }
    if(PlayerRightDown == true)
    {
        if(PlayerRight.y +grid*4 <= canvas.height)
        {
            PlayerRight.y += speed
        }
    }
    if(PlayerLeftUp == true)
    {
        if(PlayerLeft.y != 0)
        {
            PlayerLeft.y -= speed
        }
    }
    if(PlayerLeftDown == true)
    {
        if(PlayerLeft.y +grid*4 <= canvas.height)
        {
            PlayerLeft.y += speed
        }
    }
}

Draw()

var i = setInterval(() => {
    Move()
    MoveBall()
    Draw()
}, 15)