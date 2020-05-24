// we should make components like healthBar independant classes
// because not all players will use the same amout of components
// EDIT (3/27/2020) :::
// that is why i think that all entities should be allow to control
// the components that they use and the UI library should just provide methods
// to easily render those components. However the UI library could also contain
// some commanly used componenty like HealthBar.

// !UI class should provide the API for objects to draw ui elements like health bars
// !but the actual 'call' for rendering should be made from the object itself to who the
// !attributes rendered belongs

class UI
{
    constructor(ctx)
    {
        this.ctx = ctx;
    }

    renderHealthBar = function(x, y, width, height, health, strokeStyle = "#989898", fillStyle = "#121232")
    {
        this.ctx.save();
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.fillStyle = fillStyle;
        if (health > width)
        {
            this.drawBox(x, y, width, height, width, true);
            this.ctx.restore();
        } else
            this.drawBox(x, y, width, height, health, true);
        // ctx.strokeStyle = "white";
        // ctx.strokeText("Health", x, y);
        this.ctx.restore();
    }

    drawBox = function(x, y, width, height, value, bar=false)
    {
        // value should always be out of 100
        this.ctx.beginPath();

        this.ctx.rect(x, y, width, height);
        this.ctx.stroke()
        if(bar)
        {
            this.ctx.rect(x, y, value, height);
            this.ctx.fill();
        }
        else
            this.ctx.strokeText(value, x, y);

        this.ctx.closePath();
    }
}