
var KeyCode = {

    _keyCount: 10,

    RIGHT: 0,
    LEFT: 1,
    UP: 2,
    DOWN: 3,

    BUILDING: 4,
    BUILDING_CANCEL: 5,

    SUMMONING: 6,

    ACCEPT: 7,
    CANCEL: 8,

    BUILDING_CHANGE : 9,
  };


class InputManager
{
    constructor()
    {
        console.log("Input initialization started.");

        this.inputs = [];
        this.mainInput = new KeyboardInput();
        this.inputs.push(this.mainInput);

        this.clickPosition = {x: -1, y: -1};
        this.hasClick = false;
        this._hasClickCount = 0;

        let canvas = document.getElementById("canvas");
        //canvas.click(this._onCanvasClick.bind(this));
        canvas.onclick = this._onCanvasClick.bind(this);

        console.log("Input manager ready.");
    }

    update()
    {
        this.mainInput.update();

        if (this.hasClick)
        {
             // idk how to make events, so fuck it
            this._hasClickCount++;
            if (this._hasClickCount > 1)
            {
                this.clickPosition = {x: -1, y: -1};
                this.hasClick = false;
            }
        }
    }

    isKeyHeld(key)
    {
        return this.mainInput.isKeyHeld(key);
    }

    isKeyPressed(key)
    {
        return this.mainInput.isKeyPressed(key);
    }

    isKeyReleased(key)
    {
        return this.mainInput.isKeyReleased(key);
    }

    _onCanvasClick(event)
    {
        //console.error(event);
        this.clickPosition =
        {
            x: event.layerX / canvas.width,
            y: event.layerY / canvas.height,
        };
        this.hasClick = true;
        this._hasClickCount = 0;
    }
}
