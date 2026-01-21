import requests

from src.ingestion.save_top_coins import save_top_coins

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
    save_top_coins(top_coins) 
    print("Top coins saved to database.")

if __name__ == "__main__":
    main()