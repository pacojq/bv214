// Lista de recursos a precargar



var res =
{
    spr_gradient : "res/FadeGradient.png",

    spr_table : "res/Table.png",
    spr_background : "res/Background.png",

    spr_frog_body  : "res/Frog_Body.webp",
    spr_frog_face0 : "res/Frog_Face0.png",
    spr_frog_face1 : "res/Frog_Face1.png",
    spr_frog_face2 : "res/Frog_Face2.png",
    spr_frog_face3 : "res/Frog_Face3.png",
    spr_frog_face4 : "res/Frog_Face4.png",
    spr_frog_hat   : "res/Frog_Hat.webp",

    spr_item_aries        : "res/Item_Aries.webp",
    spr_item_taurus       : "res/Item_Taurus.webp",
    spr_item_gemini       : "res/Item_Gemini.webp",
    spr_item_cancer       : "res/Item_Cancer.webp",
    spr_item_leo          : "res/Item_Leo.webp",
    spr_item_virgo        : "res/Item_Virgo.webp",
    spr_item_libra        : "res/Item_Libra.webp",
    spr_item_scorpio      : "res/Item_Scorpio.webp",
    spr_item_sagittarius  : "res/Item_Sagittarius.webp",
    spr_item_capricorn    : "res/Item_Capricorn.webp",
    spr_item_aquarius     : "res/Item_Aquarius.webp",
    spr_item_pisces       : "res/Item_Pisces.webp",

    spr_ui_panel  : "res/UI_Panel.webp",
    spr_ui_splash : "res/UI_Splash.webp",

    spr_ui_signature_header : "res/Signature_Header.webp",
    spr_ui_signature_footer : "res/Signature_Footer.webp",
    spr_ui_signature_body   : "res/Signature_Body.webp"
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