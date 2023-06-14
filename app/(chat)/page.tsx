"use client"; // 必须要添加
import { Analytics } from "@vercel/analytics/react";
import { Login } from "../components/login";
import { getServerSideConfig } from "../config/server";
import { ConfigProvider } from "antd";
const serverConfig = getServerSideConfig();
export default async function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0043FF",
        },
      }}
    >
      <Login />
      {/* <Home /> */}
      {serverConfig?.isVercel && <Analytics />}
    </ConfigProvider>
  );
}
