import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import Navigation from "@/components/navigation";
import FarcasterProvider from "@/components/farcaster-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TaskCash - Earn USDC for Tasks",
    description: "Complete tasks, earn rewards, and boost your content on Farcaster",
    icons: {
        icon: "/logo.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={inter.className}>
                <Providers>
                    <FarcasterProvider>
                        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                            <Navigation />
                            <main className="container mx-auto px-4 py-6 max-w-7xl">
                                {children}
                            </main>
                        </div>
                    </FarcasterProvider>
                </Providers>
            </body>
        </html>
    );
}
