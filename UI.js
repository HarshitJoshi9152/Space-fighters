// we should make components like healthBar independant classes
// because not all players will use the same amout of components

class UI
{
    constructor(ctx)
    {
        this.ctx = ctx;

        this.healthBar = {
            x:10,
            y:10,
            width:100,
            height:10,
            health:30,
            render: function()
            {
                ctx.save();
                ctx.strokeStyle = "#989898";
                ctx.fillStyle = "#121232"
                drawBox(this.x, this.y,this.width,this.height,this.health,true);
                ctx.restore();
            }
        };

        this.components = [this.healthBar];
    }

    render = function()
    {
        for (let i in this.components){
            this.components[i   ].render();
        }
    }

    drawBox(x, y, width, height, value, progressBar=false)
    {
        // value should always be out of 100
        this.ctx.rect(x, y, width, height);
        this.ctx.stroke()
        if(progressBar)
        {
            this.ctx.rect(x, y, value, height);
            this.ctx.fill();
        }
        else
            this.ctx.strokeText(value, x, y);
    }
}