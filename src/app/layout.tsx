import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import AnimateWrapper from "./AnimateWrapper";
import PreloaderWrapper from "./PreloaderWrapper";

export const metadata: Metadata = {
    title: "Portfolio",
    description: "SuNgeNyeint - Portfolio",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 mt-20 md:mt-30">
                <PreloaderWrapper>
                    <main className="min-h-screen">
                        <Nav />
                        <AnimateWrapper>
                            {children}
                        </AnimateWrapper>
                        <Footer />
                    </main>
                </PreloaderWrapper>
            </body>
        </html>
    );
}
