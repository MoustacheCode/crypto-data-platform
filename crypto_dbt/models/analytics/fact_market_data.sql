select
    coin_id,
    current_price,
    market_cap_rank,
    last_updated
from {{ ref('stg_top_coins') }}
