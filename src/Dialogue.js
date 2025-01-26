

var nodeMap = new Map();
var entryNodeId = "ENTRY";

function DO_TEXT(id, text, nextNodeId)
{
    nodeMap.set(id, new GameNodeText(text, nextNodeId));
}

function DO_CHOICE(id, text, options)
{
    nodeMap.set(id, new GameNodeChoice(text, options));
}

function DO_WAIT(id, time, nextNodeId)
{
    nodeMap.set(id, new GameNodeWaitSeconds(time, nextNodeId));
}

function DO_EVENT(id, eventId, nextNodeId)
{
    nodeMap.set(id, new GameNodeEvent(eventId, nextNodeId));
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

DO_WAIT("ENTRY", 1.0,                                               "ENTRY_text");
DO_TEXT("ENTRY_text",   "saludos.",                                 "INTRO_00");
DO_TEXT("INTRO_00",     "te estaba esperando...",                   "INTRO_01");
DO_TEXT("INTRO_01",     "los amuletos auguraron que vendrías"       + '\n' +
                        "buscando consejo.",                        "INTRO_02");
DO_CHOICE("INTRO_02",   "",
    [
    new ChoiceOption(   "yo no he decidido venir aquí",             "INTRO_03"),
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
DO_EVENT("INTRO_END", "INTRO_END",                                  "TODO");

// TODO: lights on

// TODO: all the content

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

DO_EVENT("GAME_END", "GAME_END",                                    "_");
// TODO: end the game