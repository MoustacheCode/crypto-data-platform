with ranked as (
    select
        *,
        row_number() over (
            partition by coin_id
            order by last_updated desc
        ) as rn
    from {{ source('raw', 'top_coins') }}
)

select
    coin_id,
    name,
    symbol,
    current_price,
    market_cap_rank,
    last_updated
from ranked
where rn = 1
