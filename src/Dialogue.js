

var nodeMap = new Map();
//var entryNodeId = "SHORTCUT";
var entryNodeId = "ENTRY";

function DO_TEXT(id, text, nextNodeId, faceIndex = 0)
{
    nodeMap.set(id, new GameNodeText(text, nextNodeId, faceIndex));
}

function DO_CHOICE(id, text, options)
{
    nodeMap.set(id, new GameNodeChoice(text, options));
}

function DO_WAIT(id, time, nextNodeId)
{
    nodeMap.set(id, new GameNodeWaitSeconds(time, nextNodeId));
}

function DO_EVENT(id, eventId, payload, nextNodeId)
{
    nodeMap.set(id, new GameNodeEvent(eventId, payload, nextNodeId));
}

function GetDialogueNode(nodeId)
{
    if (!nodeMap.has(nodeId))
    {
        console.error("attempting to get inexistent node: '" + nodeId + "'");
        return null;
    }
    return nodeMap.get(nodeId);
}

//DO_EVENT("SHORTCUT", "INTRO_END", null, "ENDING_13");
//DO_EVENT("SHORTCUT_01",    "CHOICE_SIGN", { sign: "RANDOM"},  "SHORTCUT_02");
//DO_EVENT("SHORTCUT_02",    "CHOICE_SIGN", { sign: "RANDOM"},  "SHORTCUT_03");
//DO_EVENT("SHORTCUT_03",    "CHOICE_SIGN", { sign: "RANDOM"},  "THROW_06");



DO_WAIT("ENTRY", 1.0,                                               "ENTRY_text");
DO_TEXT("ENTRY_text",   "saludos.",                                 "INTRO_00");
DO_TEXT("INTRO_00",     "te estaba esperando...",                   "INTRO_01");
DO_TEXT("INTRO_01",     "los amuletos auguraron que"                + '\n' +
                        "vendrías buscando consejo.",               "INTRO_02");
DO_CHOICE("INTRO_02",   "",
    [
    new ChoiceOption(   "yo no quiero consejo de nadie",            "INTRO_03"),
    new ChoiceOption(   "venir... ¿a dónde, exactamente?",          "INTRO_07")
    ]);
DO_TEXT("INTRO_03",     "a ver, guapa, te lo estoy"                 + '\n' +
                        "poniendo fácil para que te"                + '\n' +
                        "metas en papel.",                          "INTRO_04");
DO_TEXT("INTRO_04",     "autoconvéncete de que"                     + '\n' +
                        "ha sido idea tuya.",                       "INTRO_05");
DO_TEXT("INTRO_05",     "si es que ya ni un mínimo"                 + '\n' +
                        "de suspensión de incredulidad."            + '\n' +
                        "lo que hay que ver.",                      "INTRO_06");
DO_TEXT("INTRO_06",     "en fin...",                                "INTRO_END");
DO_TEXT("INTRO_07",     "...",                                      "INTRO_08");
DO_TEXT("INTRO_08",     "a ver, chica, ¿cómo no lo vas"             + '\n' +
                        "a saber? quiero decir...",                 "INTRO_09");
DO_TEXT("INTRO_09",     "algo te olerás, digo yo.",                 "INTRO_10");
DO_TEXT("INTRO_10",     "en fin...",                                "INTRO_END");
DO_EVENT("INTRO_END", "INTRO_END", null,                            "PRESENTATION_00");

// lights on. presentation.

DO_TEXT("PRESENTATION_00",  "me presento.",                         "PRESENTATION_01", 1);
DO_TEXT("PRESENTATION_01",  "me llamo Ribbitus McSpellhop;"         + '\n' +
                            "hechicero de profesión,"               + '\n' +
                            "oráculo en tiempos libres.",           "PRESENTATION_02", 0);
DO_TEXT("PRESENTATION_02",  "y ahora que las presentaciones"        + '\n' +
                            "están hechas...",                      "PRESENTATION_03", 1);
DO_TEXT("PRESENTATION_03",  "lo que va a pasar"                     + '\n' +
                            "es lo siguiente:",                     "PRESENTATION_04", 2);
DO_TEXT("PRESENTATION_04",  "procederé a hacerte una"               + '\n' +
                            "serie de preguntas;",                  "PRESENTATION_05");
DO_TEXT("PRESENTATION_05",  "considerando tus respuestas,"          + '\n' +
                            "los amuletos darán un vaticinio"       + '\n' +
                            "sobre qué te depara el futuro.",       "PRESENTATION_06");
