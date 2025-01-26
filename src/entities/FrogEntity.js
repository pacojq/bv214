
class FrogEntity extends Entity
{
    constructor()
    {
        super();

        this.setBody(new Body(20, 20));
        this.body.name = "frog";
        this.body.isTrigger = false;

        this.faceIndex = 0;

        this.sprBody = this._createBodySprite(res.spr_frog_body);
        this.sprFaces = 
        [
            this._createBodySprite(res.spr_frog_face0),
            this._createBodySprite(res.spr_frog_face1),
            this._createBodySprite(res.spr_frog_face2),
            this._createBodySprite(res.spr_frog_face3),
            this._createBodySprite(res.spr_frog_face4),
        ];
        this.sprHat = new Sprite(res.spr_frog_hat);
        this.sprHat.xScale = 0.5;
        this.sprHat.yScale = 0.5;
        this.sprHat.setOrigin(145, 390);
        this.sprHat.rotation = -3;
    }

    earlyUpdate()
    {
        super.earlyUpdate();
    }

    update()
    {
        super.update();
    }

    draw()
    {
        this.sprBody.draw(this.body.x, this.body.y);
        this.sprFaces[this.faceIndex].draw(this.body.x, this.body.y);
        this.sprHat.draw(this.body.x - 3, this.body.y - 102);
    }

    _onCollision(hSign, vSign, other)
    {
        console.log("Frog collided with: " + other.name);
        freezeGame(5); 
    }

    _createBodySprite(filename)
    {
        let spr = new Sprite(filename);
        spr.xScale = 0.5;
        spr.yScale = 0.5;
        spr.setOrigin(310, 340);
        return spr;
    }

}