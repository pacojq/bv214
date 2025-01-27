
class GameState
{
    constructor(callback)
    {
        this.callback = callback;
    }

    onEnter() {}
    update() {}
    drawGUI() {}
}

class GameStateWaitSeconds extends GameState
{
    constructor(time, callback)
    {
        super(callback);
        this.time = time;
        this.countdown = time;
    }

    update()
    {
        this.countdown -= DeltaTime;
        if (this.countdown <= 0)
        {
            this.callback();
        }
    }
}

class GameStateIntroEnd extends GameState
{
    constructor(layer, callback)
    {
        super(callback);
        this.layer = layer;
    }

    onEnter()
    {
        this.layer.lighting.playTurnOnRoutine();
    }

    update()
    {
        if (!this.layer.lighting.isVisible)
        {
            this.callback();
        }
    }
}

class GameStateFrogTalking extends GameState
{
    constructor(layer, text, callback)
    {
        super(callback);
        this.layer = layer;
        this.text = text;

        this.lineIndex = 0;
        this.shownLines = [ "" ];

        this.shownIndex = 0;
        this.targetIndex = 0;

        this.showWaitingCountdown = 1.2;
        this.sprWaitingIndex = 0; // TODO loading "..." dots
        this.sprWaitings =
        [
            this._createWaitingSprite(res.spr_ui_waiting0),
            this._createWaitingSprite(res.spr_ui_waiting1),
            this._createWaitingSprite(res.spr_ui_waiting2),
            this._createWaitingSprite(res.spr_ui_waiting3)
        ];
        this.sprWaitings[0].alpha = 0.0;
    }

    update()
    {
        super.update();

        const TEXT_SPEED = 21.0; // chars per second
        let textSpd = TEXT_SPEED * (input.hasClick ? 80.0 : 1.0);
        let maxIndex = this.text.length;
        if (this.targetIndex < maxIndex)
        {
            this.targetIndex += DeltaTime * textSpd;
            this.targetIndex = Math.min(this.targetIndex, maxIndex);
        }

        let floorIndex = Math.floor(this.targetIndex);
        while (this.shownIndex < floorIndex)
        {
            this.shownIndex++;
            let newChar = this.text[this.shownIndex-1];
            if (newChar == '\n')
            {
                this.shownLines.push("");
                this.lineIndex++;
            }
            else
            {
                this.shownLines[this.lineIndex] += this.text[this.shownIndex-1];
            }
        }

        if (this.shownIndex >= maxIndex)
        {
            if (this.showWaitingCountdown > 0)
            {
                this.showWaitingCountdown -= DeltaTime;

                let t = Math.min(this.showWaitingCountdown, 1);
                this.sprWaitings[0].alpha = 1 - Math.max(0, t);
            }
            else
            {
                const WAIT_SPEED = 2.1;
                this.sprWaitingIndex += DeltaTime * WAIT_SPEED;
                if (this.sprWaitingIndex >= this.sprWaitings.length)
                {
                    this.sprWaitingIndex -= this.sprWaitings.length;
                }
            }

            
            if (input.hasClick && this.showWaitingCountdown < 0.8)
            {
                this.callback();
            }
        }
        else
        {
            // TODO: maybe speed up on click?
        }
    }

    drawGUI()
    {
        let x = this.layer.width/2.0;
        let yText = this.layer.height * 0.15;
        let yWait = this.layer.height * 0.85;

        // Draw text
        let color = this.layer.lighting.isVisible
            ? "rgb(225, 193, 104)" // light
            : "rgb(45, 6, 41)"; // dark
        drawSetColor(color);

        for (let line = 0; line < this.shownLines.length; line++)
        {
            drawText(x, yText, this.shownLines[line], "center", 20);
            yText += 24;
        }
        drawResetColor();

        // Draw waiting dots
        if (this.shownIndex >= this.text.length)
        {
            let sprWaiting = this.sprWaitings[Math.floor(this.sprWaitingIndex)];
            sprWaiting.draw(x, yWait);
        }
    }

