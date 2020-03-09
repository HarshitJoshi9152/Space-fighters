const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d")

let width = canvas.width = 800;
let height = canvas.height = 600;

// Game Variables
const players = [];

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
        p.render();
    }
    requestAnimationFrame(__loop__,time);
}

__loop__();