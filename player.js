/*
HarshitJoshi9152 3/9/2020 3:55 pm

we have to make the movement like the movement of cars/plane in gta san andreas...
...the player should not be able to turn the plane my just pressing ArrowDown key once...
...in order to turn the player will have to turn from one of the sides over time

currently the player has no way to know how many bullets have been fired because we only have one gunPoint


IDEA
i am thinking of an unlockable perk that will allow us to instantly
change dir by double tapping 's' key but only if 
other attributes meet the requirements example velocity

we should implement the shoot function by taking into account the no.of
frames and not the time

OBS
we could have calculated this.base using the euclid_dist function oncy
 once and thus avoiding the unnecessary complexity of using 
 the pythagoras theorem, we could also have just used this.side (as 3rd option)

Gunpoints should be an array

TODO :: 1.calculate the velocity of the plane.
        2. add the velocity to the bulletSpeed when firing.
        3.rendering health bar.
        4. i dont think we need this.ctx.lineTo(this.x, this.y);

FIXED_ERROR :: there is a weird red traingle thing being rendered
         between the gunPoint and the bullets


*/


class Player
{
    constructor(name, ctx)
    {
        this.name = name;
        this.shootdelay = 100; // time in ms
        this.x = 100;
        this.y = 100;
        this.speed = 10;
        this.side = 50;
        this.median = this.calculate_base();
        this.health = 100;
        
        this.gunPoint = this.getGunPointLocation()
        this.isReady = false;
        this.keysPressed = {
            "ArrowRight":false,
            "ArrowLeft":false,
            "ArrowUp":false,
            "ArrowDown":false,
            "w":false,
            "a":false,
            "s":false,
            "d":false,
            " ":false
        };
        // BULLETS
        this.bullets = [];
        this.bulletSpeed = this.speed + 10;
        this.lastShootingTime;
        this.totalShotsThisInterval = 0;
        this.shotsAtOneTime = 1;

        this.someKeyIsPressed = false;
        this.ctx = ctx;
        this.totalShots = 0;
    }
    render = function()
    {
        this.ctx.save();
        this.ctx.fillStyle = "#787878";
        this.ctx.strokeStyle = "#868676";
        this.ctx.beginPath();
        this.ctx.moveTo(this.x,this.y);
        this.ctx.lineTo(this.x + this.side, this.y + this.side/2);
        this.ctx.lineTo(this.x, this.y + this.side);
        this.ctx.lineTo(this.x, this.y);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.restore();
    }

    update = function()
    {
        // movement
        if(this.keysPressed.ArrowRight || this.keysPressed.d){
            this.x += this.speed;
        }
        if(this.keysPressed.ArrowLeft || this.keysPressed.a){
            this.x -= this.speed;
        }
        if(this.keysPressed.ArrowUp || this.keysPressed.w){
            this.y -= this.speed;
        }
        if(this.keysPressed.ArrowDown || this.keysPressed.s){
            this.y += this.speed;
        }
        // this one is for shooting
        if(this.keysPressed[" "]){
            this.shoot();
            console.log(this.base);
        }

        // box collision detection
        if(this.x + this.side > width)
        {
            this.x = width - this.side - this.ctx.lineWidth;
        }
        if(this.x < 0)
        {
            this.x = 0 + this.ctx.lineWidth;
        }
        if(this.y + this.side > height)
        {
            this.y = height - this.side - this.ctx.lineWidth;
        }
        if(this.y < 0)
        {
            this.y = 0 + this.ctx.lineWidth;
        }
    }

    ready = function() // shouldnt ready be called listen ? and we should have a new function called "move" for movement
    {
        this.isReady = true;
        // attach the event listeners for user input for movement and attack;

        document.addEventListener("keydown", (event)=>
        {
            // code....
            let {key, keyCode} = event;
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

                if(key == " ")
                {
                    // reset first fire variable when firing has stopped
                    this.totalShotsThisInterval = 0;
                }
            }
        })
    }

    shoot = function()
    {

        // we could have also used the no. of frames !!
        this.gunPoint = this.getGunPointLocation();

        if(this.totalShotsThisInterval == 0)
        {
            this.lastShootingTime = Date.now();
            for(let i = 0; i < this.shotsAtOneTime; i++)
            {
                this.bullets.push(new Bullet(this.gunPoint, this.bulletSpeed, this.damage, this, this.ctx));
                this.totalShotsThisInterval += this.shotsAtOneTime;
                this.totalShots += this.shotsAtOneTime;
            }
        }
        else if(this.lastShootingTime + this.shootdelay < Date.now())
        {
            this.lastShootingTime = Date.now();
            for(let i = 0; i < this.shotsAtOneTime; i++)
            {
                this.bullets.push(new Bullet(this.gunPoint, this.bulletSpeed, this.damage, this, this.ctx));
                this.totalShotsThisInterval += this.shotsAtOneTime;
                this.totalShots += this.shotsAtOneTime;
            }
        }
    }

    getGunPointLocation() {
        return {
            x: this.x + this.side,
            y: this.y + this.side / 2
        };
    }

    calculate_base(){
        let hyp = euclid_dist({x1:this.x,y1:this.y},{x2:(this.x+this.side),y2:(this.y+this.side/2)});
        let perp = euclid_dist({x1:this.x,y1:this.y},{x2:this.x,y2:this.y+this.side/2});

        // console.log(hyp, perp);
        // debugger;
        let base = Math.sqrt((hyp*hyp) - (perp*perp));
        return base;
    }
}