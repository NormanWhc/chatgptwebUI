/* eslint-disable @next/next/no-page-custom-font */
"use client";
import "./styles/globals.scss";
import "./styles/markdown.scss";
import "./styles/highlight.scss";
import { Analytics } from "@vercel/analytics/react";
import { getBuildConfig } from "./config/build";
import { AuthProvider, SWRProvider } from "@/app/provider";
import { usePathname } from "next/navigation";
const buildConfig = getBuildConfig();

export const metadata = {
  title: "和而泰数字助理机器人",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#151515" },
  ],
  appleWebApp: {
    title: "和而泰数字助理机器人",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  console.log(pathname, "token");
  return (
    <html lang="en">
      <head>
        <meta name="version" content={buildConfig.commitId} />
        <link rel="manifest" href="/site.webmanifest"></link>
        <script src="/serviceWorkerRegister.js" defer></script>
      </head>
      <body>
        <SWRProvider>
          <AuthProvider>{children}</AuthProvider>
        </SWRProvider>
        <Analytics />
      </body>
    </html>
  );
}
