
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
        this.sprHat.setOrigin(72, 195);
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

    _createBodySprite(filename)
    {
        let spr = new Sprite(filename);
        spr.setOrigin(155, 170);
        return spr;
    }

}