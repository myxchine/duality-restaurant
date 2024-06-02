import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/admin/header";
import Footer from "@/components/admin/footer";
import Sidebar from "@/components/admin/side-bar";
import { MyProvider } from "./context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Duality Agency",
  description: "Booking systems for the Duality Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex`}>
        <Sidebar />

        <main className=" w-full">
          <Header />

          <MyProvider>{children}</MyProvider>
        </main>
      </body>
    </html>
  );
}