DO_TEXT("PRESENTATION_06",  "está todo claro, ¿no?",                "PRESENTATION_07", 4);
DO_CHOICE("PRESENTATION_07",   "",
    [
    new ChoiceOption(   "¿qué haces? déjame en paz",                "PRESENTATION_08"),
    new ChoiceOption(   "todo claro.",                              "PRESENTATION_10")
    ]);
DO_WAIT("PRESENTATION_08", 1.8,                                     "PRESENTATION_09");
DO_TEXT("PRESENTATION_09",  "...qué trabajo tan"                    + '\n' +
                            "desagradecido.",                       "PRESENTATION_11", 2);
DO_TEXT("PRESENTATION_10",  "muy bien. así me gusta.",              "PRESENTATION_11");
DO_TEXT("PRESENTATION_11",  "bueno, se acabó la charla."            + '\n' +
                            "manos a la obra.",                     "CHOICE_SIGN_00");

// astral sign

DO_TEXT("CHOICE_SIGN_00",     "necesito que me digas...",           "CHOICE_SIGN_01");
DO_TEXT("CHOICE_SIGN_01",     "¿cuál es tu signo astral?",          "CHOICE_SIGN_02", 1);
DO_CHOICE("CHOICE_SIGN_02",   "",
    [
    new ChoiceOption(   "aries",          "CHOICE_ARIES"),
    new ChoiceOption(   "tauro",          "CHOICE_TAURUS"),
    new ChoiceOption(   "géminis",        "CHOICE_GEMINI"),
    new ChoiceOption(   "cáncer",         "CHOICE_CANCER"),
    new ChoiceOption(   "leo",            "CHOICE_LEO"),
    new ChoiceOption(   "virgo",          "CHOICE_VIRGO"),
    new ChoiceOption(   "libra",          "CHOICE_LIBRA"),
    new ChoiceOption(   "escorpio",       "CHOICE_SCORPIO"),
    new ChoiceOption(   "sagitario",      "CHOICE_SAGITTARIUS"),
    new ChoiceOption(   "capricornio",    "CHOICE_CAPRICORN"),
    new ChoiceOption(   "acuario",        "CHOICE_AQUARIUS"),
    new ChoiceOption(   "pisces",         "CHOICE_PISCES"),
    ]);
DO_EVENT("CHOICE_ARIES",       "CHOICE_SIGN", { sign: "ARIES"},       "CHOICE_SIGN_03");
DO_EVENT("CHOICE_TAURUS",      "CHOICE_SIGN", { sign: "TAURUS"},      "CHOICE_SIGN_03");
DO_EVENT("CHOICE_GEMINI",      "CHOICE_SIGN", { sign: "GEMINI"},      "CHOICE_SIGN_03");
DO_EVENT("CHOICE_CANCER",      "CHOICE_SIGN", { sign: "CANCER"},      "CHOICE_SIGN_03");
DO_EVENT("CHOICE_LEO",         "CHOICE_SIGN", { sign: "LEO"},         "CHOICE_SIGN_03");
DO_EVENT("CHOICE_VIRGO",       "CHOICE_SIGN", { sign: "VIRGO"},       "CHOICE_SIGN_03");
DO_EVENT("CHOICE_LIBRA",       "CHOICE_SIGN", { sign: "LIBRA"},       "CHOICE_SIGN_03");
DO_EVENT("CHOICE_SCORPIO",     "CHOICE_SIGN", { sign: "SCORPIO"},     "CHOICE_SIGN_03");
DO_EVENT("CHOICE_SAGITTARIUS", "CHOICE_SIGN", { sign: "SAGITTARIUS"}, "CHOICE_SIGN_03");
DO_EVENT("CHOICE_CAPRICORN",   "CHOICE_SIGN", { sign: "CAPRICORN"},   "CHOICE_SIGN_03");
DO_EVENT("CHOICE_AQUARIUS",    "CHOICE_SIGN", { sign: "AQUARIUS"},    "CHOICE_SIGN_03");
DO_EVENT("CHOICE_PISCES",      "CHOICE_SIGN", { sign: "PISCES"},      "CHOICE_SIGN_03");

DO_TEXT("CHOICE_SIGN_03",       "bien, bien...",                    "CHOICE_SIGN_04");
DO_TEXT("CHOICE_SIGN_04",       "(por supuesto, yo ya lo sabía)",   "CHOICE_SIGN_05", 1);
DO_TEXT("CHOICE_SIGN_05",       "(solo intento hacerte"             + '\n' +
                                "sentir partícipe)",                "CHOICE_SIGN_06");
