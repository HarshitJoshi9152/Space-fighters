const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d")

let width = canvas.width = 800;
let height = canvas.height = 600;

// Game Variables
const players = [];
const ui = new UI(ctx);

(function()
{
    players.push(new Player("harshit",ctx))
    players[0].ready();
})()


// FPS counter variables
let frameCounter = 0;
let framesPerSec = 0;
let framesThisSecond = 0;
let currentFrameTime = null;

function __loop__(time = null)
{
    // frame counting
    if(currentFrameTime != Math.floor(Date.now()/1000)){
        currentFrameTime = Math.floor(Date.now()/1000);
        frameCounter++;
        framesPerSec = framesThisSecond;
        framesThisSecond = 0;
    }
    else
    {
        frameCounter++;
        framesThisSecond++;
    }

    // fill/clear screen for new frame
    ctx.fillRect(0, 0, width, height);
    
    // draw FPS
    ctx.strokeStyle = "white";
    ctx.strokeText(framesPerSec, 10, 10);

    // render Players
    for (let p of  players){
        p.update();
        for (let b of p.bullets){
            b.update();
            b.render();
        }
        p.render();
    }
    ui.render();
    requestAnimationFrame(__loop__,time);
}

__loop__();

// i didnt need to code this lol 
function euclid_dist({x1,y1},{x2,y2})
{
    // upto how many decimals should we consider accuracy
    // debugger;
    return Math.abs(
        Math.sqrt(
            ((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1))
        )
    )
}

function drawBox(x, y, width, height, value, progressBar=false)
{
    // value should always be out of 100
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.stroke()
    ctx.closePath();
    if(progressBar)
    {
        ctx.beginPath();
        ctx.rect(x, y, value, height);
        ctx.fill();
        ctx.closePath();
    }
    else
        ctx.strokeText(value, x, y);
}