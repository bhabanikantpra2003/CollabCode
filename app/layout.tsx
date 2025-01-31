import type { Metadata } from "next";
import { Providers } from './providers'
import { getServerSession } from "next-auth";
import { authConfig } from "./lib/auth/auth";
import { Session } from "./lib/types/types";
import "./globals.css";

export const metadata: Metadata = {
  title: "coDev",
  description: "Code together",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const session = await getServerSession(authConfig) as Session;
  
  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
