with base as (
    select *
    from {{ ref('stg_top_coins') }}
),

deduped as (
    select
        *,
        row_number() over (
            partition by coin_id
            order by last_updated desc
        ) as rn
    from base
)

select
    coin_id,
    name,
    symbol,
    market_cap_rank,
    last_updated
from deduped
where rn = 1
