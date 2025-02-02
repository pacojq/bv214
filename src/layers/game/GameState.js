
class GameState
{
    constructor(callback)
    {
        this.callback = callback;
    }

    onEnter() {}
    update() {}
    draw() {}
    drawGUI() {}
}

class UiComponentWaiting
{
    constructor(layer)
    {
        this.layer = layer;
        this.showWaitingCountdown = 1.0;

        this.x = 0;
        this.y = 0;
        this.alpha = 0;
        this.fade = 0;
        this.time = 0;
    }

    update()
    {
        if (this.showWaitingCountdown > 0)
        {
            this.showWaitingCountdown -= DeltaTime;

            let t = Math.min(this.showWaitingCountdown, 1);
            this.fade = 1 - Math.max(0, t);
        }

        const BLINK_SPD = 0.3 * Math.PI;
        this.time += BLINK_SPD * DeltaTime;
        this.alpha = Math.cos(this.time);
    }

    drawGUI()
    {
        let textAlpha = (1 - Math.abs(this.alpha)) * this.fade;

        let color = this.layer.lighting.isVisible
            ? "rgba(211, 207, 196," + textAlpha + ")" // light
            : "rgba(45, 6, 41," + textAlpha + ")"; // dark
        drawSetColor(color);

        drawText(this.x, this.y, "(pulsa para continuar)", "center", 20);

        drawResetColor();
    }
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

class BaseGameStateFrogTalking extends GameState
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
    }

    update()
    {
        super.update();

        const TEXT_SPEED = 39.0; // chars per second
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
    }

    drawGUI()
    {
        let x = this.layer.width/2.0;
        let yText = this.layer.height * 0.15;

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
    }
}

class GameStateFrogTalking extends BaseGameStateFrogTalking
{
    constructor(layer, text, callback)
    {
        super(layer, text, callback);
        this.uiWaiting = new UiComponentWaiting(layer);
        this.uiWaiting.showWaitingCountdown = 1.2;
    }

    update()
    {
        super.update();

        let maxIndex = this.text.length;

        if (this.shownIndex >= maxIndex)
        {
            this.uiWaiting.update();
            if (input.hasClick && this.uiWaiting.showWaitingCountdown < 0.8)
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
        super.drawGUI();

        let maxIndex = this.text.length;
        let x = this.layer.width/2.0;
        let yWait = this.layer.height * 0.85;

        // Draw waiting text
        if (this.shownIndex >= maxIndex)
        {
            this.uiWaiting.x = x;
            this.uiWaiting.y = yWait;
            this.uiWaiting.drawGUI();
        }
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

        this.textSize = 18;
        if (this.option.text.length > 36)
        {
            this.textSize = 14;
        }
        else if (this.option.text.length > 30)
        {
            this.textSize = 16;
        }
        //console.warn("option length: " + this.option.text.length);
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
        drawText(this.x, this.y, this.option.text, "center", this.textSize);
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
        let width = layer.width * .8;
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
            pos.x *= this.layer.width;
            pos.y *= this.layer.height;

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

class GameStateShowToken extends GameState
{
    constructor(layer, tokenIndex, callback)
    {
        super(callback);
        this.layer = layer;
        this.token = layer.soothsaying.getItem(tokenIndex);

        this.yTarget = this.layer.height * 0.5;
        this.ySprite = this.layer.height + 120;
        this.yVelocity = 0;

        this.uiWaiting = new UiComponentWaiting(layer);
        this.uiWaiting.showWaitingCountdown = 1.2;

        this.sprSplash = new Sprite(res.spr_ui_splash);
        this.sprSplash.xScale = 0.4;
        this.sprSplash.yScale = 0.4;
        this.sprSplash.alpha = 0.0;
    }

    isReady() { return (Math.abs(this.ySprite - this.yTarget) < 0.1) && (Math.abs(this.yVelocity) < 0.1); }

    update()
    {
        if (this.isReady())
        {
            this.uiWaiting.update();
            if (input.hasClick && this.uiWaiting.showWaitingCountdown < 0.8)
            {
                this.callback();
            }
        }

        const zeta = 0.55;
        const omega = 3 * Math.PI;
        this._spring_y(zeta, omega, DeltaTime);
    }

    drawGUI()
    {
        drawRect(-1, -1, this.layer.width+1, this.layer.height+1, "rgba(0, 0, 0, 0.75)", true);

        let x = this.layer.width/2.0;
        let yText = this.layer.height * 0.15;
        let yWait = this.layer.height * 0.85;

        // Draw text
        drawSetColor("rgb(255, 214, 11)");
        drawText(x, yText, this.token.name, "center", 26);
        
        // Draw sprite

        this.sprSplash.alpha += 2.4 * DeltaTime;
        this.sprSplash.alpha = Math.min(this.sprSplash.alpha, 0.95);
        this.sprSplash.draw(x, this.yTarget);

        this.token.sprite.xScale = 1.0;
        this.token.sprite.yScale = 1.0;
        this.token.sprite.draw(x, this.ySprite);

        // Draw waiting
        if (this.isReady())
        {
            this.uiWaiting.x = x;
            this.uiWaiting.y = yWait;
            this.uiWaiting.drawGUI();
        }
    }

    _spring_y(zeta, omega, h)
    {
        let f = 1.0 + 2.0 * h * zeta * omega;
        let oo = omega * omega;
        let hoo = h * oo;
        let hhoo = h * hoo;
        let detInv = 1.0 / (f + hhoo);
        let detX = f * this.ySprite + h * this.yVelocity + hhoo * this.yTarget;
        let detV = this.yVelocity + hoo * (this.yTarget - this.ySprite);

        this.ySprite = detX * detInv;
        this.yVelocity = detV * detInv;
    }
}

class GameStateThrowingTokens extends GameState
{
    constructor(layer, callback)
    {
        super(callback);
        this.layer = layer;
        this.tokens = [];

        let x = layer.width/2;
        let y = layer.height * .6;
        let sign = randomSign();
        for (let i = 0; i < 3; i++)
        {
            let item = layer.soothsaying.getItem(i);
            let xTarget = x + sign * randomRange(layer.width * .03, layer.width * .2);
            let yTarget = y + layer.height * randomRange(.02, .1);
            let token = layer.entityCreate(x, y, new TokenEntity(item, xTarget, yTarget));
            this.tokens.push(token);

            sign = -sign;
        }
    }

    update()
    {
        for (let i = 0; i < 3; i++)
        {
            if (!this.tokens[i].isReady)
                return;
        }
        this.callback();
    }
}

class GameStateEnd extends BaseGameStateFrogTalking
{
    constructor(layer)
    {
        const text = "...y dile que me debe un bizum.";
        super(layer, text, () => {});
    }
}