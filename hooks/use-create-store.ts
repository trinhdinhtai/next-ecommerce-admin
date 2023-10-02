import { create } from "zustand";

interface StoreModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isFirstCreate: boolean;
  setIsFirstCreate: (isFirstCreate: boolean) => void;
}

export const useCreateStoreModal = create<StoreModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  isFirstCreate: false,
  setIsFirstCreate: (isFirstCreate) => set({ isFirstCreate }),
}));
