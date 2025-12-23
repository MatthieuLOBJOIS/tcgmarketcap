// Importation des modules
import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

// Chargement des variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Route de base
app.get("/", (req, res) => {
  res.json({ message: "Bonjour, ceci est un message JSON !" });
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

const ACCESS_TOKEN =
  "v^1.1#i^1#r^0#p^1#I^3#f^0#t^H4sIAAAAAAAA/+VYe2wURRjv9UUaKI9QxSDquSAaye3t454b7pJrC7TQF73jxAZSZndn26X7YmeO9iSYWgMGAwYxYsASGjURH1ESUUg0DQFEIpgo4REiCTH4QCQGDVGMRJzdltJWAkiP2MT75zLffPPN7/vN95gdprO45PG1VWt/L/WMye/pZDrzPR52LFNSXDRrfEH+1KI8ZpCCp6dzRmdhV8G52QjomiU0QmSZBoLeDl0zkOAKY1TGNgQTIBUJBtAhErAkJBO1NQJHM4Jlm9iUTI3yVlfGqDCjhEMyD8UgH5C5AEOkxjWbKTNGwYDCQ0lheU7keBAQyTxCGVhtIAwMHKM4hgv6WM7H8SmOFzhGYHg6xEWbKG8a2kg1DaJCM1TchSu4a+1BWG8OFSAEbUyMUPHqxNxkfaK6ck5darZ/kK14Pw9JDHAGDR1VmDL0poGWgTffBrnaQjIjSRAhyh/v22GoUSFxDcwdwHepjvKswrFBHkbYABuOBHNC5VzT1gG+OQ5Hoso+xVUVoIFVnL0Vo4QNcTmUcP+ojpiorvQ6fwszQFMVFdoxak554slEQwMVrwUYt6ow40tVzKsFdhv0NTRW+iKQ4eWwIsk+LhANhqIhpX+jPmv9NA/bqcI0ZNUhDXnrTFwOCWo4nBt2EDdEqd6otxMKdhAN6AVSDHuNQzbY5Bxq3ylmcKvhnCvUCRFed3jrExhYjbGtihkMBywMn3ApilHAslSZGj7pxmJ/+HSgGNWKsSX4/e3t7XQ7T5t2i59jGNa/uLYmKbVCHVBE18n1Pn311gt8quuKBMlKpAo4axEsHSRWCQCjhYoHg0w4yvTzPhRWfLj0H4JBPvuHZkSuMkSUJU4MQCkaZETIR8O5yJB4f5D6HRxQBFmf7gQotjQgQZ9E4iyjQ1uVBT6ocHxEgT45FFV8gaii+MSgHPKxCoQMhKIoRSP/p0S53VBPQsmGOCexnrM451bqVSZUa5ZDMSKnsiukpkiTXlHVBFZio/YJpCdrkrXpOWmGL4/Ebjcbbuh8haYSZlJk/1wQ4OR67kioMhGG8ojcS0qmBRtMTZWyo+uAeVtuADbOJqGmEcGInExYVnVuanXO3PuXZeLO/M5dj/qP+tMNvUJOyI4ur5z1iBgAlko7HYiWTN3v5LoJyPXDETe7qL03VBym5Ccy0rAkSJO+JItAaqNtCGTT0LIj4k0lN99RxRrxs48EVe67stIuEzRaKRGPkZkhHCC63rnBpcw2aJB+iG1T06CdZkdcD3Q9g4GowdFWGHKQICoYZc2aDYdCQZ6s4Ufkl+S24ubRVtKcUl7Y5QF3vZw3QqDpo8t3yzbljOTcUe/CJ4d/6ANIPM/9sV2efUyXpzff42FmM4+w05mHiwsWFRaMm4pUDGkVKDRSWwzyXW9Dug1mLaDa+ZPzPj9+qu7Bj+fvWPftlM41M/yb8sYPen/pWcrcN/ACU1LAjh30HMNMuz5TxE6YUsoFWY7jOTeem5jp12cL2XsLyzbvON+x5aNEyaaWC8GH1NP73jo7fx9TOqDk8RTlkWDJC5w9Vz9lo2q0nV724imqmb/4m9T115fHXsiyWy/s3bh9ps6OSXcfpt5ecWL/9q/OZNjLlufQ05tnrNpWOemBrhNHO4v37AqsPrOrPPVm8Z+Jb8Ldhw/ttRaXnnxlZ4WnsHdS5srOp+6f1HRy1sHXwo+O2fbqF0vEvAk9z2zwp94HvRPlT3Y/v7WgFcrjJi6Zv0DevTy4cOG7F6+umjbtse8WHW757PjV3pq5n6799Zcje46tZxY0l/1wfHVvNVwz8+ilUJdZBqKb3/hJO5j+w6eXHnr5x3ULzh9AqGR/48/3lHUvXTyhJLGs9fXJpw+889xL35dexqC75sCHpR+sXzQvveXSWe97X1+RlxzZ8GzfWf4NmLdLDhkTAAA=";

const res = await fetch(
  "https://api.ebay.com/buy/browse/v1/item_summary/search?q=charizard&filter=soldItemsOnly:true",
  {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "X-EBAY-C-MARKETPLACE-ID": "EBAY_FR",
    },
  }
);

const data = await res.json();
console.log(data.itemSummaries);
