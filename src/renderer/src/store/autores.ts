import { Autor } from '@/types'
import { create } from 'zustand'

interface Store {
    autores: Autor[]
    setAutores: (values: Autor) => void
    initAutores: (values: Autor[]) => void
}

export const useAutoresStore = create<Store>((set) => ({

    autores: [],
    initAutores: (values: Autor[]) => set({ autores: values }),
    setAutores: (value: Autor) => set((state) => ({ autores: [...state.autores, value] }))

}))