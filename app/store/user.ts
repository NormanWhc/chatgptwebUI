import { create } from "zustand";
import { persist } from "zustand/middleware";

const LOCAL_KEY = "user-store";

interface rateLimit {
  remain: number;
  success: boolean;
  reset: number;
}

export interface SubscribeType {
  startsAt: number;
  endsAt: number;
  plan: string;
  tradeOrderId: string;
}
export interface UserStore {
  email: string;
  updateEmail: (email: string) => void;

  inviteCode: string;
  updateInviteCode: (inviteCode: string) => void;

  sessionToken: string;
  validateSessionToken: () => boolean;
  updateSessionToken: (sessionToken: string) => void;

  clearData: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      email: "",
      inviteCode: "",
      sessionToken: "",
      subscription: undefined,

      updateEmail(email: string) {
        set((state) => ({ email }));
      },

      updateInviteCode(inviteCode: string) {
        set((state) => ({ inviteCode }));
      },

      updateSessionToken(sessionToken: string) {
        set((state) => ({ sessionToken }));
      },

      /**
       * 本地检验 Cookie 是否有效
       * 后端中间件会二次效验
       */
      validateSessionToken() {
        const sessionToken = get().sessionToken;
        return !!sessionToken;
      },

      clearData() {
        set((state) => ({
          sessionToken: "",
          email: "",
        }));
      },
    }),
    {
      name: LOCAL_KEY,
      version: 1,
    },
  ),
);
