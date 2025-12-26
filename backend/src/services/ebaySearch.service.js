import { getEbayAccessToken } from "./getEbayAccessToken.service.js";

export async function searchEbay(req, res) {
  try {
    const { access_token, expires_in } = await getEbayAccessToken();

    const response = await fetch(
      "https://api.ebay.com/buy/browse/v1/item_summary/search?q=etb évolutions prismatiques",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "X-EBAY-C-MARKETPLACE-ID": "EBAY_FR",
        },
      }
    );

    const data = await response.json();

    res.status(response.status).json({
      success: true,
      tokenExpiresIn: expires_in,
      data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