DO_TEXT("CHOICE_SIGN_06",       "acorde a tu signo ascendente,"     + '\n' +
                                "recurriremos a este amuleto:",     "CHOICE_SIGN_SHOW", 4);
DO_EVENT("CHOICE_SIGN_SHOW",    "SHOW_ITEM", { index: 0 },          "CHOICE_LOL_00");


// league of legends

DO_TEXT("CHOICE_LOL_00",        "de acuerdo, a continuación"        + '\n' +
                                "una pregunta de reflejos.",        "CHOICE_LOL_01");
DO_TEXT("CHOICE_LOL_01",        "necesito que respondas rápido,"    + '\n' +
                                "lo primero que te venga,"           + '\n' +
                                "sin pensar.",                      "CHOICE_LOL_02", 4);
DO_TEXT("CHOICE_LOL_02",        "...",                              "CHOICE_LOL_03");
DO_TEXT("CHOICE_LOL_03",        "elige línea. YA!",                 "CHOICE_LOL_04", 2);
DO_CHOICE("CHOICE_LOL_04",      "",
    [
    new ChoiceOption("top",                         "CHOICE_LOL_05"),
    new ChoiceOption("mid",                         "CHOICE_LOL_06"),
    new ChoiceOption("bottom",                      "CHOICE_LOL_07"),
    new ChoiceOption("al tomar por culo. jungla.",  "CHOICE_LOL_08")
    ]);
DO_EVENT("CHOICE_LOL_05",    "CHOICE_SIGN", { sign: "LEO"},         "CHOICE_LOL_09");
DO_EVENT("CHOICE_LOL_06",    "CHOICE_SIGN", { sign: "LIBRA"},       "CHOICE_LOL_09");
DO_EVENT("CHOICE_LOL_07",    "CHOICE_SIGN", { sign: "PISCES"},      "CHOICE_LOL_09");
DO_EVENT("CHOICE_LOL_08",    "CHOICE_SIGN", { sign: "SCORPIO"},     "CHOICE_LOL_09");
DO_TEXT("CHOICE_LOL_09",     "ya veo, ya...",                       "CHOICE_LOL_10", 3);
DO_TEXT("CHOICE_LOL_10",     "pues este amuleto pa la saca.",       "CHOICE_LOL_SHOW");
DO_EVENT("CHOICE_LOL_SHOW",  "SHOW_ITEM",   { index: 1 },           "CHOICE_BEE_00");


// bee

DO_TEXT("CHOICE_BEE_00",    "bueno, sigamos. ahora"                 + '\n' +
                            "quiero que hagas un ejercicio"         + '\n' +
                            "de imaginación:",                      "CHOICE_BEE_01");
DO_TEXT("CHOICE_BEE_01",    "ves una abeja yendo a su"              + '\n' +
                            "bola por el bosque...",                "CHOICE_BEE_02", 4);
DO_TEXT("CHOICE_BEE_02",    "y, a todas estas, parar a"             + '\n' +
                            "descansar sobre una flor.",            "CHOICE_BEE_03");
DO_TEXT("CHOICE_BEE_03",    "¿de qué color es esa flor?",           "CHOICE_BEE_04", 2);
DO_CHOICE("CHOICE_BEE_04",   "",
    [
    new ChoiceOption("blanca",           "CHOICE_BEE_RANDOM"),
    new ChoiceOption("roja",             "CHOICE_BEE_RANDOM"),
    new ChoiceOption("amarilla",         "CHOICE_BEE_YELLOW"),
    new ChoiceOption("azul",             "CHOICE_BEE_RANDOM"),
    new ChoiceOption("violeta",          "CHOICE_BEE_RANDOM")
    ]);
DO_EVENT("CHOICE_BEE_YELLOW",    "CHOICE_SIGN", { sign: "VIRGO"},   "CHOICE_BEE_05");
DO_EVENT("CHOICE_BEE_RANDOM",    "CHOICE_SIGN", { sign: "RANDOM"},  "CHOICE_BEE_05");
DO_TEXT("CHOICE_BEE_05",     "bien, un amuleto más.",               "CHOICE_BEE_SHOW");
DO_EVENT("CHOICE_BEE_SHOW",  "SHOW_ITEM",   { index: 2 },           "CHOICE_ACTOR_00");


// actor

