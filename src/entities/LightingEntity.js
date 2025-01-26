
class LightingEntity extends Entity
{
    constructor()
    {
        super();
        this.setBody(new Body(0, 0));
        this.body.name = "lighting";
        this.body.isTrigger = false;

        this.isVisible = true;
        this.color = "#16161d";
        this.alpha = 1;
    }

    earlyUpdate() {}

    update()
    {
        if (this.isVisible && this.alpha < 1)
        {
            this.alpha *= .98;
            if (this.alpha <= 0.01)
            {
                this.isVisible = false;
            }
        }
    }

    draw() { }

    drawEnd()
    {
        if (this.isVisible)
        {
            drawRect(-1, -1, this.layer.width+1, this.layer.height+1, this.color, true, this.alpha);
        }
    }

    playTurnOnRoutine()
    {
        this.color = "#ffffff";
        this.alpha = .9999;
    }
}