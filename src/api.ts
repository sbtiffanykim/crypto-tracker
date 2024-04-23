const BASE_URL = `https://api.coingecko.com/api/v3/coins`;

export function fetchCoins() {
  return fetch(
    `${BASE_URL}/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1`
  ).then((response) => response.json());
}

export function fetchCoinDetail(coinId: string | undefined) {
  return fetch(`${BASE_URL}/${coinId}?localization=false`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string | undefined) {
  return fetch(`${BASE_URL}/${coinId}/ohlc?vs_currency=usd&days=1`).then((response) =>
    response.json()
  );
}
