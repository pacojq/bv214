
class GameNode
{
    constructor(){}

    onEnter(dialoguePlayer)
    {
        console.error("unimplemented!!");
    }
}

class GameNodeText extends GameNode
{
    constructor(text, nextNodeId, faceIndex)
    {
        super();
        this.text = text;
        this.nextNodeId = nextNodeId;
        this.faceIndex = faceIndex;
    }

    onEnter(dialoguePlayer)
    {
        dialoguePlayer.onEnterDialogueNode(this);
    }
}

class ChoiceOption
{
    constructor(text, nextNodeId)
    {
        this.text = text;
        this.nextNodeId = nextNodeId;
    }
}

class GameNodeChoice extends GameNode
{
    constructor(text, options)
    {
        super();
        this.text = text;
        this.options = options;
    }

    onEnter(dialoguePlayer)
    {
        dialoguePlayer.onEnterChoiceNode(this);
    }
}

class GameNodeWaitSeconds extends GameNode
{
    constructor(time, nextNodeId)
    {
        super();
        this.time = time;
        this.nextNodeId = nextNodeId;
        this.countdown = time;
    }

    onEnter(dialoguePlayer)
    {
        dialoguePlayer.onEnterWaitSecondsNode(this);
    }
}

class GameNodeEvent extends GameNode
{
    constructor(eventId, nextNodeId)
    {
        super();
        this.eventId = eventId;
        this.nextNodeId = nextNodeId;
    }

    onEnter(dialoguePlayer)
    {
        dialoguePlayer.onEnterEventNode(this);
    }
}
