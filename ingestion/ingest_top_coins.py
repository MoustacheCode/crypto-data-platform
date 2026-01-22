import requests
import psycopg2
from psycopg2.extras import execute_values
from datetime import datetime, timezone
from dotenv import load_dotenv
import os

load_dotenv()

def fetch_top_coins():
    url = "https://api.coingecko.com/api/v3/coins/markets"
    params = {
        "vs_currency": "usd",
        "order": "market_cap_desc",
        "per_page": 50,
        "page": 1,
        "sparkline": "false"
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

def load_to_postgres(data):
    conn = psycopg2.connect(
        dbname=os.getenv("POSTGRES_DB"),
        user=os.getenv("POSTGRES_USER"),
        password=os.getenv("POSTGRES_PASSWORD"),
        host=os.getenv("POSTGRES_HOST"),
        port=os.getenv("POSTGRES_PORT")
    )
    cur = conn.cursor()

    rows = [
        (
            coin["id"],
            coin["symbol"],
            coin["name"],
            coin["market_cap_rank"],
            coin["current_price"],
            datetime.now(timezone.utc)
        )
        for coin in data
    ]

    insert_query = """
        INSERT INTO raw.top_coins (
            coin_id, symbol, name, market_cap_rank, current_price, last_updated
        )
        VALUES %s
    """

    execute_values(cur, insert_query, rows)
    conn.commit()
    cur.close()
    conn.close()

def main():
    data = fetch_top_coins()
    load_to_postgres(data)

if __name__ == "__main__":
    try:
        main() 
    except Exception as e:
        print(f"Error during ingestion: {e}") 
        raise
