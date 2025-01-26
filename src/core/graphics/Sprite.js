class Sprite
{
    constructor(filepath)
    {
        this.image = new Image();
        this.image.src = filepath;
        this.image.onerror = () => {};
        this.image.onload = this._onImageLoad.bind(this);
        this.xScale = 1.0;
        this.yScale = 1.0;
        this.alpha = 1.0;
        this.rotation = 0.0;
    }

    _onImageLoad()
    {
        if (!this._originOverride)
        {
            this.ox = this.image.width / 2;
            this.oy = this.image.height / 2;
        }
    }

    setOrigin(ox, oy)
    {
        this._originOverride = true;
        this.ox = ox;
        this.oy = oy;
    }

    draw(x, y)
    {
        var radians = this.rotation * (Math.PI / 180);

        context.translate(x, y);
        context.rotate(radians);
        context.scale(this.xScale, this.yScale);
        context.globalAlpha = this.alpha;

        context.drawImage(
            this.image,
            0,
            0,
            this.image.width,
            this.image.height,
            -this.ox,
            -this.oy,
            this.image.width,
            this.image.height);

        context.globalAlpha = 1;
        context.scale(1/this.xScale, 1/this.yScale);
        context.rotate(-radians);
        context.translate(-x, -y);
    }

    drawExt(x, y, imageIndex, xScale, yScale, rot, alpha) {
        var radians = rot * (Math.PI / 180);

        context.translate(x, y);
        context.rotate(radians);
        context.scale(xScale, yScale);
        context.globalAlpha = alpha;

        context.drawImage(
            this.image,
            imageIndex * this.frameWidth,
            0,
            this.frameWidth,
            this.frameHeight,
            0, 
            0,
            this.frameWidth,
            this.frameHeight);

        context.globalAlpha = 1;
        context.scale(1/xScale, 1/yScale);
        context.rotate(-radians);
        context.translate(-x, -y);
    }

    

}