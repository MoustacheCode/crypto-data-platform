type Coin = {
    rank: number;
    name: string;
    symbol: string;
    price: number;
    change24h: number;
    image: string;
    marketCap: number;
    volume: number;
};

export default function CoinsTable({ coins }: { coins: Coin[] }) {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Top 10 Coins</h2>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="p-3">Rank</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Market Cap</th>
                            <th className="p-3">Volume</th>
                            <th className="p-3">24h Change</th>
                        </tr>
                    </thead>

                    <tbody>
                        {coins.map((coin) => (
                            <tr
                                key={coin.rank}
                                className="border-b border-gray-800"
                            >
                                <td className="p-3">{coin.rank}</td>

                                {/* Name + Logo */}
                                <td className="p-3">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={coin.image}
                                            alt={coin.name}
                                            width={24}
                                            height={24}
                                            className="rounded-full"
                                        />
                                        <span>
                                            {coin.name}{" "}
                                            <span className="text-gray-400 text-sm">
                                                ({coin.symbol.toUpperCase()})
                                            </span>
                                        </span>
                                    </div>
                                </td>

                                <td className="p-3">
                                    ${coin.price.toLocaleString()}
                                </td>

                                <td className="p-3">
                                    ${coin.marketCap.toLocaleString()}
                                </td>

                                <td className="p-3">
                                    ${coin.volume.toLocaleString()}
                                </td>

                                <td
                                    className={`p-3 ${
                                        coin.change24h >= 0
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    {coin.change24h}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