    _createWaitingSprite(filename)
    {
        let sprite = new Sprite(filename);
        sprite.xScale = 0.15;
        sprite.yScale = 0.15;
        return sprite;
    }
}

class GameStateChoice_Item
{
    constructor(option, x, yTarget, yStart, width, height)
    {
        this.option = option;
        this.x = x;
        this.y = yStart;
        this.yTarget = yTarget;
        this.yVelocity = 0;
        this.width = width;
        this.height = height;
        this.sprBackground = new NineSlice(res.spr_ui_panel, width + 20, height + 12, 480, 240);
        this.sprBackground.xScale = 0.1;
        this.sprBackground.yScale = 0.1;
    }

    containsPoint(pX, pY)
    {
        return (pY >= this.y - this.height/2 && pY <= this.y + this.height/2  &&
                pX <= this.x + this.width/2 && pX >= this.x - this.width/2);
    }

    isReady() { return Math.abs(this.y - this.yTarget) < 0.1; }

    update()
    {
        const zeta = 0.55;
        const omega = 3 * Math.PI;
        this._spring_y(zeta, omega, DeltaTime);
    }

    drawGUI()
    {
        // TODO - draw background
        this.sprBackground.draw(this.x, this.y - this.height * .15);

        // Draw text
        drawSetColor("black");
        drawText(this.x, this.y, this.option.text, "center", 18);
        drawResetColor();
    }

    _spring_y(zeta, omega, h)
    {
        let f = 1.0 + 2.0 * h * zeta * omega;
        let oo = omega * omega;
        let hoo = h * oo;
        let hhoo = h * hoo;
        let detInv = 1.0 / (f + hhoo);
        let detX = f * this.y + h * this.yVelocity + hhoo * this.yTarget;
        let detV = this.yVelocity + hoo * (this.yTarget - this.y);

        this.y = detX * detInv;
        this.yVelocity = detV * detInv;
    }
}

class GameStateChoice extends GameState
{
    constructor(layer, text, options, callback)
    {
        super(callback);
        this.layer = layer;
        this.text = text;
        this.shownLines = text.split('\n');
        this.options = [];

        let x = layer.width / 2;
        let width = layer.width * .7;
        let height = 40;
        let y = layer.height * .88;
        let yStart = layer.height + 120;

        for (let i = options.length-1; i >= 0; i--)
        {
            let opt = options[i];
            this.options.push(new GameStateChoice_Item(
                opt, x, y, yStart, width, height));
            y -= (height + 20);
        }
    }

    update()
    {
        this.options.forEach(opt => opt.update());

        if (input.hasClick)
        {
            let pos = input.clickPosition;
            console.error(pos);
            pos.x *= this.layer.width;
            pos.y *= this.layer.height;
            console.error(pos);

            for (let i = this.options.length-1; i >= 0; i--)
            {
                let opt = this.options[i];
                if (!opt.isReady())
                {
                    continue;
                }
                if (opt.containsPoint(pos.x, pos.y))
                {
                    this.callback(opt.option);
                    break;
                }
            }
        }
    }

    drawGUI()
    {
        if (!this.layer.lighting.isVisible)
        {
            drawRect(-1, -1, this.layer.width+1, this.layer.height+1, "rgba(0, 0, 0, 0.45)", true);
        }

        let x = this.layer.width/2.0;
        let yText = this.layer.height * 0.15;

        // Draw text
        let color = this.layer.lighting.isVisible
            ? "rgb(225, 193, 104)"
            : "rgb(255, 225, 141)";
        drawSetColor(color);

        for (let line = 0; line < this.shownLines.length; line++)
        {
            drawText(x, yText, this.shownLines[line], "center", 20);
            yText += 24;
        }

        drawResetColor();

        // Draw options
        this.options.forEach(opt => opt.drawGUI());
    }
}

class GameStateThrowingTokens extends GameState
{
    
}