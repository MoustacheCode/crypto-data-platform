select
    coin_id,
    symbol,
    name,
    current_price,
    market_cap_rank,
    dbt_valid_from as valid_from,
    dbt_valid_to as valid_to
from {{ ref('top_coins_snapshot') }}
order by coin_id, valid_from
