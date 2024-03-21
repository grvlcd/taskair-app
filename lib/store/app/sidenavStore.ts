import { create } from "zustand";

type Store = {
  isOpen: boolean;
  toggleSideNav: () => void;
};

const useSidenavStore = create<Store>((set) => ({
  isOpen: false,
  toggleSideNav: () =>
    set((state) => ({
      ...state,
      isOpen: !state.isOpen,
    })),
}));

export default useSidenavStore;
