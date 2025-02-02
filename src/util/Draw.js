
// https://developer.mozilla.org/en-US/docs/Web/API/FontFace
var __fontName = "Consolas"
var __customFont = new FontFace("bloody_valentine", "url(res/sligoil_micro.otf)");
__customFont.load().then(
    () =>
    {
        __fontName = "bloody_valentine";
        document.fonts.add(__customFont);
    },
    (err) =>
    {
        console.error("could not load font");
        console.error(err);
    });

function drawLine(x0, y0, x1, y1, col = "balck", width = 1)
{
    context.beginPath();

    drawSetColor(col);
    context.lineWidth = width;

    context.moveTo(x0,y0);
    context.lineTo(x1,y1);
    context.stroke();

    drawResetColor();
}

function drawRect(x0, y0, x1, y1, col = "black", filled = false, alpha = 1)
{
    context.globalAlpha = alpha;
    context.beginPath();
    drawSetColor(col);
    if (filled)
    {
        context.fillRect(x0, y0, x1-x0, y1-y0);
    }
    else
    {
        context.lineWidth="0.5";
        context.rect(x0, y0, x1-x0, y1-y0);
    }
    context.stroke();
    drawResetColor();
    context.globalAlpha = 1;
}

/**
 * @param x
 * @param y
 * @param text
 * @param textAlign (center/left/right)
 * @param textSize by default, 4
 */
function drawText(x, y, text, textAlign = "left", textSize = 16)
{
    const MAX_WIDTH = Math.round(canvas.width * 1.0);
    context.font="" + textSize + "px " + __fontName;
    context.textAlign = textAlign;
    context.fillText(text, x, y, MAX_WIDTH);
    //return context.measureText(text);
}

function drawPlainImage(x, y, image)
{
    drawImage(x, y, image, 0, 0, 0, 1);
}

function drawImage(x, y, image, imageOX, imageOY, rotation, alpha)
{
    var rot = roundToClosest(rotation, 5);
    context.globalAlpha = alpha;

    if (rot == 0)
    {
        context.drawImage(image, x - imageOX, y - imageOY);
    }
    else
    {
        var radians = rot * (Math.PI / 180);

        context.translate(x, y);
        context.rotate(radians);

        context.drawImage(image, -imageOX, -imageOY);

        context.rotate(-radians);
        context.translate(-x, -y);
    }

    context.globalAlpha=1;
}

function drawSetAlpha(alpha)
{
    context.globalAlpha = alpha;
}

function drawSetColor(color)
{
    context.fillStyle = color;
    context.strokeStyle = color;
}

function drawResetColor()
{
    drawSetColor("black");
}