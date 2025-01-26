

class TestLayer extends Layer
{
    constructor()
    {
        super();

        this.frogY = this.height * .55;

        this.dialoguePlayer = new DialoguePlayer(this);

        this.sprTable = new Sprite(res.spr_table);
        this.sprBackground = new Sprite(res.spr_background);
        this.sprTable.xScale = 0.5;
        this.sprTable.yScale = 0.5;
        this.sprBackground.xScale = 0.75;
        this.sprBackground.yScale = 0.75;
        this.sprBackground.rotation = -15;
        this.sprBackground.alpha = 0.6;

        this.sprBorder = new Sprite(res.spr_gradient);
        this.sprBorder.yScale = (this.width + 40) / 32.0;
        this.sprBorder.xScale = 2;

        this.state = null;
    }

    setState(newState)
    {
        this.state = newState;
        this.state.onEnter();
    }

    start()
    {
        //audio.playMusic();
        this.frog = this.entityCreate(this.width/2, this.frogY, new FrogEntity());
        this.lighting = this.entityCreate(0, 0, new LightingEntity());
        this.dialoguePlayer.advanceNode();
    }

    gameEnd()
    {
        //audio.stopMusic();
        setLayer(endLayer);
    }

    preUpdate()
    {
        this.entities.forEach(e => e.preUpdate());
    }

    earlyUpdate()
    {
        this.entities.forEach(e => e.earlyUpdate());
    }

    update()
    {
        if (this.state != null)
        {
            this.state.update();
        }
        if (input.isKeyPressed(KeyCode.ACCEPT))
        {

        }
        this.entities.forEach(e => e.update());
    }

    lateUpdate()
    {
        this.entities.forEach(e => e.lateUpdate());
    }

    postUpdate()
    {
        this.entities.forEach(e => e.postUpdate());
    }

    preDraw()
    {
    }

    drawBegin()
    {
        drawRect(-1, -1, this.width+1, this.height+1, "#f5f2e9", true);

        this.sprBorder.rotation = 90;
        this.sprBorder.draw(this.width/2, 32);

        this.sprBorder.rotation = 270;
        this.sprBorder.draw(this.width/2, this.height - 32);
    }

    draw()
    {
        this.sprBackground.draw(this.width/2, this.frogY - 100);
        this.sprTable.draw(this.width/2, this.frogY + 90);

        // Draw Entities
        this.entities.forEach(e => e.draw());
    }

    drawEnd()
    {
        this.entities.forEach(e => e.drawEnd());
    }

    drawGUI()
    {
        if (this.state != null)
        {
            this.state.drawGUI();
        }
    }

    postDraw()
    {
        this.entities.forEach(e => e.postDraw());
    }

}
