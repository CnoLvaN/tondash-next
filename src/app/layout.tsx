"use client";

import "@/app/fonts.css";
import "@/app/globals.css";
import { UiLayout } from "@/components/ui/ui-layout";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

// const links: { label: string; path: string }[] = [
//   { label: "Account", path: "/account" },
// ];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TonConnectUIProvider manifestUrl="https://storygen.fun/tonconnect-manifest.json">
          <UiLayout>{children}</UiLayout>
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
