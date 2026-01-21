import requests

COINGECKO_API = "https://api.coingecko.com/api/v3/coins/markets"

def get_top_coins(n: int = 10, currency: str = "usd"):
    params = {
        "vs_currency": currency,
        "order": "market_cap_desc",
        "per_page": n,
        "page": 1,
        "sparkline": "false"
    }

    response = requests.get(COINGECKO_API, params=params)
    response.raise_for_status()

    return response.json()

def main():
    top_coins = get_top_coins(10)

    print("\nTop 10 Cryptocurrencies by Market Cap:\n" + "-" * 40)
    for coin in top_coins:
        print(f"{coin['market_cap_rank']:>2}. {coin['name']} ({coin['symbol'].upper()}) - ${coin['current_price']}")

if __name__ == "__main__":
    main()