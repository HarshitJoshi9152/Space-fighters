const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d")

let width = canvas.width = 800;
let height = canvas.height = 600;

// Game Variables
const players = [];
const ui = new UI(ctx);

(function load(){
    // code to do startup things like displaying menu loading sprites etc
    players.push(new Player("harshit",ctx))
    players[0].ready();
})()

// FPS counter variables
let frameCounter = 0;
let framesPerSec = 0;
let framesThisSecond = 0;
let currentFrameTime = null;

(function __loop__(time = null)
{
    // console.log(ctx.fillStyle) clean here
    updateFPS();
    ctx.fillRect(0, 0, width, height); // background fill
    drawFPSCounter();

    // update and render entities
    for (let p of players){
        p.compute(); // compute method calls -> update and render methods if the object is ready
    }

    requestAnimationFrame(__loop__,time);
})()



function drawFPSCounter() {
    ctx.strokeStyle = "white";
    ctx.strokeText(framesPerSec, 10, 10);
}

function updateFPS(){
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
}
