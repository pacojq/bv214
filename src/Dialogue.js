

var nodeMap = new Map();
var entryNodeId = "SHORTCUT"; //"ENTRY";

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

DO_EVENT("SHORTCUT", "INTRO_END", null, "CHOICE_SIGN_00");



DO_WAIT("ENTRY", 1.0,                                               "ENTRY_text");
DO_TEXT("ENTRY_text",   "saludos.",                                 "INTRO_00");
DO_TEXT("INTRO_00",     "te estaba esperando...",                   "INTRO_01");
DO_TEXT("INTRO_01",     "los amuletos auguraron que vendrías"       + '\n' +
                        "buscando consejo.",                        "INTRO_02");
DO_CHOICE("INTRO_02",   "",
    [
    new ChoiceOption(   "yo no quiero consejo de nadie",            "INTRO_03"),
    new ChoiceOption(   "venir... ¿a dónde, exactamente?",          "INTRO_07")
    ]);
DO_TEXT("INTRO_03",     "a ver, guapa, te lo estoy poniendo"        + '\n' +
                        "fácil para que te metas en papel.",        "INTRO_04");
DO_TEXT("INTRO_04",     "autoconvéncete de que ha sido"             + '\n' +
                        "idea tuya.",                               "INTRO_05");
DO_TEXT("INTRO_05",     "si es que ya no se ofrece ni un"           + '\n' +
                        "mínimo de suspensión de"                   + '\n' +
                        "incredulidad. lo que hay que ver.",        "INTRO_06");
DO_TEXT("INTRO_06",     "en fin.",                                  "INTRO_END");
DO_TEXT("INTRO_07",     "...",                                      "INTRO_08");
DO_TEXT("INTRO_08",     "¿es broma, no?",                           "INTRO_09");
DO_TEXT("INTRO_09",     "a ver, chica, ¿cómo no lo vas"             + '\n' +
                        "a saber? quiero decir...",                 "INTRO_10");
DO_TEXT("INTRO_10",     "en fin. ya está. me diré que"              + '\n' +
                        "intentas vacilarme y ya.",                 "INTRO_END");
DO_EVENT("INTRO_END", "INTRO_END", null,                            "PRESENTATION_00");

// lights on. presentation.

DO_TEXT("PRESENTATION_00",  "me presento.",                         "PRESENTATION_01", 1);
DO_TEXT("PRESENTATION_01",  "mi nombre es Ribbitus McSpellhop,"     + '\n' +
                            "hechicero de profesión, oráculo"       + '\n' +
                            "en mis tiempos libres.",               "PRESENTATION_02", 0);
DO_TEXT("PRESENTATION_02",  "y ahora que las presentaciones"        + '\n' +
                            "están hechas...",                      "PRESENTATION_03", 1);
DO_TEXT("PRESENTATION_03",  "lo que va a pasar es lo"               + '\n' +
                            "siguiente:",                           "PRESENTATION_04", 2);
DO_TEXT("PRESENTATION_04",  "procederé a hacerte una serie"         + '\n' +
                            "de preguntas;",                         "PRESENTATION_05");
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
DO_TEXT("PRESENTATION_09",  "...qué trabajo tan desagradecido.",    "PRESENTATION_11", 2);
DO_TEXT("PRESENTATION_10",  "muy bien. así me gusta.",              "PRESENTATION_11");
DO_TEXT("PRESENTATION_11",  "bueno, se acabó la charla."            + '\n' +
                            "manos a la obra.",                     "CHOICE_SIGN_00");

// astral sign

