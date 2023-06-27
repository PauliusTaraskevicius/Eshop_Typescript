import { create } from "zustand";

interface AddImagesStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddImages = create<AddImagesStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddImages;
