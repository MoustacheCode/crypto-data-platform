select
    coin_id,
    symbol,
    name,
    market_cap_rank
from {{ ref('stg_top_coins') }}
