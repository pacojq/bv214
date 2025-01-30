
class TokenEntity extends Entity
{
    constructor(item, xTarget, yTarget)
    {
        super();
        this.item = item;
        this.setBody(new Body(40, 40));
        this.body.name = item.id;
        this.body.isTrigger = true;
        this.body.onCollision = this._onCollision.bind(this);

        this.xTarget = xTarget;
        this.yTarget = yTarget;
        this.scale = 0.05;
        this.scaleTarget = 0.12;
        this.speed = 310;
        this.rotationDir = randomSign();

        this.isReady = false;
    }

    earlyUpdate()
    {
        super.earlyUpdate();
    }

    update()
    {
        super.update();

        if (this.scale < this.scaleTarget)
        {
            const SCALE_SPD = 1.3;
            this.scale += SCALE_SPD * DeltaTime;
            this.scale = Math.min(this.scale, this.scaleTarget);
        }
        let xDif = this.xTarget - this.body.x;
        let yDif = this.yTarget - this.body.y;
        let magnitude = Math.sqrt(xDif*xDif + yDif*yDif);
        let xDir = xDif / magnitude;
        let yDir = yDif / magnitude;

        if (magnitude > 0.1)
        {
            let delta = Math.min(this.speed * DeltaTime, magnitude);
            //this.body.x += delta * xDir;
            //this.body.y += delta * yDir;
            this.body.move(delta * xDir, delta * yDir);

            this.item.sprite.rotation += delta * this.rotationDir * randomRange(1.1, 1.2);
        }
        else
        {
            this.isReady = true;
        }

        if (this.speed > 30)
        {
            let ACCELERATION = 160;
            this.speed -= ACCELERATION * DeltaTime;
        }

    }

    draw()
    {
        this.item.sprite.xScale = this.scale;
        this.item.sprite.yScale = this.scale;
        this.item.sprite.draw(this.body.x, this.body.y);
    }

    _onCollision(hSign, vSign, other)
    {
        //console.log("Token collided with: " + other.name);
        this.body.x -= hSign;
        this.body.y -= vSign;
    }

}