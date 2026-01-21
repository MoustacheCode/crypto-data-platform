from typing import List, Dict
from src.db.connection import get_connection


def save_top_coins(coins: List[Dict]):
    insert_query = """
        INSERT INTO raw.top_coins (
            coin_id, symbol, name, market_cap_rank, current_price, last_updated
        )
        VALUES (%s, %s, %s, %s, %s, %s)
        ON CONFLICT (coin_id)
        DO UPDATE SET
            symbol = EXCLUDED.symbol,
            name = EXCLUDED.name,
            market_cap_rank = EXCLUDED.market_cap_rank,
            current_price = EXCLUDED.current_price,
            last_updated = EXCLUDED.last_updated;
    """

    conn = get_connection()
    cur = conn.cursor()

    for coin in coins:
        cur.execute(
            insert_query,
            (
                coin["id"],
                coin["symbol"],
                coin["name"],
                coin["market_cap_rank"],
                coin["current_price"],
                coin["last_updated"],
            ),
        )

    conn.commit()
    cur.close()
    conn.close()
