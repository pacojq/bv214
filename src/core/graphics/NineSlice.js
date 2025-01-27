class NineSlice
{
    constructor(filepath, width, height, offsetX, offsetY)
    {
        this.image = new Image();
        this.image.src = filepath;
        this.image.onerror = () => {};
        this.width = width;
        this.height = height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.ox = this.width / 2;
        this.oy = this.height / 2;
        this.xScale = 1.0;
        this.yScale = 1.0;
        this.alpha = 1.0;
    }

    setOrigin(ox, oy)
    {
        this._originOverride = true;
        this.ox = ox;
        this.oy = oy;
    }

    draw(x, y)
    {
        let w = this.width / this.xScale;
        let h = this.height / this.yScale;
        let ox = this.ox / this.xScale;
        let oy = this.oy / this.yScale;
        let xExpand = (w - 2 * this.offsetX) / (this.image.width - 2 * this.offsetX);
        let yExpand = (h - 2 * this.offsetY) / (this.image.height - 2 * this.offsetY);

        context.translate(x, y);
        context.scale(this.xScale, this.yScale);
        context.globalAlpha = this.alpha;

        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

        context.drawImage(this.image, // Center
            this.offsetX, this.offsetY,
            this.image.width - 2 * this.offsetX, this.image.height - 2 * this.offsetY,
            -ox + this.offsetX - 2, -oy + this.offsetY - 2,
            (this.image.width - 2 * this.offsetX) * xExpand + 4, (this.image.height - 2 * this.offsetY) * yExpand + 4);

        context.drawImage(this.image, // Top
            this.offsetX, 0,
            this.image.width - 2 * this.offsetX, this.offsetY,
            -ox + this.offsetX - 2, -oy,
            (this.image.width - 2 * this.offsetX) * xExpand + 4, this.offsetY);

        context.drawImage(this.image, // Bottom
            this.offsetX, this.image.height - this.offsetY,
            this.image.width - 2 * this.offsetX, this.offsetY,
            -ox + this.offsetX - 2, oy - this.offsetY,
            (this.image.width - 2 * this.offsetX) * xExpand + 4, this.offsetY);

        context.drawImage(this.image, // Left
            0, this.offsetY,
            this.offsetX, this.image.height - 2 * this.offsetY,
            -ox, -oy + this.offsetY - 2,
            this.offsetX, (this.image.height - 2 * this.offsetY) * yExpand + 4);

        context.drawImage(this.image, // Right
            this.image.width - this.offsetX, this.offsetY,
            this.offsetX, this.image.height - 2 * this.offsetY,
            ox - this.offsetX, -oy + this.offsetY - 2,
            this.offsetX, (this.image.height - 2 * this.offsetY) * yExpand + 4);

        context.drawImage(this.image, // Top left
            0, 0,
            this.offsetX, this.offsetY,
            -ox, -oy,
            this.offsetX, this.offsetY);

        context.drawImage(this.image, // Top right
            this.image.width - this.offsetX, 0,
            this.offsetX, this.offsetY,
            ox - this.offsetX, -oy,
            this.offsetX, this.offsetY);

        context.drawImage(this.image, // Bottom left
            0, this.image.height - this.offsetY,
            this.offsetX, this.offsetY,
            -ox, oy - this.offsetY,
            this.offsetX, this.offsetY);

        context.drawImage(this.image, // Bottom right
            this.image.width - this.offsetX, this.image.height - this.offsetY,
            this.offsetX, this.offsetY,
            ox - this.offsetX, oy - this.offsetY,
            this.offsetX, this.offsetY);

        context.globalAlpha = 1;
        context.scale(1/this.xScale, 1/this.yScale);
        context.translate(-x, -y);
    }
}