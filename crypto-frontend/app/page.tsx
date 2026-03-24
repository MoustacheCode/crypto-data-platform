import CoinsTable from "../components/CoinsTable";

type ApiCoin = {
    rank: number;
    name: string;
    symbol: string;
    price: number;
    change_24h: number;
};

async function getCoins() {
    const res = await fetch("http://127.0.0.1:8000/coins", {
        next: { revalidate: 10 },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch coins");
    }

    const data: ApiCoin[] = await res.json();

    // Transform backend → frontend shape
    return data.map((coin) => ({
        rank: coin.rank,
        name: coin.name,
        symbol: coin.symbol,
        price: coin.price,
        change24h: coin.change_24h,
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
