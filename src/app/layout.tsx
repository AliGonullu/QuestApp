import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QuestCardCreator from "./__trial__/questCardCreator/QuestCardCreator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Todo uygulaması",
};

export default function RootLayout 
({
  children,
}: Readonly<{
  children: React.ReactNode;
}>
) 
{
  console.log(children);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QuestCardCreator />
        {/*children*/}
      </body>
    </html>
  );
}
