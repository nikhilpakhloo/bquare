import { create } from 'zustand';

interface UploadState {
  uploadedUrl: string | null;
  setUploadedUrl: (url: string | null) => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  uploadedUrl: null,
  setUploadedUrl: (url) => set({ uploadedUrl: url }),
}));
