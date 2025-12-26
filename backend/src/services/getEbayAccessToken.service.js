let cachedToken = null;
let expiresAt = 0;

export async function getEbayAccessToken() {
  if (cachedToken && Date.now() < expiresAt) {
    return cachedToken;
  }

  const credentials = Buffer.from(
    `${process.env.EBAY_CLIENT_ID}:${process.env.EBAY_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(
    "https://api.ebay.com/identity/v1/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${credentials}`,
      },
      body: "grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope",
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = await response.json();
  cachedToken = data;
  expiresAt = Date.now() + (data.expires_in - 60) * 1000;

  return data;
}