DO_TEXT("CHOICE_ACTOR_00",     "y por último...",                   "CHOICE_ACTOR_01");
DO_TEXT("CHOICE_ACTOR_01",     "¿Paul Mescal o Pedro Pascal?",      "CHOICE_ACTOR_02", 1);
DO_CHOICE("CHOICE_ACTOR_02",   "",
    [
    new ChoiceOption(   "Paul Mescal",                              "CHOICE_ACTOR_03"),
    new ChoiceOption(   "Pedro Pascal",                             "CHOICE_ACTOR_03")
    ]);
DO_TEXT("CHOICE_ACTOR_03",     "vaya...",                           "CHOICE_ACTOR_04", 3);
DO_TEXT("CHOICE_ACTOR_04",     "sinceramente, esta era"             + '\n' +
                               "solo por curiosidad.",              "THROW_00", 4);


// throw items

DO_TEXT("THROW_00",     "pues ha llegado la hora...",               "THROW_01");
DO_TEXT("THROW_01",     "...de lanzar los amuletos y"               + '\n' +
                        "leer qué te depara la fortuna.",           "THROW_02");
DO_TEXT("THROW_02",     "¿lista?",                                  "THROW_03", 4);
DO_CHOICE("THROW_03",   "",
    [
    new ChoiceOption(   "haz los honores",                          "THROW_04"),
    new ChoiceOption(   "no estoy preparada",                       "THROW_05")
    ]);
DO_TEXT("THROW_04",     "no se hable más, entonces.",               "THROW_06", 2);
DO_TEXT("THROW_05",     "haber estudiao.",                          "THROW_06", 1);
DO_TEXT("THROW_06",     "allá vamos.",                              "THROW_07", 2);
DO_EVENT("THROW_07",    "THROW_ITEMS", null,                        "THROW_08");
DO_WAIT("THROW_08", 1.8,                                            "THROW_09");
DO_TEXT("THROW_09",     "veamos qué auguran...",                    "PREDICTIONS_00", 1);


// predictions

DO_TEXT("PREDICTIONS_00",   "hm... interesante...",                 "PREDICTIONS_01", 2);
DO_CHOICE("PREDICTIONS_01", " ",
    [
    new ChoiceOption(   "...",                                  "PREDICTIONS_02"),
    new ChoiceOption(   "explica. ya.",                         "PREDICTIONS_02")
    ]);
DO_TEXT("PREDICTIONS_02",   "el futuro que muestran"                + '\n' +
                            "es cercano...",                        "PREDICTIONS_03");
DO_TEXT("PREDICTIONS_03",   "MUY cercano.",                         "PREDICTIONS_04", 3);
DO_TEXT("PREDICTIONS_04",   "este viernes.",                        "PREDICTIONS_05");
DO_CHOICE("PREDICTIONS_05", " ",
    [
    new ChoiceOption(   "ahá.",                                     "PREDICTIONS_06"),
    new ChoiceOption(   "¿qué más?",                                "PREDICTIONS_06")
    ]);
DO_TEXT("PREDICTIONS_06",   "hay algo de fondo..."                  + '\n' +
                            "parece...",                            "PREDICTIONS_07");
DO_TEXT("PREDICTIONS_07",   "una película.",                        "PREDICTIONS_08", 1);
DO_CHOICE("PREDICTIONS_08", " ",
    [
    new ChoiceOption(   "un thriller",                              "PREDICTIONS_09"),
    new ChoiceOption(   "de animación",                             "PREDICTIONS_09"),
    new ChoiceOption(   "de fantasía",                              "PREDICTIONS_09"),
    ]);
DO_TEXT("PREDICTIONS_09",   "para nada.",                           "PREDICTIONS_10");
DO_TEXT("PREDICTIONS_10",   "no es nada menos que una"              + '\n' +
                            "comedia romántica.",                   "PREDICTIONS_11");
DO_TEXT("PREDICTIONS_11",   "y de las cursis.",                     "PREDICTIONS_12", 3);
DO_TEXT("PREDICTIONS_12",   "...pero tiene algo que"                + '\n' +
                            "la mejora bastante.",                  "PREDICTIONS_13", 4);
DO_CHOICE("PREDICTIONS_13", " ",
    [
    new ChoiceOption(   "de los early 00s",                         "PREDICTIONS_14"),
    new ChoiceOption(   "Matthew McConaughey",                      "PREDICTIONS_14"),
    new ChoiceOption(   "mueren todos",                             "PREDICTIONS_14"),
    ]);
DO_TEXT("PREDICTIONS_14",   "nope. nada de eso.",                   "PREDICTIONS_15", 1);
DO_WAIT("PREDICTIONS_15", 0.9,                                      "PREDICTIONS_16");
DO_TEXT("PREDICTIONS_16",   "resulta que... la estás"               + '\n' +
                            "viendo con otra persona"               + '\n' +
                            "por Discord...",                       "PREDICTIONS_17");
