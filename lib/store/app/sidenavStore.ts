import { create } from "zustand";

type AppStore = {
  isOpen: boolean;
  toggleSideNav: () => void;
};

const useSidenavStore = create<AppStore>((set) => ({
  isOpen: false,
  toggleSideNav: () =>
    set((state) => ({
      ...state,
      isOpen: !state.isOpen,
    })),
}));

export default useSidenavStore;
