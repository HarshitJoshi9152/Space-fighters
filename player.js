class Player
{
    constructor(name, ctx)
    {
        // code
        this.name = name;
        this.ctx = ctx;
        this.x = 100;
        this.y = 100;
        this.isReady = false;
        this.keysPressed = {
            "ArrowRight":false,
            "ArrowLeft":false,
            "ArrowUp":false,
            "ArrowDown":false
        };
        this.someKeyIsPressed = false;
    }

    render = function()
    {
        this.ctx.save();
        this.ctx.strokeStyle = "#868676"
        this.ctx.beginPath();
        this.ctx.moveTo(this.x,this.y);
        this.ctx.lineTo(this.x + 50, this.y + 50/2);
        this.ctx.lineTo(this.x, this.y + 50);
        this.ctx.lineTo(this.x, this.y);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    }

    update = function()
    {
        // movement
        if(this.keysPressed.ArrowRight){
            this.x += 1;
        }
        if(this.keysPressed.ArrowLeft){
            this.x -= 1;
        }
        if(this.keysPressed.ArrowUp){
            this.y -= 1;
        }
        if(this.keysPressed.ArrowDown){
            this.y += 1;
        }
        // this one is for shooting
        if(this.keysPressed.shootingButton){
            this.shoot();
        }

        console.log(this.keysPressed);
    }

    ready = function() // shouldnt ready be called listen ? and we should have a new function called "move" for movement
    {
        this.isReady = true;
        // attach the event listeners for user input for movement and attack;

        document.addEventListener("keydown", (event)=>
        {
            // code....
            let {key, keyCode} = event;
            console.log(key);
            if(this.keysPressed.hasOwnProperty(key.toString()))
            {
                this.keysPressed[key] = true;
                this.someKeyIsPressed = true;
            }
        })
        document.addEventListener("keyup",(event) => 
        {
            let {key, keyCode} = event;

            if(this.keysPressed[key])
            {
                this.keysPressed[key] = false;
                this.someKeyIsPressed = false;
            }
        })
    }
}