DO_WAIT("PREDICTIONS_17", 0.9,                                      "PREDICTIONS_18");
DO_CHOICE("PREDICTIONS_18", "",
    [
    new ChoiceOption(   "hm... ¿seguro?",                           "ENDING_00"),
    new ChoiceOption(   "demasiado detalle, ¿no?",                  "ENDING_00")
    ]);


// ending

DO_TEXT("ENDING_00",    "...",                                      "ENDING_01", 2);
DO_TEXT("ENDING_01",    "vale, no te voy a mentir.",                "ENDING_02", 1);
DO_TEXT("ENDING_02",    "todo esta historia no es"                  + '\n' +
                        "exactamente lo que los"                    + '\n' +
                        "amuletos muestran.",                       "ENDING_03", 4);
DO_TEXT("ENDING_03",    "porque alguien me ha pedido"               + '\n' +
                        "que te cuente una versión..."              + '\n' +
                        "* personalizada *.",                       "ENDING_04");
DO_TEXT("ENDING_04",    "mira, yo qué sé, el chaval"                + '\n' +
                        "parecía ilusionao, ¿vale?",                "ENDING_05A", 4);
DO_TEXT("ENDING_05A",   "le ha dedicado un domingo"                 + '\n' +
                        "entero a hacer una movida"                 + '\n' +
                        "de \"carta jugable\" o algo.",             "ENDING_05B");
DO_TEXT("ENDING_05B",   "solo pa pedir una cita."                   + '\n' +
                        "completamente teenager, vamos.",           "ENDING_06", 1);
DO_TEXT("ENDING_06",    "total, que con todo esto..."                 + '\n' +
                        "me acabó convenciendo.",                   "ENDING_07");
DO_WAIT("ENDING_07", 0.8,                                           "ENDING_08");
DO_TEXT("ENDING_08",    "(y me prometió un tupper de"               + '\n' +
                        "pasta boloñesa si esto colaba)",           "ENDING_09", 3);
DO_CHOICE("ENDING_09",  " ", 
    [
    new ChoiceOption(   "la madre que lo parió",                    "ENDING_10"),
    new ChoiceOption(   "...",                                      "ENDING_11")
    ]);
DO_TEXT("ENDING_10",    "lo que habrá tenido que"                   + '\n' +
                        "aguantar, pobre mujer.",                   "ENDING_11A", 4);
DO_TEXT("ENDING_11A",   "pero bueno. al final del"                  + '\n' +
                        "día, esta movida es un poco"               + '\n' +
                        "por la tontería.",                         "ENDING_11B");
DO_TEXT("ENDING_11B",   "porque al final solo tú"             + '\n' +
                        "eres quien decide qué"               + '\n' +
                        "harás este viernes.",                      "ENDING_12");
DO_TEXT("ENDING_12",    "y total, el pavo estará feliz"              + '\n' +
                        "viendo una peli contigo, ya"            + '\n' +
                        "sea el día de San Valentín,"            + '\n' +
                        "como si es el anterior",                   "ENDING_13", 4);
DO_TEXT("ENDING_13",    "...que es San Benigno"                     + '\n' +
                        "y a nadie le importa.",                    "ENDING_14", 3);
DO_WAIT("ENDING_14", 0.5,                                           "ENDING_15A");
DO_TEXT("ENDING_15A",   "de todas maneras, vamos a"                 + '\n' +
                        "cerrar esto with a"                        + '\n' +
                        "cherry on top.",                           "ENDING_15B");
DO_TEXT("ENDING_15B",   "así que, como dice"                        + '\n' +
                        "Kelly el Metralletas...",                  "ENDING_15C", 1);
DO_TEXT("ENDING_15C",   "will you be his"                           + '\n' +
                        "bloody valentine?",                        "ENDING_16");
DO_TEXT("ENDING_16",    "sea lo que decidas, aprovecha"             + '\n' +
                        "ahora para mandarle un mensaje"            + '\n' +
                        "y decirle qué onda.",                      "ENDING_17", 4);
DO_WAIT("ENDING_17", 1.2,                                           "ENDING_18");
DO_TEXT("ENDING_18",    "...y dile que me debe un bizum.",          "ENDING_19", 1);
DO_WAIT("ENDING_19", 0.6,                                           "GAME_END");

DO_EVENT("GAME_END", "GAME_END", null,                              "_");