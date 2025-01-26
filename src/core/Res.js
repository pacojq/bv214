// Lista de recursos a precargar



var res =
{
    spr_gradient : "res/FadeGradient.png",

    spr_table : "res/Table.png",
    spr_background : "res/Background.png",

    spr_frog_body : "res/Frog_Body.png",
    spr_frog_face0 : "res/Frog_Face0.png",
    spr_frog_face1 : "res/Frog_Face1.png",
    spr_frog_face2 : "res/Frog_Face2.png",
    spr_frog_face3 : "res/Frog_Face3.png",
    spr_frog_face4 : "res/Frog_Face4.png",
    spr_frog_hat : "res/Frog_Hat.png",

    spr_ui_panel : "res/UI_Panel.png",

    spr_ui_waiting0 : "res/UI_Loading00.png",
    spr_ui_waiting1 : "res/UI_Loading01.png",
    spr_ui_waiting2 : "res/UI_Loading02.png",
    spr_ui_waiting3 : "res/UI_Loading03.png"
};

var resValues = Object.values(res);
loadRes(0);

function loadRes(index){
    var img = new Image();
    img.src = resValues[index];
    img.onload = function(){
        if (index < resValues.length-1) {
            index++;
            loadRes(index);
        }
        else startGame();
    }
}