DO_TEXT("CHOICE_SIGN_00",     "necesito que me digas...",           "CHOICE_SIGN_01");
DO_TEXT("CHOICE_SIGN_01",     "¿cuál es tu signo astral?",          "CHOICE_SIGN_02");
DO_CHOICE("CHOICE_SIGN_02",   "",
    [
    new ChoiceOption(   "aries",             "CHOICE_ARIES"),
    new ChoiceOption(   "tauro",             "CHOICE_TAURUS"),
    new ChoiceOption(   "géminis",             "CHOICE_GEMINI"),
    new ChoiceOption(   "cáncer",             "CHOICE_CANCER"),
    new ChoiceOption(   "leo",          "CHOICE_LEO"),
    new ChoiceOption(   "virgo",          "CHOICE_VIRGO"),
    new ChoiceOption(   "libra",          "CHOICE_LIBRA"),
    new ChoiceOption(   "escorpio",          "CHOICE_SCORPIO"),
    new ChoiceOption(   "sagitario",          "CHOICE_SAGITTARIUS"),
    new ChoiceOption(   "capricornio",          "CHOICE_CAPRICORN"),
    new ChoiceOption(   "acuario",          "CHOICE_AQUARIUS"),
    new ChoiceOption(   "pisces",          "CHOICE_PISCES"),
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
DO_TEXT("CHOICE_SIGN_04",       "(por supuesto, yo ya lo sabía)",   "CHOICE_SIGN_05");
DO_TEXT("CHOICE_SIGN_05",       "(solo intento hacerte"             + '\n' +
                                "sentir partícipe)",                "CHOICE_SIGN_06");
DO_TEXT("CHOICE_SIGN_06",       "acorde a tu signo ascendente,"     + '\n' +
                                "recurriremos a este amuleto:",     "CHOICE_SIGN_SHOW");
DO_EVENT("CHOICE_SIGN_SHOW",    "SHOW_ITEM", { index: 0 },          "CHOICE_SIGN_07");


// actor

DO_TEXT("CHOICE_ACTOR_00",     "y por último...",                   "CHOICE_ACTOR_01");
DO_TEXT("CHOICE_ACTOR_01",     "¿Paul Mescal o Pedro Pascal?",      "CHOICE_ACTOR_02");
DO_CHOICE("CHOICE_ACTOR_02",   "",
    [
    new ChoiceOption(   "Paul Mescal",                              "CHOICE_ACTOR_03"),
    new ChoiceOption(   "Pedro Pascal?",                            "CHOICE_ACTOR_03")
    ]);
 DO_TEXT("CHOICE_ACTOR_03",     "vaya...",                          "CHOICE_ACTOR_04", 3);
 DO_TEXT("CHOICE_ACTOR_04",     "sinceramente, esta era solo"       + '\n' +
                                "por curiosidad.",                  "TODO", 4);


// TODO: all the content

// ending

DO_TEXT("ENDING_00",    "...",                                      "ENDING_01");
DO_TEXT("ENDING_01",    "vale, no te voy a mentir.",                "ENDING_02");
DO_TEXT("ENDING_02",    "lo que te he dicho no es del todo"         + '\n' +
                        "lo que muestran los amuletos...",          "ENDING_03");
DO_TEXT("ENDING_03",    "...porque hay una persona que me ha"       + '\n' +
                        "pedido que hasí lo haga.",                 "ENDING_04");
DO_TEXT("ENDING_04",    "mira, no sé, el chaval parecía"            + '\n' +
                        "ilusionao, ¿vale?",                        "ENDING_05");
DO_TEXT("ENDING_05",    "le ha dedicado un domingo entero a"        + '\n' +
                        "hacer rollo una carta o no sé qué"         + '\n' +
                        "pa pedir una cita. Completamente"          + '\n' +
                        "teenager, vamos.",                         "ENDING_06");
DO_TEXT("ENDING_06",    "total, que al final me convenció.",        "ENDING_07");
DO_WAIT("ENDING_07", 1.0,                                           "ENDING_08");
DO_TEXT("ENDING_08",    "(encima me ha prometido darme un"          + '\n' +
                        "tupper con pasta boloñesa si esto"         + '\n' +
                        "salía bien)",                              "ENDING_09");
DO_CHOICE("ENDING_09",  "", 
    [
    new ChoiceOption(   "la madre que lo parió",                    "ENDING_10"),
    new ChoiceOption(   "...",                                      "ENDING_11")
    ]);
DO_TEXT("ENDING_10",    "lo que habrá tenido que aguantar,"         + '\n' +
                        "pobre mujer.",                             "ENDING_11");
DO_TEXT("ENDING_11",    "lo cierto es que... al final,"             + '\n' +
                        "eres tú quien decide qué va"               + '\n' +
                        "a hacer el viernes.",                      "ENDING_12");
DO_TEXT("ENDING_12",    "porque total, el pavo estará"              + '\n' +
                        "contento viendo una peli contigo,"         + '\n' +
                        "tanto si es el día de San Valentín,"       + '\n' +
                        "como si es el anterior",                   "ENDING_13");
DO_TEXT("ENDING_13",    "...que es San Benigno y a nadie"           + '\n' +
                        "le importa.",                              "ENDING_14");
DO_WAIT("ENDING_14", 1.0,                                           "ENDING_15");
DO_TEXT("ENDING_15",    "así que en fin, como dice"                 + '\n' +
                        "Kelly el Metralletas..."                   + '\n' +
                        "will you be his bloody valentine?",        "ENDING_16");
DO_TEXT("ENDING_16",    "decidas lo que decidas, aprovecha"         + '\n' +
                        "ahora para mandarle un mensaje,"           + '\n' +
                        "y le dices qué tal.",                      "ENDING_17");
DO_WAIT("ENDING_17", 3.0,                                           "ENDING_18");
DO_TEXT("ENDING_18",    "...y dile que me debe un bizum.",          "GAME_END");

DO_EVENT("GAME_END", "GAME_END", null,                              "_");
// TODO: end the game