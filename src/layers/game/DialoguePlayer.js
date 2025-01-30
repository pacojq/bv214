
class DialoguePlayer
{
    constructor(layer)
    {
        this.layer = layer;
        this.currentNode = null;
    }

    advanceNode()
    {
        //this.layer.frog.faceIndex = 0;
        let nextNodeId = this.currentNode == null ? entryNodeId : this.currentNode.nextNodeId;
        this.advanceNodeId(nextNodeId);
    }

    advanceNodeId(nextNodeId)
    {
        console.warn("advance node: " + nextNodeId);
        let nextNode = GetDialogueNode(nextNodeId);
        nextNode.onEnter(this);
        this.currentNode = nextNode;
        //console.warn(this.currentNode);
    }

    onEnterDialogueNode(node)
    {
        //console.warn("enter dialogue node");
        this.layer.frog.faceIndex = node.faceIndex;
        let stateText = new GameStateFrogTalking(
            this.layer,
            node.text,
            this.advanceNode.bind(this));
        this.layer.setState(stateText);
    }

    onEnterChoiceNode(node)
    {
        let text = node.text;
        if (text == null || text == undefined || text.length == 0)
        {
            if (this.currentNode.text != undefined)
            {
                text = this.currentNode.text;
            }
        }

        //console.warn("enter choice node");
        let stateChoice = new GameStateChoice(
            this.layer,
            text,
            node.options,
            this._choiceNodeCallback.bind(this));
        this.layer.setState(stateChoice);
    }

    _choiceNodeCallback(option)
    {
        //console.warn(option);
        this.advanceNodeId(option.nextNodeId);
    }

    onEnterWaitSecondsNode(node)
    {
        //console.warn("enter seconds node");
        let stateWait = new GameStateWaitSeconds(
            node.time,
            this.advanceNode.bind(this));
        this.layer.setState(stateWait);
    }

    onEnterEventNode(node)
    {
        switch (node.eventId)
        {
            case "INTRO_END":
            {
                let state = new GameStateIntroEnd(
                    this.layer,
                    this.advanceNode.bind(this));
                this.layer.setState(state);
                break;
            }

            case "CHOICE_SIGN":
            {
                this.layer.soothsaying.pushItem(node.payload.sign);
                let stateWait = new GameStateWaitSeconds(
                    0.01,
                    this.advanceNode.bind(this));
                this.layer.setState(stateWait);
                break;
            }

            case "SHOW_ITEM":
            {
                let index = Math.min(node.payload.index, this.layer.soothsaying.itemCount()-1);
                let state = new GameStateShowToken(
                    this.layer,
                    index,
                    this.advanceNode.bind(this));
                this.layer.setState(state);
                break;
            }

            case "THROW_ITEMS":
            {
                let state = new GameStateThrowingTokens(
                    this.layer,
                    this.advanceNode.bind(this));
                this.layer.setState(state);
                break;
            }

            case "GAME_END":
            {
                this.layer.frog.faceIndex = 1;
                let state = new GameStateEnd(this.layer);
                this.layer.setState(state);
                break;
            }

            default:
                console.error("unknown event: '" + node.eventId + "'");
        }
    }
}