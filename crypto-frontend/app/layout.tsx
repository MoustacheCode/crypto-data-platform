import "./globals.css";

export const metadata = {
    title: "Crypto Dashboard",
    description: "Real-time crypto analytics powered by your data pipeline",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-gray-900 text-white">
                <header className="p-4 border-b border-gray-700">
                    <h1 className="text-xl font-semibold">Crypto Analytics</h1>
                </header>
                <main className="max-w-5xl mx-auto p-6">{children}</main>
            </body>
        </html>
    );
}
