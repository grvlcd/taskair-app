import { create } from "zustand";

type BoardStore = {
  modal: boolean;
  toggle: (payload: boolean) => void;
};

const useBoardStore = create<BoardStore>((set) => ({
  modal: false,
  toggle: (payload) =>
    set((state) => ({
      ...state,
      modal: payload,
    })),
}));

export default useBoardStore;
