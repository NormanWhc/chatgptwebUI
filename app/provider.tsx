"use client";

import { SWRConfig } from "swr";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useUserStore } from "./store/user";
// import { useAccessStore } from "./store"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sessionToken, validateSessionToken] = useUserStore((state: any) => [
    state.sessionToken,
    state.validateSessionToken,
  ]);

  useEffect(() => {
    if (!sessionToken || !validateSessionToken()) {
      if (!["/"].includes(pathname)) {
        return router.replace("/");
      }
    } else if (["/"].includes(pathname)) {
      return router.replace("/home");
    }
  }, [router, pathname, sessionToken, validateSessionToken]);

  return <>{children}</>;
}

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
      }}
    >
      {children}
    </SWRConfig>
  );
}
