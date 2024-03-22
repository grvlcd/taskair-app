import { create } from "zustand";
import { persist } from "zustand/middleware";
import { z } from "zod";

export const UserSchema = z.object({
  email: z.string(),
  name: z.string(),
  access_token: z.string().nullable(),
});

export type TUser = z.infer<typeof UserSchema>;

type TUserStore = {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
};

const useUserStore = create<TUserStore>((set) => ({
  user: null,
  setUser: (newUser: TUser | null) => set({ user: newUser }),
}));

export default useUserStore;
