import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type BadgesStore = {
  id: string
  name: string
  email: string
  eventTitle: string
  checkInURL: string
  image?: string
}

type StateProps = {
  badge: BadgesStore | null
  save: (badge: BadgesStore) => void
  remove: () => void
  updateAvatar: (uri: string) => void
}

export const useBadgesStore = create(
  persist<StateProps>((set) => ({
    badge: null,
    save: (badge: BadgesStore) => set(() => ({ badge })),
    remove: () => set(() => ({ badge: null })),
    updateAvatar: (uri: string) => set((state) => ({
      badge: state.badge ? { ...state.badge, image: uri } : state.badge
    }))
  }), {
    name: "check-pass-in:badge",
    storage: createJSONStorage(() => AsyncStorage)
  }))