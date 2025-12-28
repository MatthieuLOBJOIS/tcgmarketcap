import TCGdex from "@tcgdex/sdk";

const tcgdex = new TCGdex("fr");

const card = await tcgdex.card.get("sv08.5-136");
const fullSet = await tcgdex.set.get("swsh3");

console.log(card.pricing);
//console.log(fullSet);
