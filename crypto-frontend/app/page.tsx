import CoinsTable from "../components/CoinsTable";

export default function Home() {
    const mockCoins = [
        {
            rank: 1,
            name: "Bitcoin",
            symbol: "btc",
            price: 67000,
            change24h: 2.1,
        },
        {
            rank: 2,
            name: "Ethereum",
            symbol: "eth",
            price: 3400,
            change24h: -1.2,
        },
        { rank: 3, name: "Tether", symbol: "usdt", price: 1, change24h: 0.0 },
    ];

    return (
        <main>
            <h1 className="text-3xl font-bold">Crypto Dashboard</h1>
            <p className="text-gray-500 mt-2">Top coins will appear here.</p>

            <CoinsTable coins={mockCoins} />
        </main>
    );
}
