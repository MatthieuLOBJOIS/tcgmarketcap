import TCGdex from "@tcgdex/sdk";

const tcgdex = new TCGdex("fr");

const card = await tcgdex.card.get("sv08.5-136");

console.log(card);
