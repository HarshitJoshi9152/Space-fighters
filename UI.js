// we should make components like healthBar independant classes
// because not all players will use the same amout of components
// EDIT (3/27/2020) :::
// that is why i think that all entities should be allow to control
// the components that they use and the UI library should just provide methods
// to easily render those components. However the UI library could also contain
// some commanly used componenty like HealthBar.


class UI
{
    constructor(ctx)
    {
        this.ctx = ctx;

        this.healthBar = {
            x:660,
            y:10,
            width:100,
            height:10,
            health:40,
            render: function()
            {
                ctx.save();
                ctx.strokeStyle = "#989898";
                ctx.fillStyle = "#121232"
                // we couldnt call this.drawBox because this here refers to the healthBar object.
                drawBox(this.x, this.y, this.width, this.height, this.health, true);
                ctx.restore();
            }
        };

        this.components = [this.healthBar];
    }

    render = function()
    {
        for (let i in this.components){
            this.components[i].render();
        }
    }

    drawBox = function(x, y, width, height, value, bar=false)
    {
        // value should always be out of 100
        this.ctx.rect(x, y, width, height);
        this.ctx.stroke()
        if(bar)
        {
            this.ctx.rect(x, y, value, height);
            this.ctx.fill();
        }
        else
            this.ctx.strokeText(value, x, y);
    }
}