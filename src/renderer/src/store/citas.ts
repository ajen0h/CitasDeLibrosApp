import { Citas } from '@/types'
import { create } from 'zustand'

interface Store {
    citas: Citas[]
    setCitas: (values: Citas) => void
    initCitas: (values: Citas[]) => void
}

export const useCitasStore = create<Store>((set) => ({

    citas: [],
    initCitas: (values: Citas[]) => set({ citas: values }),
    setCitas: (value: Citas) => set((state) => ({ citas: [...state.citas, value] }))

}))