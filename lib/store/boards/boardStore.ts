import { create } from "zustand";
import { UserSchema } from "@/lib/models/user/TUser";
import { z } from "zod";

const BoardUserSchema = UserSchema.omit({ access_token: true });

const BoardSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  user_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  users: z.array(BoardUserSchema),
});

export type TBoard = z.infer<typeof BoardSchema>;

export const BoardDataSchema = z.object({
  shared: z.array(BoardSchema),
  myBoards: z.array(BoardSchema),
});

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type BoardStore = {
  data: any;
  isLoading: boolean;
  modal: boolean;
  toggle: (payload: boolean) => void;
  getBoards: () => void;
  error: string;
};

const useBoardStore = create<BoardStore>((set) => ({
  data: [],
  isLoading: false,
  modal: false,
  error: "",
  toggle: (payload) =>
    set((state) => ({
      ...state,
      modal: payload,
    })),
  getBoards: async () => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const access_token =
        typeof window !== "undefined" && localStorage.getItem("token");
      const response: Response = await fetch(`${BACKEND_URL}/api/v1/boards`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      const { data } = await response.json();
      const safeCheck = BoardDataSchema.safeParse(data);
      if (safeCheck.success) {
        set((state) => ({ ...state, data: safeCheck.data, isLoading: false }));
      }
    } catch (error) {
      console.log(error);
      set((state) => ({ ...state, isLoading: false }));
    }
  },
}));

export default useBoardStore;
