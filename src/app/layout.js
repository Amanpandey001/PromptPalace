import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PromptPalace - Discover & Share AI-Powered Prompts",
  description: "PromptPalace is a collection of prompts created by the community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
