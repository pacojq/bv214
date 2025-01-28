
class SoothsayerItem
{
    constructor(id, name, img)
    {
        this.id = id;
        this.name = name;
        this.sprite = new Sprite(img);
    }
}

class Soothsaying
{
    constructor(layer)
    {
        this.layer = layer;
        this.items = [];

        const ASTRO_SIGN_SOOTHSAYING_ITEMS =
        [
            new SoothsayerItem("ARIES",       "cuerno de carnero", res.spr_item_aries),
            new SoothsayerItem("TAURUS",      "rabo de toro", res.spr_item_taurus),
            new SoothsayerItem("GEMINI",      "raíz de madreselva", res.spr_item_gemini),
            new SoothsayerItem("CANCER",      "pinza de cangrejo", res.spr_item_cancer),
            new SoothsayerItem("LEO",         "colmillo de león", res.spr_item_leo),
            new SoothsayerItem("VIRGO",       "hoja de té", res.spr_item_virgo),
            new SoothsayerItem("LIBRA",       "pluma de paloma", res.spr_item_libra),
            new SoothsayerItem("SCORPIO",     "cola de escorpión", res.spr_item_scorpio),
            new SoothsayerItem("SAGITTARIUS", "fragmento de saeta", res.spr_item_sagittarius),
            new SoothsayerItem("CAPRICORN",   "pezuña de cabra", res.spr_item_capricorn),
            new SoothsayerItem("AQUARIUS",    "espina de calamar", res.spr_item_aquarius),
            new SoothsayerItem("PISCES",      "cabeza de sardina", res.spr_item_pisces)
        ];

        this.openMap = new Map();
        for (let i = 0; i < ASTRO_SIGN_SOOTHSAYING_ITEMS.length; i++)
        {
            let item = ASTRO_SIGN_SOOTHSAYING_ITEMS[i];
            this.openMap.set(item.id, item);
        }
    }

    itemCount() { return this.items.length; }

    pushItem(itemId)
    {
        console.log("pushing item");
        if (itemId == "RANDOM" || !this.openMap.has(itemId))
        {
            let temp = [];
            this.openMap.keys().forEach(e => { temp.push(e); });
            itemId = temp[irandom(temp.length)];
            console.warn("random itemId: '" + itemId + "'");
        }

        let item = this.openMap.get(itemId);
        console.log(item);
        this.openMap.delete(itemId);
        this.items.push(item);
    }

    getItem(index)
    {
        return this.items[index];
    }
}