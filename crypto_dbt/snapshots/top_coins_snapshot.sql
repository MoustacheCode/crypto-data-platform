{% snapshot top_coins_snapshot %}

{{
    config(
        target_schema='snapshots',
        unique_key='coin_id',
        strategy='timestamp',
        updated_at='last_updated'
    )
}}

select
    coin_id,
    symbol,
    name,
    market_cap_rank,
    current_price,
    last_updated
from {{ ref('stg_top_coins') }}

{% endsnapshot %}
