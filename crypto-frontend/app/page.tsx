import CoinsTable from "../components/CoinsTable";

type ApiCoin = {
    rank: number;
    name: string;
    symbol: string;
    price: number;
    change_24h: number;
    image: string;
    market_cap: number;
    volume: number;
};

async function getCoins() {
    let res;

    try {
        res = await fetch("http://127.0.0.1:8000/coins", {
            cache: "no-store",
        });
    } catch (err) {
        console.error("Network error:", err);
        throw new Error("Backend unreachable");
    }

    if (!res.ok) {
        console.error("Backend returned error:", res.status);
        throw new Error("Failed to fetch coins");
    }

    const data: ApiCoin[] = await res.json();

    return data.map((coin) => ({
        rank: coin.rank,
        name: coin.name,
        symbol: coin.symbol,
        price: coin.price,
        change24h: coin.change_24h,
        image: coin.image,
        marketCap: coin.market_cap,
        volume: coin.volume,
    }));
}

export default async function Home() {
    const coins = await getCoins();

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Crypto Dashboard</h1>
            <CoinsTable coins={coins} />
        </div>
    );
}
