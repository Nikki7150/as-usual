import { create } from 'zustand';

import { auth } from '../../firebaseConfig';
import { isLoaded } from 'expo-font';

export const useAuthStore = create((set) => ({
    user: null,
    isLoading: true,
    setAuth: (user, isLoading) => set({ user, isLoading }),
}));