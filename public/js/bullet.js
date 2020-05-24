/*
HarshitJoshi9152 3/9/2020 3:55

to make the development process simpler i have decided to not take the dir variable into consideration

TODO:: 1. collision detection

SUGGESTION::
    maybe we can check for a circular !
    add this.bulletno to parameters and then in destroy do delete this.parent[this.bulletno]

issue ::
    new when this.destroy is called a few other instances of the bullets are also removed from this.parent.bullets[];
*/

class Bullet
{
    constructor({x, y}, speed, dmg, radius, parent, ctx)
    {
        // code
        this.x = x,
        this.y = y,
        this.speed = speed,
        this.damage = dmg,
        this.radius = radius,
        this.parent = parent,

        this.ctx = ctx;

    }

    update = function()
    {
        // move in only 1 and 1 dir
        // todo collison detection from other planes and onhit()
        this.x += this.speed;
        if(this.x > width)
        {
            console.log("destroyed");
            this.destroy();
        }
    }

    render = function()
    {
        // draw the bullet
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = "#FF6347";
        this.ctx.ellipse(this.x, this.y, this.radius, this.radius, 2*Math.PI, 0, 2*Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    }

    onhit = function()
    {
        // damage the other enemy unit
        // destroy bullet and show some effect like a feedback loops (maybe some satisfying particle effect or animation)
    }

    destroy = function()
    { 
        this.parent.bullets.splice(0,1);
    }
}