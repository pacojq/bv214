
class KeyboardInput extends InputSource {

    constructor() {
        super();
        window.addEventListener('keydown', this.onKeyboardKeyDown.bind(this), false);
        window.addEventListener('keyup', this.onKeyboardKeyUp.bind(this), false);
        
        //this.clickCount = -1;
        //window.addEventListener('click', this.onClick.bind(this), false);

        window.addEventListener('touchstart', this.onTouchStart.bind(this), false);
        window.addEventListener('touchend', this.onTouchEnd.bind(this), false);
    }

    onTouchStart() {
        this.pressKey(KeyCode.ACCEPT);
        this.pressKey(KeyCode.JUMP);
    }

    onTouchEnd() {
        this.releaseKey(KeyCode.ACCEPT);
        this.releaseKey(KeyCode.JUMP);
    }

    onKeyboardKeyDown(event)
    {
        //console.log("Key down:" + event.key);
        switch (event.key)
        {
            case "d":
            case "ArrowRight":
                this.pressKey(KeyCode.RIGHT);
                break;

            case "a":
            case "ArrowLeft":
                this.pressKey(KeyCode.LEFT);
                break;

            case "w":
            case "ArrowUp":
                this.pressKey(KeyCode.UP);
                break;

            case "s":
            case "ArrowDown":
                this.pressKey(KeyCode.DOWN);
                break;

            case " ":
                this.pressKey(KeyCode.ACCEPT);
                this.pressKey(KeyCode.JUMP);
                break;

            case "Escape":
                this.pressKey(KeyCode.CANCEL);
                break;

            case "Enter":
                this.pressKey(KeyCode.ACCEPT);
                break;
        }
    }

    onKeyboardKeyUp(event)
    {
        //console.log("Key up:" + event.key);
        switch (event.key)
        {
            case "d":
            case "ArrowRight":
                this.releaseKey(KeyCode.RIGHT);
                break;

            case "a":
            case "ArrowLeft":
                this.releaseKey(KeyCode.LEFT);
                break;

            case "w":
            case "ArrowUp":
                this.releaseKey(KeyCode.UP);
                break;

            case "s":
            case "ArrowDown":
                this.releaseKey(KeyCode.DOWN);
                break;

            case " ":
                this.releaseKey(KeyCode.JUMP);
                this.releaseKey(KeyCode.ACCEPT);
                break;

            case "Escape":
                this.releaseKey(KeyCode.CANCEL);
                break;

            case "Enter":
                this.releaseKey(KeyCode.ACCEPT);
                break;
        }
    }

}
